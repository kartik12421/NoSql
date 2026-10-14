-- Q12: Cassandra CRUD using CQL
USE CollegeDB;

CREATE TABLE IF NOT EXISTS Employees (
  employee_id int PRIMARY KEY,
  name text,
  department text,
  salary decimal
);

-- Create / Insert
INSERT INTO Employees (employee_id, name, department, salary) VALUES (101, 'Rohan Kumar', 'IT', 45000.00);
INSERT INTO Employees (employee_id, name, department, salary) VALUES (102, 'Simran Kaur', 'HR', 42000.00);

-- Read
SELECT * FROM Employees;
SELECT * FROM Employees WHERE employee_id = 101;

-- Update
UPDATE Employees SET salary = 50000.00 WHERE employee_id = 101;
SELECT * FROM Employees WHERE employee_id = 101;

-- Delete
DELETE FROM Employees WHERE employee_id = 102;
SELECT * FROM Employees;
