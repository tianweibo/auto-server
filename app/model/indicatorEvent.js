module.exports = app => {
    const { INTEGER } = app.Sequelize;
    const indicatorEvent = app.model.define('indicatorEvent', {
        indicator_id: {
            type: INTEGER,
            primaryKey: true
        },
        event_id: {
            type: INTEGER,
            primaryKey: true
        }
    },{
        timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'indicatorEvent',
	});
    return indicatorEvent;
}