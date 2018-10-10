/**
 * Currency.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    tableName: 'currency',
    id: {
      type: 'number',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    country: {
      type: 'string',
      enum: ['mxn', 'col', 'real', 'rd', 'canada', 'euro', 'arp'],
    },
    // Relations
    excangeRate: {
      collection: 'ExchangeRate',
      via: 'currency',
    },
  },
};
