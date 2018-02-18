const appleTrailer = require('../src/index');
var stringArgv = require('string-argv');

/**
 * command line usage:
 * node test/test.js http://trailers.apple.com/trailers/magnolia/please-stand-by/
 */
function main() {
    let url = process.argv[2] || 'http://trailers.apple.com/trailers/magnolia/please-stand-by/';
    let quality =  process.argv[3];
    console.log('home:');
    console.log(url);
    console.log('');

    appleTrailer
        .getPageData(url)
        .then(function (data) {
            let title = data.page.movie_title;
            console.log('title:');
            console.log(title);
            console.log('');

            let videoUrls = appleTrailer.getVideoUrl(data, quality);
            console.log('video urls:');
            videoUrls.forEach(function (videoUrl) {
                console.log(videoUrl);
            });
            console.log('');

            console.log('heros');
            console.log(data.heros['0'].imageurl);
            console.log(data.heros['1'].imageurl);
        })
        .catch(function (err) {
            console.error(err);
        });
}

main();