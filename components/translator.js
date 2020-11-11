const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  translate(input, locale) {
    if (locale == 'british-to-american') {
      return this.translateBritishToAmerican(input);
    }
    return this.translateAmericanToBritish(input);
  }

  translateBritishToAmerican(input, highlight = true) {
    for (let key in britishOnly) {
      let trad = '#'+britishOnly[key]+'#';
      if(highlight) {
        trad = `<span class="highlight">${trad}</span>`;
      }
      const regex = new RegExp(`\\b${key}\\b`, 'gi');
      const regexverif = new RegExp(`(#${key}|${key}#)`, 'gi');
      if (regexverif.test(input)){
        continue;
      }
      input = input.replace(regex,trad);
    }
    input = input.replace(/#/g,'');
    for (let trad in americanToBritishSpelling) {
      let key = americanToBritishSpelling[trad];
      if(highlight) {
        trad = `<span class="highlight">${key}</span>`;
      }
      const regex = new RegExp(`(?!\\s|^)${key}\\b`, 'gi');

      input = input.replace(regex, trad);
    }


    for (let trad in americanToBritishTitles) {
      let key = americanToBritishTitles[trad];
      if(highlight) {
        trad = `<span class="highlight">${key}</span>`;
      }
      const regex = new RegExp(`\\b${key}\\b`, 'gi');
      input = input.replace(regex,trad);
    }
      
    if (/\d+.\d+/.test(input)) {
      const match = input.match(/\d+.\d+/)[0];
      let trad = match.replace(".", ":");
      if(highlight) {
        trad = `<span class="highlight">${trad}</span>`;
      }
      input = input.replace(match, trad);
    }


    return input;
  }
  
  translateAmericanToBritish(input, highlight = true) {
    for (let key in americanToBritishSpelling) {
      let trad = americanToBritishSpelling[key];
      if(highlight) {
        trad = `<span class="highlight">${trad}</span>`;
      }
      const regex = new RegExp(`\\b${key}\\b`, 'gi');
      input = input.replace(regex, trad);
    }
    for (let key in americanOnly) {
      let trad = americanOnly[key];
      if(highlight) {
        trad = `<span class="highlight">${trad}</span>`;
      }
      const regex = new RegExp(`\\b${key}\\b`, 'gi');
      input = input.replace(regex,trad);
    }
    for (let key in americanToBritishTitles) {
      let trad = americanToBritishTitles[key];
      if(highlight) {
        trad = `<span class="highlight">${trad}</span>`;
      }
      input = input.replace(key,trad);
    }
      
    if (/\d+:\d+/.test(input)) {
      const match = input.match(/\d+:\d+/)[0];
      let trad = match.replace(":", ".");
      if(highlight) {
        trad = `<span class="highlight">${trad}</span>`;
      }
      input = input.replace(match, trad);
    }


    return input;
  }
}

module.exports = Translator;