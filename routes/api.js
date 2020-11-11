/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let locale = req.body.locale;
      let text = req.body.text;
      if (locale == undefined ||text == undefined) {
        return res.json({error:'Required field(s) missing'});
      }
      if (text == ''){
        return res.json({error: 'No text to translate' })
      }
      var possibleLocale = ['american-to-british', 'british-to-american'];
      if (possibleLocale.indexOf(locale) == -1) {
        return res.json({ error: 'Invalid value for locale field' });
      }

      let output = translator.translate(text,locale);
      if (output === text) {
        output = "Everything looks good to me!";
      }

      return res.json({text: text, translation:output});
      
    });
};
