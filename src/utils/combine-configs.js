const _ = require('lodash/fp');

const mergeArrayCustomizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) return _.union(srcValue, objValue);
};

const combineConfigs = _.reduce(_.mergeWith(mergeArrayCustomizer), undefined);

module.exports = combineConfigs;
