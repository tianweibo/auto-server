module.exports=app=>{
    const {STRING,INTEGER,DATE,TEXT}=app.Sequelize;
	const basicData=app.model.define('basicData',{
		fid:STRING(40),
        id:{type:INTEGER,primaryKey:true,autoIncrement:true},
        fname:STRING(20),
		label:STRING(20),
        value:STRING(40),
		children:TEXT,
		state:{defaultValue:1,type:INTEGER(2)},
		is_lower:{defaultValue:1,type:INTEGER(2)},
		bz:STRING
	}, {
		underscored: true,
        timestamps: false,
		freezeTableName: true,
		tableName: 'basicData',
	  })
	return basicData;
}