'use strict';

/* global Agencies */

/**
 * Agencies.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const { convertRestQueryParams, buildQuery } = require('strapi-utils');

module.exports = {

  /**
   * Promise to fetch all agencies.
   *
   * @return {Promise}
   */

  fetchAll: (params, populate) => {
    const filters = convertRestQueryParams(params);
    const populateOpt = populate || Agencies.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)

    return buildQuery({
      model: Agencies,
      filters,
      populate: populateOpt,
    });
  },

  /**
   * Promise to fetch a/an agencies.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Agencies.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Agencies
      .findOne(_.pick(params, _.keys(Agencies.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count agencies.
   *
   * @return {Promise}
   */

  count: (params) => {
    const filters = convertRestQueryParams(params);

    return buildQuery({
      model: Agencies,
      filters: { where: filters.where },
    })
      .count()
  },

  /**
   * Promise to add a/an agencies.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Agencies.associations.map(ast => ast.alias));
    const data = _.omit(values, Agencies.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Agencies.create(data);

    // Create relational data and return the entry.
    return Agencies.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an agencies.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Agencies.associations.map(a => a.alias));
    const data = _.omit(values, Agencies.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Agencies.updateOne(params, data, { multi: true });

    // Update relational data and return the entry.
    return Agencies.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an agencies.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Agencies.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Agencies
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Agencies.associations.map(async association => {
        if (!association.via || !data._id || association.dominant) {
          return true;
        }

        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  },

  /**
   * Promise to search a/an agencies.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('agencies', params);
    // Select field to populate.
    const populate = Agencies.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Agencies.attributes).reduce((acc, curr) => {
      switch (Agencies.attributes[curr].type) {
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params._q))) {
            return acc.concat({ [curr]: params._q });
          }

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat({ [curr]: { $regex: params._q, $options: 'i' } });
        case 'boolean':
          if (params._q === 'true' || params._q === 'false') {
            return acc.concat({ [curr]: params._q === 'true' });
          }

          return acc;
        default:
          return acc;
      }
    }, []);

    return Agencies
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
