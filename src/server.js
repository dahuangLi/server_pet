const Koa = require('koa')
const path = require('path')
const Message = require('./common/sendMessage')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const router = new Router();
const dbFuncs = require('./common/db')

app.use(bodyParser());

// 获取验证码
router.post('/getCheckNumber',async function (ctx, next) {
    // console.log(ctx)
    //  获取随机数
    var number = "";

    var numberArr = ["0","1","2","3","4","5","6","7","8","9"];
    for(var i = 0;i<6;i++){
        number = number + numberArr[Math.floor(Math.random()*10)];
    };

    const result = await Message.sendMessage(number,ctx.request.body.phoneNumber);
    console.log(result)

    let status = result.status;

    ctx.response.body = {
        status:status,
        data:{
            checkNumber:number
        }
    }
});

app.use(router.routes());
app.listen(3020)