const parser = require('../lib/apple-trailer-url-parser');
const quality = require('../lib/quality');
var urls = parser.findAllClipsInAllQualities('independent', 'the-stray', 3);

urls.forEach(function (t) {
   console.log(t);
});
