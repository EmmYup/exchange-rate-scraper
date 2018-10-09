/**
 * ScraperController
 *
 * @description :: Server-side logic for managing scrapers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  async index(req, res) {
    try {
      const currencies = await ScraperService.getCurrencies();
      res.ok(currencies);
    } catch (error) {
      res.negotiate(error);
    }
  },
};
