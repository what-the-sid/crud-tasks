//task.route.js
//Routes for CRUD in task table
const taskRouter = require('express').Router();
const { taskHandler } = require('../handlers')
const { asyncWrapper } = require('../helpers')

taskRouter.get('/',asyncWrapper(taskHandler.getAll.bind(taskHandler)))
taskRouter.get('/metrics',asyncWrapper(taskHandler.metrics.bind(taskHandler)))
taskRouter.get('/:id',asyncWrapper(taskHandler.getById.bind(taskHandler)))

taskRouter.post('/create',asyncWrapper(taskHandler.create.bind(taskHandler)))

taskRouter.patch('/:id',asyncWrapper(taskHandler.update.bind(taskHandler)))

module.exports = {
	path:'/tasks',
	router:taskRouter
};
