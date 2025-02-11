/**
 * This function get my Users
 * @group DEV
 * @route GET /v1/seed
 * @returns {Object} 200
 */

/**
 * WS
 * @group DEV
 * @route GET
 * @returns {Object} 101
 */

exports.Profile = require('./profileRouters');
exports.User = require('./userRouters');
exports.Post = require('./postRouters');
exports.Comment = require('./commentRouters');
exports.Security = require('./securityRouters');
exports.Feed = require('./feedRouters');