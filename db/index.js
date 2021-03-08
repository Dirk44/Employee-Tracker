const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    addDepartment(department) {
        return this.connection.query("INSERT INTO department SET ?", {"name": department});
    }
    addRole(title, salary, dept) {
        return this.connection.query("INSERT INTO role SET ?", {"title": title, "salary": salary, "department_id": dept});
    }
    addEmployee(firstName, lastName, role, manager) {
        return this.connection.query("INSERT INTO employee SET ?", {"first_name": firstName, "last_name": lastName, "role_id": role, "manager_id": manager});
    }
    viewDepartment() {
        return this.connection.query("SELECT id AS 'Department ID', name AS 'Department' FROM department");
    }
    viewRole() {
        return this.connection.query("SELECT r.title AS 'Title', r.salary AS 'Salary', d.name AS 'Department' FROM role r JOIN department d ON r.department_id = d.id");
    }
    viewEmployee() {
        return this.connection.query("SELECT CONCAT(e.first_name, ' ', e.last_name) AS 'Name', r.title AS 'Title', r.salary AS 'Salary', d.name AS 'Department', CONCAT(e2.first_name, ' ', e2.last_name) AS 'Manager' FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee e2 ON e.manager_id = e2.id");
    }
    updateEmployeeRole(id, role) {
        return this.connection.query("UPDATE employee SET ? WHERE ?", [{"role_id": role}, {"id": id}]);
    }
    deptChoices() {
        return this.connection.query("SELECT id, name FROM department");
    }
    roleChoices() {
        return this.connection.query("SELECT id, title FROM role");
    }
    mgrChoices() {
        return this.connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS 'Name' FROM employee");
    }
}

module.exports = new DB(connection);