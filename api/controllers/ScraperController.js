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

  async show(req, res) {
    try {
      const name = req.param('name');
      const exchanceRate = await ScraperService.getSingle(name);
      res.ok(exchanceRate);
    } catch (error) {
      res.negotiate(error);
    }
  },
};
