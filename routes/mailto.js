;(function() {
  "use strict";

  var express = require("express"),
      nodemailer =  require("nodemailer"),
      router = express.Router(),
      common = require('../common'),
      config = common.config();

  router.post("/", function (req, res) {

    var smtpTrans = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
          user: config.gmail_user,
          pass: config.gmail_pass
        }
      });

    var mailOpts = {
        from: req.body.firstName + ' &lt;' + req.body.email + '&gt;',
        to: config.gmail_user,
        subject: 'Personal Website contact form',
        text: req.body.message
      };


    smtpTrans.sendMail(mailOpts, function (error, response) {

      if (error) {
          res.json({
            title: 'Raging Flame Laboratory - Contact',
            msg: 'Error occured, message not sent.',
            err: true,
            page: 'contact'
          });
      }
      else {
          res.json({
            title: 'Raging Flame Laboratory - Contact',
            msg: 'Message sent! Thank you.',
            err: false,
            page: 'contact'
          });
      }
    });

  });

  module.exports = router;
})();
