var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('easy-table')
var colors = require('colors');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && sign === 1) {
    return true;
  } else {
    return "Please enter a positive number. Also, not a zero please!";
  }
}

function promptUserPurchase() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "item_id",
        message:
          "Choose the item you would like to purchase by entering the Item ID.",
        validate: validateInput,
        filter: Number
      },
      {
        type: "input",
        name: "quantity",
        message: "How many do you want to purchase?",
        validate: validateInput,
        filter: Number
      }
    ])
    .then(function(input) {
      var item = input.item_id;
      var quantity = input.quantity;
      var queryStr = "SELECT * FROM products WHERE ?";

      connection.query(queryStr, { item_id: item }, function(err, data) {
        if (err) throw err;
        if (data.length === 0) {
          console.log(
            "ERROR: Not a valid Item ID. Please select from the options displayed."
          );
          displayInventory();
        } else {
          var productData = data[0];
          if (quantity <= productData.stock_quantity) {
            console.log("Item added successfully!");
            var updateQueryStr =
              "UPDATE products SET stock_quantity = " +
              (productData.stock_quantity - quantity) +
              " WHERE item_id = " +
              item;
            connection.query(updateQueryStr, function(err, data) {
              if (err) throw err;

              console.log(
                "This completes your order! Your total is $" +
                  productData.price * quantity
              );
              console.log("Thank you meat bag!");
              console.log(
                "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"
              );
              connection.end();
            });
          } else {
            console.log("Bummer, we don't have enough to fulfill your order.");
            console.log("Please try again!");
            console.log(
              "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"
            );

            displayInventory();
          }
        }
      });
    });
}

function displayInventory() {
  queryStr = "SELECT * FROM products";
  connection.query(queryStr, function(err, data) {
    if (err) throw err;

    console.log(colors.rainbow("\n-----------------------"));
    console.log("| Welcome to Bamazon! |".rainbow);
    console.log(colors.rainbow("-----------------------"));
    console.log("\nHere is what we have to offer:");
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");

    var t = new Table();

    data.forEach(function(data) {
      t.cell("Item ID", data.item_id);
      t.cell("Product Name", data.product_name);
      t.cell("Department Name", data.department_name);
      t.cell("Price: $", data.price, Table.number(2));
      t.newRow();
    });

    console.log(colors.inverse(t.toString()));

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");

    promptUserPurchase();
  });
}

function runBamazon() {
  displayInventory();
}

runBamazon();
