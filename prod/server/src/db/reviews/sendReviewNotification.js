exports.handler = function (snap, context, transporter) {
  console.log(CONST.LOG_DELIMITER)
  let info = snap.data()
  console.log(info)
  return sendReviewNotificationToAdmin(transporter, info)
    .then(data => data)
    .catch(err => err)
}

let sendReviewNotificationToAdmin = function (transporter, info) {
  return new Promise((resolve, reject) => {

    let mailOptions = {
      from: ADMIN_EMAIL,
      to: ADMIN_EMAIL, DEVELOPER_EMAIL,
      subject: `Новый отзыв!`,
      text:
        `${info.user.name} оставил новый отзыв:
        "${info.text}"
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error)
      } else {
        resolve('Email sent: ' + info.response)
      }
    });
  })
}
