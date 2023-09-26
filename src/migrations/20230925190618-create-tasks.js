'use strict';
module.exports = {
	/**
	 * Migration function to generate a table inside SQLite
	 * @date 26/09/2023 - 12:40:58
	 *
	 * @async
	 * @param {*} queryInterface
	 * @param {*} Sequelize
	 * @returns {undefined}
	 */
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Tasks', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			status: {
				type: Sequelize.STRING
			},
			is_active: {
				type: Sequelize.BOOLEAN
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface) {
		await queryInterface.dropTable('Tasks');
	}
};
