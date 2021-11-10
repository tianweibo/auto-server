const  moment =require('moment');
const sd = require('silly-datetime');
module.exports=app=>{
    const {STRING,INTEGER,DATE,TEXT}=app.Sequelize;
	const theLabel=app.model.define('theLabel',{
		fid:INTEGER(40),
        id:{type:INTEGER,primaryKey:true,autoIncrement:true},
        fname:STRING(20),
		label:STRING(20),
		state:{defaultValue:1,type:INTEGER(2)},
		number:{defaultValue:0,type:INTEGER},
		is_lower:{defaultValue:1,type:INTEGER(2)},
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
	}, {
		underscored: true,
        timestamps: false,
		freezeTableName: true,
		tableName: 'theLabel',
	  })
	return theLabel;
}