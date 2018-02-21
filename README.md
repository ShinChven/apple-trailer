# apple-trailer
Apple Trailer site provides high quality trailer video, however it's not easy for you to download them. <p>
This library helps you find the HD trailer video urls.

# quick usage
[sample code](/test/test.js)

# functions

|function name|description|
|-|-|
|getPageData(url)| resolve Apple Trailer page data. <p>@param url apple trailer page url, http and https are both supported. <p>@returns {Promise<any>} a promise to return trailer page data.|
|getMostPop|most pop trailer feeds.|
|getOpening|opening movie feeds data.|
|getJustAdded|just added trailer feeds.|
|getRealVideoURL(clipUrl, q)| Video urls in Apple Trailer's json data can not be downloaded directly, this function serves to convert them to downloadable ones.<p> @param clipUrl data url.<p> @param q the quality you wish to convert.<p> @returns {*} real video url.|
|getVideoUrl(page, q)|Get all video urls in a trailer page. <p> @param page trailer page json data. <p> @param q video quality, if undefined, video all qualities will be returned.<p> @returns {Array} downloadable video urls.|

