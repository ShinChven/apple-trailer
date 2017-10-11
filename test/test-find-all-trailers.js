const parser = require('../src/apple-trailer-url-parser');
const quality = require('../src/quality');
var urls = parser.findAllClipsInAllQualities('independent', 'the-stray', 3);

urls.forEach(function (t) {
   console.log(t);
});
