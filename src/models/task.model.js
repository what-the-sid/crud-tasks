'use strict'

module.exports = (sequelize, Sequelize) => {
	const { DataTypes, NOW } = Sequelize
	const Task = sequelize.define('Tasks', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		status: {
			type: DataTypes.ENUM('OPEN', 'COMPLETE', 'IN PROGRESS'),
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue:NOW
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue:NOW
		},
		is_active:{
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	});
	return Task;
};
