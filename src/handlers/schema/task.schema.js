const Joi = require('joi')

/**
 * Schema for create API Payload
 * @date 26/09/2023 - 12:37:58
 *
 * @type {*}
 */
const createSchema = Joi.object({
	name: Joi.string().required()
})

/**
 * Schema for update API Payload
 * @date 26/09/2023 - 12:37:58
 *
 * @type {*}
 */
const updateSchema = Joi.object({
	name: Joi.string().optional(),
	status: Joi.string().valid('OPEN','IN PROGRESS', 'DONE').optional(),
	is_active: Joi.number().valid(0,1).optional()
})

/**
 * Schema for Get All Tasks API Payload
 * @date 26/09/2023 - 12:37:58
 *
 * @type {*}
 */
const getAllSchema = Joi.object({
	search: Joi.string().optional(),
	from: Joi.number().required(),
	size: Joi.number().required(),
	is_active: Joi.number().valid(0, 1).optional()
})

/**
 * Schema for Get By Id API Payload
 * @date 26/09/2023 - 12:37:58
 *
 * @type {*}
 */
const getByIdSchema = Joi.object({
	id: Joi.number().required()
})

module.exports = {
	createSchema,
	getAllSchema,
	getByIdSchema,
	updateSchema
}
