/**
 * Convert a string to a URI slug.
 * eg: "Hello World" => "hello-world"
 *
 * @param {String} string
 * @return {String}
 */
const slugify = (string) => {
  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

/**
 * Validate that the input is a string.
 *
 * @param {String}
 * @return {Boolean}
 */
const validateInput = (string) => {
  return typeof string === 'string';
};

module.exports = {
  slugify,
  validateInput,
};
