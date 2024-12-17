
const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');

const products = [];
const brands = [];
const categoriesData = [];

// Read the CSV file and parse it into categories, products, and brands
fs.createReadStream('prod-brand2.csv')
  .pipe(csv())
  .on('data', (row) => {
    const categories = row.Categories ? row.Categories.split(',').map(cat => cat.trim().split('>').map(c => c.trim())) : [];
    categoriesData.push(categories);
    const product = {
      name: row.Name,
      price: parseFloat(row.Regularprice),
      sku: row.SKU,
      brand: row.Brands,
      categories: []
    };

    const brandName = row.Brands.trim();
    let brand = brands.find((b) => b.name === brandName);

    if (!brand) {
      brand = {
        name: brandName,
        id: null
      };
      brands.push(brand);
    }

    products.push(product);
  })
  .on('end', async () => {
    const headers = {
      Authorization: 'Bearer faa3c57eeac7d3a37f0d2d86b1d620cb7f585f9a2c007dca54af372f2f358ceab27f8d5629c35f5411411bf30efbe773562c6ad959648e26a99204dcbe69c11177271235775c14f4df537302dd45ee125ef1642dcc29870e6b229acfadcb4c1e13aadbe6625649c6f8b76499e4c0d65bd18eceeada7e7ade93807a2dba3546c7',
      'Content-Type': 'application/json'
    };

    try {
      for (let i = 0; i < categoriesData.length; i++) {
        const categories = categoriesData[i];
        const categoryIds = [];

        for (const categoryPath of categories) {
          let parentCategoryId = null;
          for (const categoryName of categoryPath) {
            try {
              let query = `filters[name][$eq]=${categoryName}`;
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
    } catch (error) {
      console.error('Error in categories processing:', error.message);
    }

    for (const brand of brands) {
      try {
        if (!brand.name) {
          throw new Error('Brand name is empty.');
        }

        const existingBrand = await axios.get(`http://localhost:1337/api/brands?filters[name][$eq]=${brand.name}`, { headers });

        if (existingBrand.data.data.length > 0) {
          brand.id = existingBrand.data.data[0].id;
        } else {
          const newBrandResponse = await axios.post('http://localhost:1337/api/brands', { data: { name: brand.name } }, { headers });

          if (newBrandResponse.data && newBrandResponse.data.data && newBrandResponse.data.data.id) {
            brand.id = newBrandResponse.data.data.id;
            console.log('New brand created:', newBrandResponse.data);
          } else {
            throw new Error('Brand creation failed or response format is incorrect.');
          }
        }
      } catch (error) {
        console.error('Error handling brand:', error.message);
      }
    }

    for (const product of products) {
      const brand = brands.find((b) => b.name === product.brand);

      if (brand && brand.id) {
        product.brand = brand.id;

        try {
          const response = await axios.post('http://localhost:1337/api/products', { data: product }, { headers });
          console.log('Product imported:', response.data);
        } catch (error) {
          console.error('Error handling product:', error.message, error.response?.data);
        }
      } else {
        console.error('Brand ID not found for product:', product);
      }
    }
  });
