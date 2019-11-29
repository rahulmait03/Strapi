'use strict';

/**
 * Orderitemdemand.js controller
 *
 * @description: A set of functions called "actions" for managing `Orderitemdemand`.
 */

module.exports = {

  /**
   * Retrieve orderitemdemand records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.orderitemdemand.search(ctx.query);
    } else {
      return strapi.services.orderitemdemand.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a orderitemdemand record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.orderitemdemand.fetch(ctx.params);
  },

  /**
   * Count orderitemdemand records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.orderitemdemand.count(ctx.query);
  },

  /**
   * Create a/an orderitemdemand record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.orderitemdemand.add(ctx.request.body);
  },

  /**
   * Update a/an orderitemdemand record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.orderitemdemand.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an orderitemdemand record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.orderitemdemand.remove(ctx.params);
  }
};
