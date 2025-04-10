const { getAllTaskById, addTask, updateTask, deleteTask, updateStatus } = require('../controler/tasks.controler');

const router = require('express').Router();

router.route('/AllTasks/:id').get(getAllTaskById);
router.route('/AddTask').post(addTask);
router.route('/UpdateTask').post(updateTask);
router.route('/UpdateStatus/:id').get(updateStatus);
router.route('/DeleteTask/:id').get(deleteTask);

module.exports = router;