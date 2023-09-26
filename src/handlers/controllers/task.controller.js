const { metricsDAO } = require('../../dao')
const { errorResponse } = require('./utils')

class TaskController {
	constructor(schema, metadata, database){
		this.database = database
		this.metadata = metadata
		this.schema = schema
	}

	/**
	 * API Handler to create tasks
	 * @date 26/09/2023 - 12:35:46
	 *
	 * @async
	 * @param {*} req
	 * @param {*} res
	 * @returns {res.status(code).json({*})}
	 */
	async create(req, res){
		const body = req.body
		const { createSchema } = this.schema
		const validation = createSchema.validate(body)

		if (validation.error) {
			return errorResponse(validation.error.message, 422, res)
		}

		const modelData = {
			name: body.name,
			status: 'OPEN'
		}
		const createRecord = await this.database.Tasks.create(modelData).then((true)).catch((false))

		if(!createRecord){
			return errorResponse('Something went wrong',500, res)
		}

		return res.status(200).json({
			error: false,
			message: 'Succesfully created task',
			data: modelData
		});

	}

	/**
	 * API Handler to update tasks
	 * @date 26/09/2023 - 12:35:46
	 *
	 * @async
	 * @param {*} req
	 * @param {*} res
	 * @returns {res.status(code).json({*})}
	 */
	async update(req, res){
		let body = req.body
		const params = req.params
		const { updateSchema } = this.schema
		const validation = updateSchema.validate(body)
		if(!params.id || !Number(params.id)){
			return errorResponse('"id" missing from path',422, res)
		}

		if (validation.error) {
			return errorResponse(validation.error.message, 422, res)
		}

		const task = await this.database.Tasks.findOne({
			where: { id:Number(params.id)}
		});

		if(!task){
			return errorResponse(`Task with Id ${params.id} not found`,404, res)
		}

		body = {updatedAt:new Date(),...body}
		const updateTask = await task.update(body).then((true)).catch((false))
		if(!updateTask){
			return errorResponse('Something went wrong',500, res)
		}

		return res.status(200).json({
			error: false,
			message: 'Succesfully updated task',
			data: body
		});
	}

	/**
	 * API Handler to get all tasks
	 * @date 26/09/2023 - 12:35:46
	 *
	 * @async
	 * @param {*} req
	 * @param {*} res
	 * @returns {res.status(code).json({*})}
	 */
	async getAll(req, res){
		const query = req.query
		const { getAllSchema } = this.schema
		const validation = getAllSchema.validate(query)
		const Op = this.database.Sequelize.Op;
		if (validation.error) {
			return errorResponse(validation.error.message, 422,res)
		}
		const getRecords = await this.database.Tasks.findAndCountAll({
			limit: Number(query.size),
			offset:Number(query.from),
			where: { 
				name: { [Op.like]: `%${query.search?query.search:''}%` },
				is_active:'is_active' in query?query.is_active:true
			}
		}).catch(([]))

		if(getRecords instanceof Array){
			return errorResponse('Something went wrong',500, res)
		}

		return res.status(200).json({
			error: false,
			message: 'Succesfully fetched tasks',
			data: getRecords
		});

	}

	/**
	 * API Handler to get tasks by id
	 * @date 26/09/2023 - 12:37:12
	 *
	 * @async
	 * @param {*} req
	 * @param {*} res
	 * @returns {res.status(code).json({*})}
	 */
	async getById(req, res){

		const params = req.params
		const { getByIdSchema } = this.schema
		const validation = getByIdSchema.validate(params)

		if (validation.error) {
			return errorResponse(validation.error.message, 422, res)
		}

		const getRecord = await this.database.Tasks.findOne({
			where: { id:Number(params.id)}
		}).catch(([]))

		if(getRecord instanceof Array){
			return errorResponse('Something went wrong',500, res)
		}

		return res.status(200).json({
			error: false,
			message: 'Succesfully fetched task',
			data: getRecord
		});

	}

	/**
	 * API Handler to get metrics of the tasks
	 * @date 26/09/2023 - 12:37:12
	 *
	 * @async
	 * @param {*} req
	 * @param {*} res
	 * @returns {res.status(code).json({*})}
	 */
	async metrics(req,res){
		const getMetrics = await metricsDAO(this.database.Tasks, this.database.sequelize).catch(console.log)

		return res.status(200).json({
			error: false,
			message: 'Succesfully fetched metrics',
			data: getMetrics
		});
	}
}

module.exports = TaskController
