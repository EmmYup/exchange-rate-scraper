module.exports.routes = {
  'get /': 'AppController.index',
  'get /exchangerate': 'ScraperController.index',
  'get /exchangerate/:name': 'ScraperController.show',
};
