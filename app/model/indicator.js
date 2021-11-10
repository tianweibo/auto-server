const  moment =require('moment');
const sd = require('silly-datetime');
module.exports=app=>{
    const {STRING,INTEGER,DATE,TEXT}=app.Sequelize;
	const indicator=app.model.define('indicator',{
		indicator_id:{type:INTEGER,primaryKey:true,autoIncrement:true},
		indicator_name:{type:STRING(255),comment:'指标名称'},         
		indicator_type:{type:STRING(20),comment:'指标类型'},  
		indicator_type_label:{type:STRING(20),comment:'指标类型label'},     
		indicator_level:{type:STRING(20),comment:'一级指标'},  
		indicator_level_label:{type:STRING(20),comment:'一级指标label'},   
		indicator_code:{type:STRING(255),comment:'指标代码'},         
		indicator_label:{type:STRING(255),comment:'指标标签'}, 
		relationship_event:{defaultValue:1,type:INTEGER(2),comment:'事件关系'}, 
		indicator_label_label:{type:STRING(255),comment:'指标标签label'},         
		note:{type:STRING,comment:"备注"},  
		product_line_id:{type:INTEGER(11)},
		product_line_name:{type:STRING},                    
		create_time:{
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
		open_type:{defaultValue:1,type:INTEGER(2),comment:'数据来源'},
		create_people:{
			type:STRING(255),comment:'创建人',
		},
		state:{defaultValue:1,type:INTEGER(6)},
	}, {
        timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'indicator',
	  })
	  indicator.associate=function(){
		app.model.Indicator.belongsToMany(app.model.Application, {
            through: app.model.ApplicationIndicator,
            foreignKey: 'indicator_id',
            otherKey: 'application_id'
        });
        app.model.Indicator.belongsToMany(app.model.Event, {
            through: app.model.IndicatorEvent,
            foreignKey: 'indicator_id',
            otherKey: 'event_id'
        }); 
	  } 
	return indicator;
}