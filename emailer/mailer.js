/*********************************************************/
/******** Email Verification Mailer **********************/
'use strict';
const nodemailer = require('nodemailer');
//const conf       = require('./config');
// testing
const conf       = require('../app-config.js');


// reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: conf.emailer.service,
  auth: {
		type: conf.emailer.type,
		user: conf.emailer.user,
		cliendId: conf.emailer.clientId,
		clientSecret: conf.emailer.clientSecret,
	  	refreshToken: conf.emailer.refreshToken,
		accessToken: conf.emailer.accessToken
  }
});

// String -> String
function createVeriLink(userNameHash){
  // creates link for email verification
  return "http://localhost:" +
                 conf.server.port + "/" +
                 userNameHash;
}


// String -> Object
function mailOptions(userEmail, userNameHash){
  return {
    from: conf.emailer.sourceAddress,
    to: userEmail,
    subject: 'Welcome to the Delivery App',
    text: 'I send imail',
    html: `
      <section>
        <h1>Welcome to the Delivery App</h1>
        <h6>Beta Version</h6>
        <p>To finish signing up, <a href="` + createVeriLink(userNameHash) +
        `">click here</a>.</p>
      </section>
    `
  };
};

// Error, Object -> Void
function done(err, info){
  if(err) return console.log(err);

  return console.log('Message %s sent: %s',
              info.messageId,
              info.response);
}

// module.transporter.sendMail(mailOptions, done)
module.exports = {
  transporter: transporter,
  options: mailOptions,
  done: done
};
