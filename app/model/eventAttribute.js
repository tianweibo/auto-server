module.exports = app => {
    const { INTEGER } = app.Sequelize;
    const eventAttribute = app.model.define('eventAttribute', {
        event_id: {
            type: INTEGER,
            primaryKey: true
        },
        attribute_id: {
            type: INTEGER,
            primaryKey: true
        }
    },{
        timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'eventAttribute',
	});
    return eventAttribute;
}