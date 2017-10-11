const parser = require('../src/apple-trailer-url-parser');
const quality = require('../src/quality');
var urls = parser.buildUrl('lucasfilm', 'star-wars-the-last-jedi', 'star-wars-the-last-jedi-trailer-1', quality.h1080p_mov);
console.log(urls);