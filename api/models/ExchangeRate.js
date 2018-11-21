/**
 * ExchangeRate.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Exchange_Rate',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    ExchangeRateID: {
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    buy: {
      type: 'float',
    },
    sell: {
      type: 'float',
    },
    country: {
      type: 'string',
      enum: [
        'mexico',
        'brazil',
        'colombia',
        'dominica',
        'canada',
        'euro',
        'argentina',
      ],
    },
    date: {
      type: 'datetime',
    },

    // Relations
    CurrencyID: {
      model: 'Currency',
    },
  },
};
