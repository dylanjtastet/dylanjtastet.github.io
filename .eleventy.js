module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ './src/static/': '/' });
    eleventyConfig.addWatchTarget('./src/_includes/css/');

    return {
        dir: {
          input: 'src',
          output: '_site',
          data: './_data',
          includes: './_includes',
          layouts: './_layouts'
        },
        templateFormats: [
          'md',
          'njk',
          '11ty.js'
        ],
        htmlTemplateEngine: 'njk'
    };
}