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
    name: {
      type: 'string',
      enum: ['mxn', 'col', 'real', 'rd', 'canada', 'euro', 'arp'],
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
    excangeRate: {
      collection: 'ExchangeRate',
      via: 'currency',
    },
  },
};
