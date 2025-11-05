module.exports = function(eleventyConfig) {
// Determine if we're in production environment (e.g., Netlify build)
const isProduction = process.env.NODE_ENV === 'production';

// Create a custom collection for your posts that filters drafts
  eleventyConfig.addCollection("posts", function(collectionApi) {

    // Get all items that have the tag "post" (your blog posts)
    const allPosts = collectionApi.getFilteredByTag("post"); 

    // If we are building for production, filter out posts where 'draft' is true
    if (isProduction) {
      return allPosts.filter(item => !item.data.draft);
    }

    // If we are building locally (development), include all posts (drafts too)
    return allPosts;
  });
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("/admin");
  eleventyConfig.addPassthroughCopy({ "public": "/" });

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