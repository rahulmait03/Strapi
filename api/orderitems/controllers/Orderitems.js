'use strict';

/**
 * Orderitems.js controller
 *
 * @description: A set of functions called "actions" for managing `Orderitems`.
 */

module.exports = {

  /**
   * Retrieve orderitems records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.orderitems.search(ctx.query);
    } else {
      return strapi.services.orderitems.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a orderitems record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.orderitems.fetch(ctx.params);
  },

  /**
   * Count orderitems records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.orderitems.count(ctx.query);
  },

  /**
   * Create a/an orderitems record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.orderitems.add(ctx.request.body);
  },

  /**
   * Update a/an orderitems record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.orderitems.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an orderitems record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.orderitems.remove(ctx.params);
  }
};
