const  moment =require('moment');
const sd = require('silly-datetime');
//var updatetimes = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
module.exports=app=>{
    const {STRING,INTEGER,DATE,TEXT}=app.Sequelize;
	const event=app.model.define('event',{
		event_id:{type:INTEGER,primaryKey:true,autoIncrement:true},
		event_name:{type:STRING(255),comment:'事件名称'},            
        event_code:{type:STRING(255),comment:'事件代码'},            
		event_trigger_mode:{type:STRING(60),comment:'触发类型'},  
		event_trigger_mode_label:{type:STRING(60),comment:'触发类型label'},       
		trigger_time:{type:STRING(255),comment:'触发时机'},          
        event_label:{type:STRING(255),comment:'事件标签'}, 
		event_label_label:{type:STRING(255),comment:'事件标签label'},           
		note:{type:TEXT,comment:'备注'},  
        general_attr:{type:TEXT,comment:'通用属性'},  
		open_type:{defaultValue:1,type:INTEGER(2),comment:'数据来源'},                
		create_time:{
			type:DATE,
			get(){
				return sd.format(this.getDataValue('create_time'),
					'YYYY-MM-DD HH:mm:ss'
				);
			},defaultValue(){
				var sj = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss').toString();
				return sj
			}
		},
		update_time:{
			type:DATE,
			get(){
				/* return moment(this.getDataValue('update_time')).format(
					'YYYY-MM-DD HH:MM:SS'
				); */
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
	}, {
        timestamps: false,
		updatedAt:'update_time',
		underscored: true,
		freezeTableName: true,
		tableName: 'event',
	  })
	  event.associate=function(){
		app.model.Event.belongsToMany(app.model.Attribute, {
            through: app.model.EventAttribute,
            foreignKey: 'event_id',
            otherKey: 'attribute_id'
        });
        app.model.Event.belongsToMany(app.model.Indicator, {
            through: app.model.IndicatorEvent,
            foreignKey: 'event_id',
            otherKey: 'indicator_id'
        }); 
	  } 
	return event;
}