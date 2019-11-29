'use strict';

/**
 * Plantsexception.js controller
 *
 * @description: A set of functions called "actions" for managing `Plantsexception`.
 */

module.exports = {

  /**
   * Retrieve plantsexception records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.plantsexception.search(ctx.query);
    } else {
      return strapi.services.plantsexception.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a plantsexception record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.plantsexception.fetch(ctx.params);
  },

  /**
   * Count plantsexception records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.plantsexception.count(ctx.query);
  },

  /**
   * Create a/an plantsexception record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.plantsexception.add(ctx.request.body);
  },

  /**
   * Update a/an plantsexception record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.plantsexception.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an plantsexception record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.plantsexception.remove(ctx.params);
  }
};
