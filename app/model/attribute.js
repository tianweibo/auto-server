const  moment =require('moment');
const sd = require('silly-datetime');
module.exports=app=>{
    const {STRING,INTEGER,DATE,TEXT}=app.Sequelize;
	const attribute=app.model.define('attribute',{
		attribute_id:{type:INTEGER,primaryKey:true,autoIncrement:true},
		attribute_name:{type:STRING(255),comment:"属性名称"},            
		attribute_code:{type:STRING(255),comment:'属性代码'},     
		data_type:{type:STRING(20),comment:'数据类型'},
		data_type_label:{type:STRING(20),comment:'数据类型label'},
		desc:{type:STRING(255),comment:'单位格式说明'},               
		attribute_source:{type:STRING(255),comment:'属性来源'},        
        attribute_label:{type:STRING(255),comment:'属性标签'},
		attribute_label_label:{type:STRING(255),comment:'属性标签label'},          
		note:{type:STRING,comment:'备注'}, 
		is_common:{defaultValue:1,type:INTEGER(6),comment:'1公共属性 0自定义属性'},                    
		create_time:{
			type:DATE,
			get(){
				return moment(this.getDataValue('create_time')).format(
					'YYYY-MM-DD HH:MM:SS'
				);
			},defaultValue(){
				var sj = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
				return sj
			}
		},
		create_people:{
			type:STRING(255),comment:'创建人'
		}, 
		update_time:{
			type:DATE,
			get(){
				return moment(this.getDataValue('update_time')).format(
					'YYYY-MM-DD HH:MM:SS'
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
		open_type:{defaultValue:1,type:INTEGER(2),comment:'数据来源'}, 
		state:{defaultValue:1,type:INTEGER(6)},
		enum_data:STRING(255),                //数据字典的枚举
	}, {
        timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'attribute',
	  })
	  attribute.associate=function(){
		 app.model.Attribute.belongsToMany(app.model.Event, {
            through: app.model.EventAttribute,
            foreignKey: 'attribute_id',
            otherKey: 'event_id'
        }); 
	  } 
	return attribute;
}