'use strict';

/**
 * Agencies.js controller
 *
 * @description: A set of functions called "actions" for managing `Agencies`.
 */

module.exports = {

  /**
   * Retrieve agencies records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.agencies.search(ctx.query);
    } else {
      return strapi.services.agencies.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a agencies record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.agencies.fetch(ctx.params);
  },

  /**
   * Count agencies records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.agencies.count(ctx.query);
  },

  /**
   * Create a/an agencies record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.agencies.add(ctx.request.body);
  },

  /**
   * Update a/an agencies record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.agencies.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an agencies record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.agencies.remove(ctx.params);
  }
};
