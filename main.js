#! /usr/bin/env node 
import inquirer from "inquirer";
console.log("dear customer!welcome to my shopping mart");
console.log("this shoping mart is made by hassan masood");
const cart = [];
function printbill() {
    console.log("--- Your Bill ----");
    let total = 0;
    for (const entry of cart) {
        const cost = entry.quantity * entry.price;
        console.log(`${entry.item}: ${entry.quantity} x ${entry.price} = ${cost}`);
        total += cost;
    }
    processPayment(total);
    async function processPayment(total) {
        console.log(`Total Cost: ${total}`);
        const payment = await inquirer.prompt([
            {
                name: "payment",
                message: "How would you like to pay?",
                type: "list",
                choices: ["card", "cash"],
            },
        ]);
        if (payment.payment === "card") {
            const cardinfo = await inquirer.prompt([
                {
                    name: "cardno",
                    message: "Enter the card PIN",
                    type: "input",
                },
            ]);
            console.log("Your payment has been successfully done");
        }
        else {
            console.log("Your payment has been successfully done with cash");
        }
    }
}
async function handleOrder(item, pricePerUnit, unit) {
    const order = await inquirer.prompt([
        {
            name: "quantity",
            type: "input",
            message: `Enter the quantity of ${item.toLowerCase()} in ${unit}:`,
            validate: (answer) => {
                const isValid = !isNaN(answer) && parseFloat(answer) > 0;
                return isValid || "Please enter a valid number.";
            },
        },
    ]);
    const quantity = parseFloat(order.quantity);
    cart.push({ item, quantity, price: pricePerUnit });
    console.log(`You have ordered ${quantity} ${unit} of ${item.toLowerCase()}.`);
    const totalbill = quantity * pricePerUnit;
    console.log("Total cost:" + totalbill);
}
async function mainMenu() {
    let continueShopping = true;
    while (continueShopping) {
        const essentiallist = await inquirer.prompt([
            {
                name: "grocerylist",
                type: "list",
                message: "Grocery we have in our store",
                choices: [
                    "RICE",
                    "COOKING OIL",
                    "MILK",
                    "SUGAR",
                    "TEA",
                    "FLOUR",
                    "PASTA",
                    "SOAP",
                    "COLD DRINK",
                    "EXIT",
                ],
            },
        ]);
        switch (essentiallist.grocerylist) {
            case "RICE":
                await handleOrder("Rice", 300, "kilograms");
                break;
            case "COOKING OIL":
                await handleOrder("Cooking Oil", 550, "liters");
                break;
            case "MILK":
                await handleOrder("Milk", 370, "liters");
                break;
            case "SUGAR":
                await handleOrder("Sugar", 150, "kilograms");
                break;
            case "TEA":
                await handleOrder("Tea", 800, "kilograms");
                break;
            case "FLOUR":
                await handleOrder("Flour", 100, "kilograms");
                break;
            case "PASTA":
                await handleOrder("Pasta", 200, "packets");
                break;
            case "SOAP":
                await handleOrder("Soap", 80, "pieces");
                break;
            case "COLD DRINK":
                await handleOrder("Cold Drink", 210, "bottles");
                break;
            case "EXIT":
                continueShopping = false;
                console.log("Thank you, goodbye!");
                break;
        }
        if (continueShopping) {
            const { continueResponse } = await inquirer.prompt([
                {
                    name: "continueResponse",
                    type: "confirm",
                    message: "Do you want to order more items?",
                },
            ]);
            continueShopping = continueResponse;
        }
    }
    printbill();
}
const customerName = await inquirer.prompt([
    {
        name: "customerName",
        type: "input",
        message: "Please enter your name",
    },
]);
console.log(`Dear ${customerName.customerName}, what would you like to purchase?`);
await mainMenu();
