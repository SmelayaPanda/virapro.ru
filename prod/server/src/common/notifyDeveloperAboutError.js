exports.handler = function (snap, context, transporter) {
  console.log(CONST.LOG_DELIMITER)
  let info = snap.val()
  console.log(info)
  return notifyDeveloperAboutError(transporter, info)
    .then(data => data)
    .catch(err => err)
}

let notifyDeveloperAboutError = function (transporter, info) {
  return new Promise((resolve, reject) => {

    let mailOptions = {
      from: ADMIN_EMAIL,
      to: DEVELOPER_EMAIL,
      subject: `ERROR NOTIFIER (Misterio Shop)`,
      text: info
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
