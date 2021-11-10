module.exports = app =>{

    let { validator } = app;
  
    // 校验用户名是否正确
    validator.addRule('username', (rule, value)=>{
      if (/^\d+$/.test(value)) {
        return "用户名应该是字符串";
      }
      else if (value.length < 3 || value.length > 10) {
        return '账号的长度应该在3-10之间'
      }
    });
    validator.addRule('phone', (rule, value)=>{
      if(value==''){
        return 
      }
      if (value.length < 7 || value.length > 12) {
        return '电话的长度应该在7-11之间'
      }
    });
  };