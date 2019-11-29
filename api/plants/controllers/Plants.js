'use strict';

/**
 * Plants.js controller
 *
 * @description: A set of functions called "actions" for managing `Plants`.
 */

module.exports = {

  /**
   * Retrieve plants records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.plants.search(ctx.query);
    } else {
      return strapi.services.plants.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a plants record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.plants.fetch(ctx.params);
  },

  /**
   * Count plants records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.plants.count(ctx.query);
  },

  /**
   * Create a/an plants record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.plants.add(ctx.request.body);
  },

  /**
   * Update a/an plants record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.plants.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an plants record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.plants.remove(ctx.params);
  }
};
