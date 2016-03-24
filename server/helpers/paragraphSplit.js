var Handlebars = require('handlebars');

function paragraphSplit(plaintext) {
  var i, output = '',
      lines = plaintext.split(/\r\n|\r|\n/g);
  for (i = 0; i < lines.length; i++) {
    if(lines[i]) {
      output += '<p>' + lines[i] + '</p>';
    }
  }
  return new Handlebars.SafeString(output);
}

module.exports = paragraphSplit;
