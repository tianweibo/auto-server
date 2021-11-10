const  moment =require('moment');
const sd = require('silly-datetime');
module.exports=app=>{
	const {STRING,INTEGER,DATE}=app.Sequelize;
	const productLine=app.model.define('productLine',{
		id:{
			type:INTEGER,
			primaryKey:true,
			autoIncrement:true,
		},
		productname:{
			type:STRING,
		},
		product_use:{defaultValue:1,type:INTEGER(2),comment:'是否启用'},
		status:{defaultValue:1,type:INTEGER(11)},
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
		remark:{
			type:STRING
		}
	},{
		freezeTableName: true, // 使用数据库里的真实表名
		underscored: true, // 不使用下划线
		tableName:'productLine'
	});
	return productLine;
}