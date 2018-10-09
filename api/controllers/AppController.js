/**
 * AppController
 *
 * @description :: Server-side logic for managing Apps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const { name, version } = require('../../package');
module.exports = {
  index(req, res) {
    res.ok({ name, version });
  },
};
