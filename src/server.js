const Koa = require('koa')
const path = require('path')
const message = require('./common/sendMessage')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const router = new Router();

app.use(bodyParser());

// 获取验证码
router.post('/getCheckNumber',async function (ctx, next) {

    //  获取随机数
    var number = "";

    var numberArr = ["0","1","2","3","4","5","6","7","8","9"];
    for(var i = 0;i<6;i++){
        number = number + numberArr[Math.floor(Math.random()*10)];
    };

    const result = await message.sendMessage(number,ctx.request.body.phoneNumber);

    let status;

    result.Message == 'OK'? 1 : 0

    ctx.response.body = {
        status,
        data:{
            checkNumber:number
        }
    }

});


app.listen(3000)