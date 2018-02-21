const appleTrailer = require('../src/index');

/**
 * node test/test.js http://trailers.apple.com/trailers/magnolia/please-stand-by/
 */
function main() {
    // set trailer page url and video quality.
    let url = process.argv[2] || 'http://trailers.apple.com/trailers/magnolia/please-stand-by/';
    let quality =  process.argv[3];
    console.log('home:');
    console.log(url);
    console.log('');

    appleTrailer
        .getPageData(url) // get page data
        .then(function (data) {
            let title = data.page.movie_title;
            console.log('title:');
            console.log(title);
            console.log('');

            // get video url.
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