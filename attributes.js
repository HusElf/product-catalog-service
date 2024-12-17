const fs = require('fs');
const csv = require('csv-parser');

const attributeNames = new Set();

fs.createReadStream('prod-brand3.csv')
  .pipe(csv())
  .on('data', (row) => {
    for (let i = 1; i <= 6; i++) {
      const attrName = row[`Attribute ${i} name`];
      if (attrName) {
        attributeNames.add(attrName.trim());
      }
    }
  })
  .on('end', () => {
    console.log('Unique Attribute Names:', Array.from(attributeNames));
  });
