/**
 * String -> ES6 Template converter.
 * ----
 * @author Bryan Rayner <https://github.com/bryanerayner>
 * @author Stephan Meijer <https://github.com/smeijer>
 *
 * @param {string} template - string with template marks
 * @param {Object} map - object mapping template variables
 * @param {Object} fallback
 * @example
 * import parseES6Template from './es6-template-parser';
 * parseES6Template('${name} is now master of the ${galaxy}', {
 *   name: 'John',
 *   galaxy: 'Milky Way',
 * })
 * @returns {string}
 */
export default function parseTpl(template, map, fallback) {
  return template.replace(/\$\{.+?}/g, match => {
      const path = match.substr(2, match.length - 3).trim();
      return get(path, map, fallback);
  });
}

function get(path, obj, fb = `$\{${path}}`) {
  return path.split('.').reduce((res, key) => `${
    typeof res[key] === 'function' ? res[key]() : res[key]
  }` || fb, obj);
}