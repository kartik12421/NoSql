use("CollegeDB");

db.Orders.drop();

db.Orders.insertMany([
  {
    Order_ID: 101,
    Customer: { Customer_ID: 1, Name: "Amit" },
    Products: [
      { Name: "Laptop", Quantity: 1, Price: 50000 },
      { Name: "Mouse", Quantity: 2, Price: 500 }
    ]
  },
  {
    Order_ID: 102,
    Customer: { Customer_ID: 2, Name: "Neha" },
    Products: [
      { Name: "Keyboard", Quantity: 1, Price: 1200 },
      { Name: "Mouse", Quantity: 1, Price: 500 }
    ]
  },
  {
    Order_ID: 103,
    Customer: { Customer_ID: 1, Name: "Amit" },
    Products: [
      { Name: "Monitor", Quantity: 1, Price: 12000 }
    ]
  },
  {
    Order_ID: 104,
    Customer: { Customer_ID: 3, Name: "Rahul" },
    Products: [
      { Name: "Headphones", Quantity: 2, Price: 1500 }
    ]
  },
  {
    Order_ID: 105,
    Customer: { Customer_ID: 4, Name: "Priya" },
    Products: [
      { Name: "Tablet", Quantity: 1, Price: 18000 }
    ]
  }
]);

// 1. Display orders
db.Orders.find();

// 2. Orders of customer Amit
db.Orders.find({ "Customer.Name": "Amit" });

// 3. Update quantity of Mouse in order 101
db.Orders.updateOne(
  { Order_ID: 101, "Products.Name": "Mouse" },
  { $set: { "Products.$.Quantity": 3 } }
);

// 4. Calculate total amount for every order
db.Orders.aggregate([
  {
    $project: {
      Order_ID: 1,
      Customer: 1,
      TotalAmount: {
        $sum: {
          $map: {
            input: "$Products",
            as: "p",
            in: { $multiply: ["$$p.Quantity", "$$p.Price"] }
          }
        }
      }
    }
  }
]);

// 5. Orders above 10000
db.Orders.aggregate([
  {
    $project: {
      Order_ID: 1,
      Customer: 1,
      TotalAmount: {
        $sum: {
          $map: {
            input: "$Products",
            as: "p",
            in: { $multiply: ["$$p.Quantity", "$$p.Price"] }
          }
        }
      }
    }
  },
  { $match: { TotalAmount: { $gt: 10000 } } }
]);
