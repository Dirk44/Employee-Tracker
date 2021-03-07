const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    addDepartment(department) {
        return this.connection.query("INSERT INTO department SET ?", {"name": department});
    }
    addRole(title, salary, dept) {
        return this.connection.query("INSERT INTO role SET ?", {"title": title, "salary": salary, "deptartment_id": dept});
    }
    addEmployee(firstName, lastName, role, manager) {
        return this.connection.query("INSERT INTO employee SET ?", {"firstName": firstName, "lastName": lastName, "role_id": role, "manager_id": manager});
    }
    viewDepartment() {
        return this.connection.query("SELECT id AS 'Department ID' FROM department");
    }
    viewRole() {
        return this.connection.query("SELECT r.title AS 'Title', r.salary AS 'Salary', d.name AS 'Department' FROM role r JOIN department d ON r.department_id = d.id");
    }
    viewEmployee() {
        return this.connection.query("SELECT CONCAT(e.firstName, ' ', e.lastName) AS 'Name', r.title AS 'Title', r.salary AS 'Salary', d.name AS 'Department', CONCAT(e2.firstName, ' ', e2.lastName) AS 'Manager' FROM employee e JOIN role r JOIN department d ON r.department_id = d.id LEFT JOIN employee e2 ON e.manager_id = e2.id");
    }
    updateEmployeeRole(id, role) {
        return this.connection.query("UPDATE employee SET ? WHERE ?", {"role_id":role}, {"id": id})
    }

}