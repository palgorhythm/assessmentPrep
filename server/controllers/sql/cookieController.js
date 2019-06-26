const controller = {};
/////////
controller.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.ssid, { httpOnly: true });
  return next();
};

// controller.signup({ body: { uname: 'bob', pw: 'dole' } });

module.exports = controller;
