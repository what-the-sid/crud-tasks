const database = require('../../database')

const taskHandler = require('./task.handler')(database)

module.exports = {
	taskHandler
}
