const Controller = require('./controllers/task.controller')
const schema = require('./schema/task.schema')

const metadata = {
	script: 'task',
	description:'Wrapper for Task model'
}

module.exports = (...args) => {
	return new Controller(schema,metadata,...args)
}
