const Tasks = require('../model/tasks.model');

exports.getAllTaskById = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ Success: false, message: "User id must required." })
    }

    Tasks.getAllTaskById(id, (error, response) => {
        if (error) {
            return res.status(500).json({ Success: false, message: "Database error.", error })
        }

        return res.status(200).json({ Success: true, tasks: response })
    })
}

exports.addTask = (req, res) => {
    const status = "Pending";
    const { userId, tasks } = req.body;

    if (!userId || !tasks) {
        return res.status(400).json({ Success: false, message: "User id and tasks must required." });
    }

    const task = new Tasks({ userId, tasks, status });

    Tasks.addTask(task, (error, response) => {
        if (error) {
            return res.status(404).json({ Success: false, message: "Database error.", error });
        }

        const task = { id: response.insertId, userId, tasks, status }

        res.status(200).json({ Success: true, tasks: task })
    });
}

exports.updateTask = (req, res) => {
    const { id, tasks } = req.body;

    if (!id || !tasks) {
        return res.status(400).json({ Success: false, message: "Task id and tasks must required." });
    }

    Tasks.updateTask({ id, tasks }, (error, response) => {
        if (error) {
            return res.status(404).json({ Success: false, message: "Database error.", error });
        }

        return res.status(200).json({ Success: true, tasks: {...response, tasks, id} })
    })
}

exports.updateStatus = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ Success: false, message: "Task id must required." })
    }

    Tasks.updateStatus(id, (error, response) => {
        if (error) {
            return res.status(500).json({ Success: false, message: "Database error.", error })
        }

        return res.status(200).json({ Success: true, tasks: {...response, id} })
    })
}

exports.deleteTask = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ Success: false, message: "Task id must required." })
    }

    Tasks.deleteTask(id, (error, response) => {
        if (error) {
            return res.status(500).json({ Success: false, message: "Database error.", error })
        }
        console.log(response);
        return res.status(200).json({ Success: true, tasks: {...response, id} })
    })
}