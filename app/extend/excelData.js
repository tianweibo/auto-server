import * as XLSX from 'xlsx'; // 使用 xlsx包
module.exports={
  excelData(file, headerKeyMap, rwoTransform = row => row){
    const { filepath } = file;
  const workbook = XLSX.readFile(filepath);

  // 读取内容
  let exceldata = [];
  workbook.SheetNames.forEach(sheet => {
    if (workbook.Sheets.hasOwnProperty(sheet)) {
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]).map((row) => {
        const obj= {};
        Object.keys(headerKeyMap).forEach(key => {
          obj[headerKeyMap[key]] = row[key];
        });
        return rwoTransform(obj);
      });
      exceldata = [...exceldata, ...data];
    }
  });
  return exceldata;
  }
}



