module.exports = app => {
    const { INTEGER } = app.Sequelize;
    const applicationIndicator = app.model.define('applicationIndicator', {
        application_id: {
            type: INTEGER,
            primaryKey: true
        },
        indicator_id: {
            type: INTEGER,
            primaryKey: true
        },
        open_type:{defaultValue:1,type:INTEGER(2),comment:'数据来源'}, 
    },{
        timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'applicationIndicator',
	});
    return applicationIndicator;
}