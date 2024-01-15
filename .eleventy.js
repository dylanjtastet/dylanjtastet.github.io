const sass = require("sass")
const path = require("node:path")
const debug = require("debug")

module.exports = function (eleventyConfig) {
    // 11ty config
    eleventyConfig.addPassthroughCopy({ './src/static/': '/' });
    eleventyConfig.addWatchTarget('./src/_includes/css/');

    // Shortcodes
    eleventyConfig.addShortcode("hotel", (name, img, map, distance_tastet, distance_mcdarris, distance_venue) => {
      return `
        <div class="container hotel">
        <hr class="top-hr">
          <h1>${name}</h1>
          <div class="hotel-media row">
            <iframe class="col-sm" src="${map}"
              style="border:0;"
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
            <img class="col-sm" src="${img}"/>
          </div>
          <div class="row container hotel-bottom">
            <div class="hotel-info hotel-info--border">
              <p>Distance from McDarrises: ${distance_mcdarris}</p>
              <p>Distance from Tastets: ${distance_tastet}</p>
              <p>Distance from the venue: ${distance_venue}</p>
            </div>
          </div>
        <hr class="bottom-hr">
        </div>
      `
    })

    // Extensions
    eleventyConfig.addExtension("scss", {
      outputFileExtension: "css",
      compileOptions: {
        permalink: function(contents, inputPath){
          let parsed = path.parse(inputPath)
          if(parsed.name.startsWith("_")){
            return false;
          }
          return "bundle.css"
        }
      },
      compile: async function(inputContent, inputPath){
        let parsed = path.parse(inputPath);
        let result = sass.compileString(
          inputContent,
          {
            loadPaths: [
              parsed.dir || ".",
              // this.config.dir.includes,
            ]
          }
        );
        return async (data) => {
          return result.css;
        }
      }

    })

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
          '11ty.js',
          "scss"
        ],
        htmlTemplateEngine: 'njk'
    };
}