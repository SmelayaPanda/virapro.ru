exports.handler = function (snap, context, transporter) {
    console.log(CONST.LOG_DELIMITER)
    let info = snap.data()
    console.log(info)
    return Promise.all([
        sendAdminEmailNotification(transporter, info),
    ])
        .then(data => data)
        .catch(err => err)
}

let sendAdminEmailNotification = function (transporter, info) {
    return new Promise((resolve, reject) => {

        let mailOptions = {
            from: ADMIN_EMAIL,
            to: [ADMIN_EMAIL, DEVELOPER_EMAIL].toString(),
            subject: `Новая заявка!`,
            text: `
      Имя _____________________ ${info.user.firstname}
      Телефон _________________ ${info.user.phone}
      ИД пользователя _________ ${info.user.id}
     
      Комментарий: ${info.comments.user}
      `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)
            } else {
                resolve(`Email sent: ${info.response}`)
            }
        });
    })
}
