var nodemailer = require('nodemailer')

// Replace with your SMTP credentials
const smtpOptions = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    // user: 'dsad@gmail.com', // prod
    user: 'salohiddin6361@gmail.com', // test
    // pass: 'lmicudhhiaheeenu' // prod
    pass: 'iqgxtuduiizqwnjp' // test
  }
}

const sendEmail = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      ...smtpOptions
    })

    return await transporter.sendMail({
      //from: 'dsa@gmail.com', // prod
      from: 'salohiddin6361@gmail.com', // test
      ...data
    })
  } catch (e) {
    console.log('err==>', e)
  }
}

module.exports = {
  sendEmail
}
