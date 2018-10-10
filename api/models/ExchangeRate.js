/**
 * ExchangeRate.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    tableName: 'exchange_rate',
    id: {
      type: 'number',
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
    },
    createdAt: {
      type: 'datetime',
      columnName: 'created_at',
    },
    updatedAt: {
      type: 'datetime',
      columnName: 'updated_at',
    },
    // Relations
    currency: {
      model: 'Currency',
      columnName: 'id_currency',
    },
  },
};
