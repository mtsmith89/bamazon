DROP database if exists bamazon;

CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Nivea Men Shampoo', 'Cosmetics', 5.75, 500),
		('Nivea Men Conditioner', 'Cosmetics', 6.25, 627),
		('Cottonelle Moist Wipes', 'Grocery', 5.99, 300),
		('Bounty Paper Towels', 'Grocery', 9.25, 400),
		('Lemons', 'Produce', 0.35, 800),
		('Limes', 'Produce', 0.35, 800),
		('Heavy Cream', 'Grocery', 4.45, 267),
		('Purell Hand Sanitizer', 'Grocery', 4.50, 200),
		('Nivea Mens Deodorant', 'Cosmetics', 4.75, 476),
		('Cottonelle Toiler Paper', 'Grocery', 12.99, 575),
		('9 Lives Wet Cat Food', 'Pet', 13.50, 423),
		('Kit & Kaboodle Cat Food', 'Pet', 7.75, 150),
		('Levi Jeans', 'Clothing', 19.99, 89),
		('Addidas T-Shirt', 'Clothing', 15.55, 120),
		('Addidas Shorts', 'Clothing', 17.88, 250),
		('Yoga Mat', 'Sports', 14.25, 157),
		('Weight Lifting Gloves', 'Sports', 12.70, 163),
		('Samsung Gear IconX', 'Electronics', 199.99, 389),
		('Samsung Gear S3 Smartwatch', 'Electronics', 359.99, 550),
		('Samsung Galaxy S9 Plus Coral Blue', 'Electronics', 819.99, 1);