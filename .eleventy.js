module.exports = function(eleventyConfig) {

  // Remove the starting "/"
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("images");

 // This is the FIXED code
eleventyConfig.addFilter("readableDate", dateObj => {
 const date = new Date(dateObj);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});
  return {
    dir: {
      input: ".",          // Use the root folder as the input
      includes: "_includes", // Find layouts here
      output: "_site"        // Build the site here
    }
  };
};