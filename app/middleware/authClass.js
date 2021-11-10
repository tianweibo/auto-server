const jwt = require('jsonwebtoken')

class Auth {
    constructor(level) {
        this.level = level || 1
    }
    get check() {
        return async (ctx, next) => {
            try {
                var decode = jwt.verify(ctx.get('Authorization'), ctx.app.config.jwt.cert)
                console.log('decode',decode)
            } catch (error) {
                if (error.name == 'TokenExpiredError'){
                    //ctx.status = 401
                    ctx.body = {
                        status: 401,
                        msg: 'token已过期,请重新登录'
                    }
                    return
                }
                //ctx.status = 401
                ctx.body = {
                    status: 401,
                    msg: '授权失败，请重新登录'
                }
                return
            }

            if(decode.scope < this.level){
                //ctx.status = 401
                console.log(decode.scope , this.level)
                ctx.body = {
                    status: 401,
                    msg: '权限不足'
                }
                return
            }
            await next()
        }
    }
}

module.exports = {
    Auth
}