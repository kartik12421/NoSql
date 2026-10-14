// Inventory Monitoring System
use("inventory_db");

db.inventory.deleteMany({});

db.inventory.insertMany([
  { productId: "P101", name: "Laptop", stock: 8, minimumStock: 10, supplier: "TechSupply", restockingDate: ISODate("2026-10-15") },
  { productId: "P102", name: "Mouse", stock: 50, minimumStock: 20, supplier: "AccessoryHub", restockingDate: ISODate("2026-11-01") },
  { productId: "P103", name: "Keyboard", stock: 5, minimumStock: 15, supplier: "AccessoryHub", restockingDate: ISODate("2026-10-12") }
]);

// Products needing immediate restocking
db.inventory.find({ $expr: { $lte: ["$stock", "$minimumStock"] } });

// Products with stock below minimum
db.inventory.find({
  $expr: { $lt: ["$stock", "$minimumStock"] }
});

// Sort products by stock level
db.inventory.find().sort({ stock: 1 });
