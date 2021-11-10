const  moment =require('moment');
const sd = require('silly-datetime');
module.exports=app=>{
    const {STRING,INTEGER,DATE,TEXT}=app.Sequelize;
	const report=app.model.define('report',{
		report_id:{type:INTEGER,primaryKey:true,autoIncrement:true},
        report_name:{type:STRING(255),comment:'报表名称'},
		create_time:{
			type:DATE,
			get(){
				return sd.format(this.getDataValue('create_time'),
					'YYYY-MM-DD HH:mm:ss'
				);
			},defaultValue(){
				var sj = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
				return sj
			}
		},
		update_time:{
			type:DATE,
			get(){
				return sd.format(this.getDataValue('create_time'),
					'YYYY-MM-DD HH:mm:ss'
				);
			},
			defaultValue(){
				var sj = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
				return sj
			}
		},
		update_people:{
			type:STRING(255),
			comment:'更新人'
		},
		create_people:{
			type:STRING(255),comment:'创建人'
		},
		state:{defaultValue:1,type:INTEGER(6)},
		product_line_id:{type:INTEGER(11)},
		product_line_name:{type:STRING},
		data_state:{defaultValue:0,type:INTEGER(6),comment:'数据状态'},
	}, {
        timestamps: false,
		updatedAt:'update_time',
		underscored: true,
		freezeTableName: true,
		tableName: 'report',
	  })
      report.associate=function(){
		app.model.Report.belongsTo(app.model.Application, {
            foreignKey: 'application_id',
            otherKey: 'report_id'
        }); 
		app.model.Application.hasMany(app.model.Report, {foreignKey: 'application_id', targetKey: 'report_id'});
	  } 
	return report;
}