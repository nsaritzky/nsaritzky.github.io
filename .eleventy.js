const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  // Passthrough copy
  eleventyConfig.addPassthroughCopy("css/styles.css");
  eleventyConfig.addPassthroughCopy("images");

  eleventyConfig.addNunjucksAsyncShortcode(
    "image",
    async function (src, alt, styleClass) {
      let metadata = await Image(src, {
        widths: [300, 600, 1200],
        formats: ["avif", "jpeg"],
        urlPath: "/images/",
        outputDir: "./_site/images/",
      });

      let lowestSrc = metadata.jpeg[0];

      return `<picture>
            ${Object.values(metadata)
              .map((imageFormat) => {
                return `<source type="image/${
                  imageFormat[0].format
                }" srcset="${imageFormat
                  .map((entry) => entry.srcset)
                  .join(", ")}">`;
              })
              .join("\n")}
            <img
                src="${lowestSrc.url}"
                width="${lowestSrc.width}"
                height="${lowestSrc.height}"
                alt="${alt}"
                class="${styleClass}"
                loading="lazy"
                decoding="async">
        </picture>`;
    },
  );

  // If you have other assets like images or scripts, you can add them as well
  // eleventyConfig.addPassthroughCopy("src/images");
  // eleventyConfig.addPassthroughCopy("src/js");

  // Other configurations
  return {
    dir: {
      input: ".", // or the path to your source files
      includes: "_includes",
      data: "_data",
    },
    // Add other configurations as needed
  };
};
