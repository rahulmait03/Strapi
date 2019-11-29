'use strict';

/**
 * Trucks.js controller
 *
 * @description: A set of functions called "actions" for managing `Trucks`.
 */

module.exports = {

  /**
   * Retrieve trucks records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.trucks.search(ctx.query);
    } else {
      return strapi.services.trucks.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a trucks record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.trucks.fetch(ctx.params);
  },

  /**
   * Count trucks records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.trucks.count(ctx.query);
  },

  /**
   * Create a/an trucks record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.trucks.add(ctx.request.body);
  },

  /**
   * Update a/an trucks record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.trucks.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an trucks record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.trucks.remove(ctx.params);
  }
};
