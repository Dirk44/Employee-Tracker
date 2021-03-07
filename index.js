const inquirer = require("inquirer");
const { getTable } = require("console.table");
require("console.table");


function init() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "init",
            choices: ["Add department", "Add role", "Add employee", "View department", "View role", "View employee", "Update employee role"]
        }
    ])
        .then((response) => {
            switch (response.init) {
                case "Add department":
                    return addDepartment();
                case "Add role":
                    return addRole();
                case "Add employee":
                    return addEmployee();
                case "View department":
                    return viewDepartment();
                case "View role":
                    return viewRole();
                case "View employee":
                    return viewEmployee();
                case "Update employee role":
                    return updateEmployeeRole();
                default:
                    return stop();
            }
        });
};

function addDepartment() {
    inquirer.prompt([
        {
            name: "answer",
            type: "input",
            message: "name?"
        }
    ]) 
    .then((response) => {
        // send to database
        console.log(`Added ${response.answer} to the database!`);
    }); 
}
function addRole() {
    inquirer.prompt([
        {
            name: "answer",
            type: "input",
            message: "name?"
        }
    ]) 
    .then((response) => {
        // send to database
        console.log(`Added ${response.answer} to the database!`);
    }); 
}
function addEmployee() {
    inquirer.prompt([
        {
            name: "answer",
            type: "input",
            message: "name?"
        }
    ]) 
    .then((response) => {
        // send to database
        console.log(`Added ${response.answer} to the database!`);
    }); 
}
function viewDepartment() {
    // get from database
    const dbValues; 
    console.table(dbValues);
}
function viewRole() {
     // get from database
     const dbValues; 
     console.table(dbValues);
}
function viewEmployee() {
     // get from database
     const dbValues; 
     console.table(dbValues);
}
function updateEmployeeRole() {
    const employeeChoices;
    const roleChoices;
    inquirer.prompt([
        {
            name: "employee",
            type: "list",
            message: "name?",
            choices: employeeChoices
        },
        {
            name: "role",
            type: "list",
            message: "name?",
            choices: roleChoices
        }
    ]) 
    .then((response) => {
        // send to database
        console.log("updated employee!");
    }); 
}
function stop() {

}