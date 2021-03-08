const inquirer = require("inquirer");
const { getTable } = require("console.table");
require("console.table");
const db = require("./db/index.js");

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

async function addDepartment() {
    inquirer.prompt([
        {
            name: "answer",
            type: "input",
            message: "name?"
        }
    ]) 
    .then(async(response) => {
        await db.addDepartment(response.answer);
        console.log(`Added ${response.answer} to the database!`);
        init();
    }); 
}
async function addRole() {
    const dept = await db.deptChoices(); 
    const deptChoices = dept.map(({ id, name}) => ({
        name: name,
        value: id
    }));
    inquirer.prompt([
        {
            name: "answer",
            type: "input",
            message: "name?"
        },
        {
            name: "salary",
            type: "input",
            message: "salary"
        },
        {
            name: "dept",
            type: "list",
            message: "department?",
            choices: deptChoices
        }
    ]) 
    .then(async(response) => {
        await db.addRole(response.answer, response.salary, response.dept);
        console.log(`Added ${response.answer} to the database!`);
        init();
    }); 
}
async function addEmployee() {
    const role = await db.roleChoices(); 
    const roleChoices = role.map(({ id, title}) => ({
        name: title,
        value: id
    })); 
    const mgr = await db.mgrChoices(); 
    const mgrChoices = mgr.map(({ id, Name}) => ({
        name: Name,
        value: id
    }));
    mgrChoices.unshift({name: "none", value: null})
    inquirer.prompt([
        {
            name: "first",
            type: "input",
            message: "first name?"
        },
        {
            name: "last",
            type: "input",
            message: "last name?"
        },
        {
            name: "role",
            type: "list",
            message: "role?",
            choices: roleChoices
        },
        {
            name: "mgr",
            type: "list",
            message: "manager?",
            choices: mgrChoices
        },
    ]) 
    .then(async(response) => {
        await db.addEmployee(response.first, response.last, response.role, response.mgr);
        console.log(`Added ${response.first} ${response.last} to the database!`);
        init();
    }); 
}
async function viewDepartment() {
    // get from database
    const dbValues = await db.viewDepartment(); 
    console.table(dbValues);
    init();
}
async function viewRole() {
     // get from database
     const dbValues = await db.viewRole(); 
     console.table(dbValues);
     init();
}
async function viewEmployee() {
     // get from database
     const dbValues = await db.viewEmployee(); 
     console.table(dbValues);
     init();
}
async function updateEmployeeRole() {
    const mgr = await db.mgrChoices(); 
    const employeeChoices = mgr.map(({ id, Name}) => ({
        name: Name,
        value: id
    }));
    const role = await db.roleChoices(); 
    const roleChoices = role.map(({ id, title}) => ({
        name: title,
        value: id
    }));
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
            message: "role?",
            choices: roleChoices
        }
    ]) 
    .then(async(response) => {
        await db.updateEmployeeRole(response.employee,response.role)
        console.log("updated employee!");
        init();
    }); 
}
function stop() {
    console.log("see you later!");
    process.exit();
}

init();