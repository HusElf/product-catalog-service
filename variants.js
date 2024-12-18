
const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');

const products = [];
const brands = [];
const categoriesData = [];
const variants = [];
const attributeComponents = {
  'مقاس الاكسسوار': 'attribute.mqas-alaksswar',
  // Add other mappings as needed
};

// Read the CSV file
fs.createReadStream('prod-brand3.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (row.Type === 'variable') {
      const categories = row.Categories ? row.Categories.split(',').map(cat => cat.trim().split('>').map(c => c.trim())) : [];
      categoriesData.push(categories);

      const product = {
        id: row.ID,
        name: row.Name,
        price: parseFloat(row['Regularprice']) || 0,
        sku: row.SKU,
        brand: row.Brands,
        categories: [],
        attributes: parseAttributes(row)
      };

      products.push(product);
    } else if (row.Type === 'variation') {
      const variant = {
        sku: row.SKU,
        parentSku: row.Parent,
        attributes: parseAttributes(row),
        quantity: parseInt(row.Stock) || 0,
        price: parseFloat(row['Regularprice']) || 0
      };
      console.log('Parsed attributes:', variant.sku);
      variants.push(variant);
    }
  })
  .on('end', async () => {
    const headers = {
      Authorization: 'Bearer ',
      'Content-Type': 'application/json'
    };

    try {
      await processCategoriesAndProducts(headers);
      await processVariants(headers);
    } catch (error) {
      console.error('Error processing data:', error.message);
    }
  });

// Helper function to parse attributes
function parseAttributes(row) {
  const attributes = [];
  for (let i = 1; i <= 6; i++) {
    const attrName = row[`Attribute ${i} name`];
    const attrValues = row[`Attribute ${i} value(s)`];
    if (attrName && attrValues) {
      const component = attributeComponents[attrName];
      if (component) {
        attrValues.split(',').map(v => v.trim()).forEach(value => {
          attributes.push({
            __component: component,
            size: value
          });
        });
      }
    }
  }
  return attributes;
}

// Function to process categories and products
async function processCategoriesAndProducts(headers) {
  for (let i = 0; i < categoriesData.length; i++) {
    const categories = categoriesData[i];
    const categoryIds = [];

    for (const categoryPath of categories) {
      let parentCategoryId = null;
      for (const categoryName of categoryPath) {
        try {
          let query = `filters[name][$eq]=${encodeURIComponent(categoryName)}`;
          if (parentCategoryId) {
            query += `&filters[parent][$eq]=${parentCategoryId}`;
          }

          let category = await axios.get(`http://localhost:1337/api/categories?${query}`, { headers });

          if (!category.data.data.length) {
            category = await axios.post(`http://localhost:1337/api/categories`, { data: { name: categoryName, parent: parentCategoryId } }, { headers });
          }

          const categoryId = category.data.data[0]?.id || category.data.data.id;

          if (categoryId && !categoryIds.includes(categoryId)) {
            categoryIds.push(categoryId);
          }

          parentCategoryId = categoryId;
        } catch (error) {
          console.error(`Error handling category "${categoryName}":`, error.message);
        }
      }
    }

    // Assign category IDs to the corresponding product
    products[i].categories = categoryIds;
  }

  for (const product of products) {
    // const brand = brands.find((b) => b.name === product.brand);
    //
    // if (brand && brand.id) {
    //   product.brand = brand.id;

      try {
        const response = await axios.post('http://localhost:1337/api/products', { data: product }, { headers });
        console.log('Product imported:', response.data);
      } catch (error) {
        console.error('Error handling product:', error.message, error.response?.data);
      }
    // } else {
    //   console.error('Brand ID not found for product:', product);
    // }
  }
}

// Function to process variants
async function processVariants(headers) {
  for (const variant of variants) {
    const parentProduct = products.find(p => p.sku === variant.parentSku);
    console.log('Parsed attributes:', variant.attributes);
    if (parentProduct) {
      try {
        const response = await axios.post('http://localhost:1337/api/variants', {
          data: {
            SKU: variant.sku,
            attributes: variant.attributes,
            product: parentProduct.id,
            Quantity: variant.quantity,
            price: variant.price
          }
        }, { headers });

        console.log('Variant imported:', response.data);
      } catch (error) {
        console.error('Error handling variant:', error.message);
        console.error('Error details:', error.response?.data?.error?.details?.errors);
      }
    } else {
      console.error('Parent product not found for variant:', variant);
    }
  }
}

