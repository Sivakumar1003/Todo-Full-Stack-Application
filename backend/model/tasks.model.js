const mysql = require('./db');

const Tasks = function (task) {
    this.id = task.id;
    this.userId = task.userId;
    this.tasks = task.tasks;
    this.status = task.status;
};

Tasks.getAllTaskById = (id, result) => {
    mysql.query("SELECT * FROM tasks WHERE userId = ?", [id], (error, response) => {
        if (error) {
            return result(error);
        }
        return result(null, response);
    });
}

Tasks.addTask = ({ userId, tasks, status }, result) => {
    mysql.query("INSERT INTO tasks (`userId`, `tasks`, `status`) VALUES (?, ?,?)", [userId, tasks, status], (error, response) => {
        if (error) {
            return result(error);
        }
        return result(null, response);
    })
    // INSERT INTO `todo_db`.`tasks` (`userId`, `tasks`, `status`) VALUES ('2', 'task3', 'Pending');

}


Tasks.updateTask = ({ id, tasks }, result) => {

    mysql.query("UPDATE tasks SET tasks = ? WHERE id = ?", [tasks, id], (error, response) => {
        if (error) {
            return result(error);
        }

        return result(null, response);
    });
}

Tasks.updateStatus = (id, result) => {

    let status = "Completed";

    mysql.query("UPDATE tasks SET status = ? WHERE id = ?", [status, id], (error, response) => {
        if (error) {
            return result(error);
        }

        return result(null, response);
    });
}

Tasks.deleteTask = (id, result) => {
    mysql.query("DELETE FROM tasks WHERE id = ?", [id], (error, response) => {
        if (error) {
            return result(error);
        }

        return result(null, response);
    });
    // DELETE FROM `todo_db`.`tasks` WHERE (`id` = '9');
}

module.exports = Tasks