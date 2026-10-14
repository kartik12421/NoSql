// Flexible Product Catalog
use("product_catalog_db");

db.products.deleteMany({});

db.products.insertMany([
  { name: "Dell Inspiron", category: "laptop", price: 65000, specs: { ram: 16, storage: "512GB SSD", processor: "i5" } },
  { name: "iPhone 16", category: "mobile", price: 80000, specs: { ram: 8, storage: "256GB", camera: "48MP" } },
  { name: "Canon EOS", category: "camera", price: 95000, specs: { sensor: "24MP", lens: "18-55mm", video: "4K" } }
]);

// Laptops with at least 16 GB RAM
db.products.find({ category: "laptop", "specs.ram": { $gte: 16 } });

// Mobiles with 256GB storage
db.products.find({ category: "mobile", "specs.storage": "256GB" });

// Cameras supporting 4K
db.products.find({ category: "camera", "specs.video": "4K" });

// Products below 90000
db.products.find({ price: { $lt: 90000 } });
