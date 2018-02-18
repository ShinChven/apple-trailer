const appleTrailer = require('../src/index');

appleTrailer.getJustAdded().then(function (result) {
    console.log(JSON.stringify(result,null,3));
}).catch(function (err) {
    console.error(err)
});