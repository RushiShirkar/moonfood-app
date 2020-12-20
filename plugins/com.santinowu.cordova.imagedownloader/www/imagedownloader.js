var ImageDownloader = function () {};

ImageDownloader.prototype.download = download;

module.exports = new ImageDownloader();

/**
 * Invoke plugin for downloading image from URL
 *
 * @param {String} url
 * @param {Function} successFn
 * @param {Function} failureFn
 */
function download(url, successFn, failureFn) {
    cordova.exec(successFn, failureFn, 'ImageDownloader', 'download', [ url ]);
}
