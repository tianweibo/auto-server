const XLSX = require('xlsx');
module.exports = {
	parseInt(string) {
		if (typeof string === 'number') return string;
		if (!string) return string;
		return parseInt(string) || 0;
	},
	excelData(file, headerKeyMap, rwoTransform = row => row) {
		const { filepath } = file;
		const workbook = XLSX.readFile(filepath);
		// 读取内容
		let exceldata = [];
		let arr=[]
		arr[0]=workbook.SheetNames[0]
		arr.forEach(sheet => {
			if (workbook.Sheets.hasOwnProperty(sheet)) {
				const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]).map((row) => {
					const obj = {};
					Object.keys(headerKeyMap).forEach(key => {
						obj[headerKeyMap[key]] = row[key];
					});
					return rwoTransform(obj);
				});
				exceldata = [...exceldata, ...data];
			}
		});
		return exceldata;
	},
	creatUUId(){
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
			'',
			),
			uuid = new Array(36),
			rnd = 0,
			r;
		for (let i = 0; i < 36; i++) {
			if (i == 8 || i == 13 || i == 18 || i == 23) {
				uuid[i] = '-';
			} else if (i == 14) {
				uuid[i] = '4';
			} else {
				if (rnd <= 0x02) rnd = (0x2000000 + Math.random() * 0x1000000) | 0;
				r = rnd & 0xf;
				rnd = rnd >> 4;
				uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
			}
		}
		return uuid.join('');
    },
	dealMulValue(str,data){
		var temp='';
		if(str){
			var arr=str.split(',');
			for(var i=0;i<arr.length;i++){
				var sj = arr[i].replace(/\s*/g,"");
				temp+=data[sj]+',';
			}
        	temp=temp.substring(0, temp.lastIndexOf(','));
		}
        return temp
    },
	listToTree(oldArr1,flag){
		var oldArr=[]
		for(var i=0;i<oldArr1.length;i++){
			if(flag){
				var obj={
					key:oldArr1[i].id,
					fid:oldArr1[i].fid,
					title:oldArr1[i].label
				}
			}else{
				var obj={
					key:oldArr1[i].id,
					fid:oldArr1[i].fid,
					title:oldArr1[i].label,
					children:[]
				}
			}
			oldArr.push(obj)
		} 
		oldArr.forEach(element => {
			let fid = element.fid;
			if(fid !== 0){
			  oldArr.forEach(ele => {
				if(ele.key == fid){ //当内层循环的ID== 外层循环的parendId时，（说明有children），需要往该内层id里建个children并push对应的数组；
				  if(!ele.children){
					ele.children = [];
				  }
				  ele.children.push(element);
				  if(flag){
					ele.disabled=true
				  }
				}
			  });
			}
		});
		oldArr = oldArr.filter(ele => ele.fid === 0); //这一步是过滤，按树展开，将多余的数组剔除；
		oldArr = oldArr.filter(ele => ele.children!=undefined); //无子级的不展示
		if(flag){
			var temp=oldArr[0].children
			return temp;
		}
		return oldArr;
	},
	async calcLabelNumber(temp,Op,TheLabel,type){
			var idArr=[];
			if(type){
				for (var i = 0; i < temp.length; i++) {
					idArr.push({id:+temp[i]})
				} 
			}else{
				for (var i = 0; i < temp.length; i++) {
					idArr.push({id:+temp[i].id})
				} 
			}
			var objOption = {
				[Op.or]: idArr,
			} 
			var zhi= await TheLabel.findAll({
				where: objOption,
			},{attributes:['number','id']})
			var dataArr = [];
			if (zhi && zhi.length > 0) {
				for (var i = 0; i < zhi.length; i++) {
					if(type){
						dataArr.push({
							number:type=='add' ? zhi[i].number+1:(zhi[i].number==0?0:zhi[i].number-1),
							id:+zhi[i].id
						})
					}else{
						dataArr.push({
							number:temp[i].type=='add' ? zhi[i].number+1:(zhi[i].number==0?0:zhi[i].number-1),
							id:+zhi[i].id
						})
					}
				}
			}
			await TheLabel.bulkCreate(dataArr,{updateOnDuplicate:['number']})
	} 
	

}