const database = require('../../database')

describe('Testing Databse:::', () => {
	it('SUCCESS:Create task', async () => {
		const data = {
			'name':'Test123_Task',
			'status':'OPEN'
		}
		const createRecord = await database.Tasks.create(data)
		.then(()=>{ return true })
		.catch(()=>{ return false })
		expect(createRecord).toStrictEqual(true);
	})

	it('SUCCESS:Delete task', async () => {
		const taskName = 'Test123_Task'
		const deleteRecord = await database.Tasks.destroy({
			where: {
				name: taskName
			},
		}).then(()=>{ return true })
		.catch(()=>{ return false })
		expect(deleteRecord).toStrictEqual(true);
	})
});
