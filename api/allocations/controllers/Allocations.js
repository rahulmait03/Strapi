'use strict';

/**
 * Allocations.js controller
 *
 * @description: A set of functions called "actions" for managing `Allocations`.
 */

module.exports = {

  /**
   * Retrieve allocations records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.allocations.search(ctx.query);
    } else {
      return strapi.services.allocations.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a allocations record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.allocations.fetch(ctx.params);
  },

  /**
   * Count allocations records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.allocations.count(ctx.query);
  },

  /**
   * Create a/an allocations record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.allocations.add(ctx.request.body);
  },

  /**
   * Update a/an allocations record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.allocations.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an allocations record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.allocations.remove(ctx.params);
  }
};
