module.exports = app => {
    const { INTEGER,STRING } = app.Sequelize;
    const reportBetween = app.model.define('reportBetween', {
        report_id: {
            type: INTEGER,
            primaryKey: true
        },
        card_ids: {
            type: STRING(1000)
        },
        table_ids: {
            type: STRING(1000)
        },
        trend_ids: {
            type: STRING(1000)
        }
    },{
        timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'reportBetween',
	});
    return reportBetween;
}