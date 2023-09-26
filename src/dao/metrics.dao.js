/*eslint quotes: ["error", "single", { "allowTemplateLiterals": true }]*/

module.exports = async (database,sequelize) => {
	/**
	 * Function to Query that counts tasks based on status and dates
	 * @date 26/09/2023 - 12:34:25
	 *
	 * @type {{ open_tasks: number; inprogress_tasks: number; completed_tasks: number; }}
	 */
	const totalCount = {
		open_tasks:0,
		inprogress_tasks:0,
		completed_tasks:0
	}
	const getMetrics = await database.findAll({
		attributes: [
			[sequelize.fn('strftime', '%m-%Y', sequelize.col('createdAt')), 'date'],
			[sequelize.fn('COUNT', sequelize.literal('CASE WHEN status = "OPEN" THEN 1 ELSE null END')), 'open_tasks'],
			[sequelize.fn('COUNT', sequelize.literal('CASE WHEN status = "IN PROGRESS" THEN 1 ELSE null END')), 'inprogress_tasks'],
			[sequelize.fn('COUNT', sequelize.literal('CASE WHEN status = "COMPLETE" THEN 1 ELSE null END')), 'completed_tasks'],
		],
		group: [sequelize.fn('strftime', '%m-%Y', sequelize.col('createdAt')), 'status'],
		raw: true
	}).catch(e=>{
		console.log('Error fetching metrics:::',e)
		return []
	})
	const formattedResult = getMetrics.reduce((acc, row) => {
		const [month, year] = row.date.split('-');
		const date = new Date(year, month - 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });

		if (!acc[date]) {
			acc[date] = { metrics: { open_tasks: 0, inprogress_tasks: 0, completed_tasks: 0 } };
		}
		acc[date].metrics.open_tasks += parseInt(row.open_tasks);
		acc[date].metrics.inprogress_tasks += parseInt(row.inprogress_tasks);
		acc[date].metrics.completed_tasks += parseInt(row.completed_tasks);

		totalCount.open_tasks += parseInt(row.open_tasks)
		totalCount.inprogress_tasks += parseInt(row.inprogress_tasks)
		totalCount.completed_tasks += parseInt(row.completed_tasks)
		return acc;
	}, {});
	return {
		total: totalCount,
		period:formattedResult
	}
}
