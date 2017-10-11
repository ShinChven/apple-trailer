const parser = require('../lib/apple-trailer-url-parser');
const quality = require('../lib/quality');
var urls = parser.buildUrl('lucasfilm', 'star-wars-the-last-jedi', 'star-wars-the-last-jedi-trailer-1', quality.h1080p_mov);
console.log(urls);