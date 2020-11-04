const fs = require('fs-extra');
const process = require('process');
const signale = require('signale');

const { slugify, validateInput } = require('./slug');

const EXTENSION = '.md';
const RELATIVE_POST_DIR = '/posts/';
const ABSOLUTE_POST_DIR = process.cwd() + RELATIVE_POST_DIR;

module.exports = async () => {
  const title = validateInput(process.argv[2])
    ? process.argv[2].toString()
    : null;

  const currentDate = () => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  };
  // Exit if no valid title argument is passed
  if (!title) {
    signale.fatal('Error: Invalid title.');
    process.exit();
  }

  const slug = slugify(title);
  const date = new Date().toLocaleString();
  const path = `/${slug}/`;

  const frontmatter =
    `---\n` +
    `title: "${title}"\n` +
    `date: "${currentDate()}"\n` +
    `published: true\n` +
    `tags:\n` +
    `  - change_me\n` +
    `---\n\n` +
    `[[snippet]]\n` +
    `| Mô tả ở đây\n` +
    `| Hoặc có thể viết trên nhiều dòng\n`;

  signale.pending(`Attempting to create post titled "${title}"...`);

  // Exit if the folder already exists
  if (fs.existsSync(ABSOLUTE_POST_DIR + slug + EXTENSION)) {
    signale.fatal(`Error: Blog post at '/${slug}/' already exists.`);
    process.exit();
  } else {
    try {
      fs.outputFileSync(
        `${ABSOLUTE_POST_DIR}/${slug}${EXTENSION}`,
        frontmatter,
      );
      signale.success(`Blog post created at '${RELATIVE_POST_DIR}${slug}${EXTENSION}'`);
    } catch (error) {
      signale.fatal(new Error(`Error creating blog post:\n${error.message}`));
    }
  }
};
