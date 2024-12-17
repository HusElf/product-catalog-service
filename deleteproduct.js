const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('./.tmp/data.db');

// Function to delete multiple products by IDs
function deleteProducts(productIds) {
  const sql = ` DELETE FROM products WHERE id == ${productIds}; `;

  db.run(sql,(err) => {
  console.log("delete products", sql);
    if (err) {
      console.error('Error deleting products:', err.message);
    } else {
      console.log(`Deleted products successfully`);
    }

  });
}

deleteProducts(2);

// Close the database connection
db.close((err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Database connection closed');
  }
});
