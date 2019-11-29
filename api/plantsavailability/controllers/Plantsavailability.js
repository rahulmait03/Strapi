'use strict';

/**
 * Plantsavailability.js controller
 *
 * @description: A set of functions called "actions" for managing `Plantsavailability`.
 */

module.exports = {

  /**
   * Retrieve plantsavailability records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.plantsavailability.search(ctx.query);
    } else {
      return strapi.services.plantsavailability.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a plantsavailability record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.plantsavailability.fetch(ctx.params);
  },

  /**
   * Count plantsavailability records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.plantsavailability.count(ctx.query);
  },

  /**
   * Create a/an plantsavailability record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.plantsavailability.add(ctx.request.body);
  },

  /**
   * Update a/an plantsavailability record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.plantsavailability.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an plantsavailability record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.plantsavailability.remove(ctx.params);
  }
};
