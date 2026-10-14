// E-Commerce Order Management System
use("ecommerce_db");

db.customers.deleteMany({});
db.products.deleteMany({});
db.orders.deleteMany({});

db.customers.insertMany([
  { customerId: "C101", name: "Aman", email: "aman@example.com" },
  { customerId: "C102", name: "Riya", email: "riya@example.com" }
]);

db.products.insertMany([
  { productId: "P101", name: "Laptop", price: 65000 },
  { productId: "P102", name: "Mouse", price: 1200 },
  { productId: "P103", name: "Keyboard", price: 2500 }
]);

db.orders.insertMany([
  {
    orderId: "O101", customerId: "C101",
    items: [
      { productId: "P101", name: "Laptop", price: 65000, quantity: 1 },
      { productId: "P102", name: "Mouse", price: 1200, quantity: 2 }
    ],
    orderDate: ISODate("2026-10-01")
  },
  {
    orderId: "O102", customerId: "C101",
    items: [{ productId: "P103", name: "Keyboard", price: 2500, quantity: 1 }],
    orderDate: ISODate("2026-10-06")
  }
]);

// Complete purchase history for customer C101
db.orders.find({ customerId: "C101" }).sort({ orderDate: -1 });

// Calculate total for every order
db.orders.aggregate([
  { $unwind: "$items" },
  { $group: {
      _id: "$orderId",
      customerId: { $first: "$customerId" },
      total: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
  }}
]);

// Calculate customer's total spending
db.orders.aggregate([
  { $match: { customerId: "C101" } },
  { $unwind: "$items" },
  { $group: { _id: "$customerId", totalSpent: { $sum: { $multiply: ["$items.price", "$items.quantity"] } } } }
]);
