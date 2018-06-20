exports.handler = function (snap, context, transporter) {
  console.log(CONST.LOG_DELIMITER)
  let info = snap.data()
  console.log(info)
  return Promise.all([
    sendOrderEmailNotifyToAdmin(transporter, info),
    sendOrderEmailNotifyToBuyer(transporter, info)
  ])
    .then(data => data)
    .catch(err => err)
}

let sendOrderEmailNotifyToAdmin = function (transporter, info) {
  let products = ''
  for (let p of info.products){
    products += `${p.title} (${p.qty} х ${p.price} РУБ, Артикул: ${p.SKU})\n        `
  }
  return new Promise((resolve, reject) => {

    let mailOptions = {
      from: ADMIN_EMAIL,
      to: [ADMIN_EMAIL, DEVELOPER_EMAIL].toString(),
      subject: `Новая покупка!`,
      text: `
      Покупатель:

      Фамилия Имя _____________ ${info.buyer.lastname} ${info.buyer.firstname}
      Email ___________________ ${info.buyer.email}
      Телефон _________________ ${info.buyer.phone}
      ИД пользователя _________ ${info.buyer.userId}
     
     
      Доставка:
      Страна __________________ ${info.delivery.address.country}
      Город ___________________ ${info.delivery.address.city}
      Улица ___________________ ${info.delivery.address.street}
      Дом _____________________ ${info.delivery.address.build}
      Квартира ________________ ${info.delivery.address.house}
      Почтовый индекс _________ ${info.delivery.address.postCode}
     
      Товары:
      ${products}
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


let sendOrderEmailNotifyToBuyer = function (transporter, info) {
  return new Promise(((resolve, reject) => {
    let mailOptions = {
      from: ADMIN_EMAIL,
      to: info.buyer.email,
      subject: `Misterio shop: покупка товара`,
      text: `
      ${info.buyer.firstname}, спасибо за Вашу покупку на нашем сайте.   
      Мы свяжемся с Вами по телефону ${info.buyer.phone} в ближайшее время для подтвердения заказа!
         
      ${CONST.EMAIL_SIGN}
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error)
      } else {
        resolve('Email sent: ' + info.response)
      }
    });
  }))
}
