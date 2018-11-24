/**
 * Question templater.
 * @version 0.0.1
 * @author Alexandr Dubinin <akiyamka@gmail.com>
 */

/**
 * Create random generator of items set;
 * @param {Array} library;
 * @return {Function} - function return random value from library
 */
export function setGenerator(library) {
  const min = 0;
  const max = library.length - 1;
  return () => library[
    Math.round(Math.random() * (max - min) + min)
  ];
}

/**
 * Like regular ES6 template tag, but eval every function on the fly
 * (Need for auto trigger generators in every question)
 */
export function question(strings, ...args) {
  return args.reduce((result, arg, i) => {
    const extractedExpression = typeof arg === 'function' ? arg() : arg;
    return result + strings[i] + extractedExpression;
  }, '') + strings.slice(-1);
}