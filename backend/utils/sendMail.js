import nodemailer from "nodemailer";

export const sendMail = (options)=>{
    const transporter = nodemailer.createTransport({
        service : process.env.EMAIL_SERVICE,
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        }
    })


    const mailOption = {
        from: process.env.EMAIL_FROM,
        to:options.to,
        subject:options.subject,
        html:options.text
    }

    transporter.sendMail(mailOption,function(err,info){
        if(err){
            console.log(err)
        }else{
            console.log(info)
        }
    })
}