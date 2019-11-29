'use strict';

/**
 * Driver.js controller
 *
 * @description: A set of functions called "actions" for managing `Driver`.
 */

module.exports = {

  /**
   * Retrieve driver records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.driver.search(ctx.query);
    } else {
      return strapi.services.driver.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a driver record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.driver.fetch(ctx.params);
  },

  /**
   * Count driver records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.driver.count(ctx.query);
  },

  /**
   * Create a/an driver record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.driver.add(ctx.request.body);
  },

  /**
   * Update a/an driver record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.driver.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an driver record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.driver.remove(ctx.params);
  }
};
