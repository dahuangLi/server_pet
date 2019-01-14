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
    console.log(ctx.request.body)

    const resultMessage = await Message.sendMessage(ctx.request.body.number,ctx.request.body.phoneNumber);
    let resultDb = await dbFuncs.insertData({phoneNumber:ctx.request.body.phoneNumber}).then(function (data) {
        return data.result;
    });
    
   if(resultMessage.status){
    ctx.response.body = {
        status:resultMessage.status,
        data:{
            checkNumber:ctx.request.body.number
        }
    }
   }else{
    ctx.response.body = resultMessage;
   }

});

app.use(router.routes());
app.listen(3020)