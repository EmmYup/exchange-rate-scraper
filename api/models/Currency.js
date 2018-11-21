/**
 * Currency.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Currency',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    CurenncyID: {
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    name: {
      type: 'string',
      enum: ['mxn', 'col', 'real', 'rd', 'canada', 'euro', 'arp'],
    },
    date: {
      type: 'datetime',
    },
    ExcangeRate: {
      collection: 'ExchangeRate',
      via: 'CurrencyID',
    },
  },
};
