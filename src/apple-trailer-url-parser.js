const qualities=require('./quality');

function buildUrl(studioName, movieName, trailerName, quality) {
    return 'http://movietrailers.apple.com/movies/' + studioName + '/' + movieName + '/' + trailerName + '_' + quality;
}

function findAllTrailers(studioName, movieName, size, quality) {
    var trailerUrls = [];
    for (var i = 1; i <= size; i++) {
        trailerUrls.push(buildUrl(studioName, movieName, movieName + '-trailer-' + i, quality));
    }
    return trailerUrls;
}

function findAllTrailersInAllQualities(studioName, movieName, size) {
    var trailerUrls = [];
    for (var i = 1; i <= size; i++) {

        for (var quality in qualities) {
            if (qualities.hasOwnProperty(quality)) {
                trailerUrls.push(buildUrl(studioName, movieName, movieName + '-trailer-' + i, qualities[quality]));
            }
        }
    }
    return trailerUrls;
}

function findAllClips(studioName, movieName, size, quality) {
    var trailerUrls = [];
    for (var i = 1; i <= size; i++) {
        trailerUrls.push(buildUrl(studioName, movieName, movieName + '-clip-' + i, quality));
    }
    return trailerUrls;
}

function findAllClipsInAllQualities(studioName, movieName, size) {
    var trailerUrls = [];
    for (var i = 1; i <= size; i++) {

        for (var quality in qualities) {
            if (qualities.hasOwnProperty(quality)) {
                trailerUrls.push(buildUrl(studioName, movieName, movieName + '-clip-' + i, qualities[quality]));
            }
        }
    }
    return trailerUrls;
}


module.exports = {
    buildUrl: buildUrl,
    findAllTrailers: findAllTrailers,
    findAllTrailersInAllQualities:findAllTrailersInAllQualities,
    findAllClips:findAllClips,
    findAllClipsInAllQualities:findAllClipsInAllQualities
};