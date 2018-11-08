const SMSClient = require('@alicloud/sms-sdk');

//////  发送短信
const accessKeyId = 'LTAIlwg5fF0QfIKa'
const secretAccessKey = 'nZbgmxWAvEkGR9wsAb6YP4CbMSZLDk'

//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey});

var sendMessage = function(number,phoneNumber){
    return  smsClient.sendSMS({
        PhoneNumbers: phoneNumber,
        SignName: '个人登录注册验证',
        TemplateCode: 'SMS_33970099',
        TemplateParam: '{"number":"'+ number+'"}'
    }).then(function (res) {
        return res;
        let {Code}=res
        if (Code === 'OK') {
            //处理返回参数
            console.log('*************************************************')
            console.log(res)
            console.log('*************************************************')
        }
    }, function (err) {
        console.log(err)
    })
};

module.exports = {
    sendMessage:sendMessage
}