# My Personal Blog

This is a clean, minimal personal blog built with the [Eleventy (11ty)](https://www.11ty.dev/) static site generator. It features a theme and font switcher to provide a comfortable reading experience for users.

## Features

  * **Static Site:** Fast, secure, and simple.
  * **Appearance Toggle:**
      * **Color Themes:** Light, Sepia, and Dark modes.
      * **Font Styles:** Sans-Serif, Serif, and Accessible font options.
  * **User Preferences:** Remembers the user's theme and font choices in `localStorage`.
  * **Markdown Content:** Blog posts are written in simple Markdown files located in the `posts/` directory.
  * **Nunjucks Templates:** Uses Nunjucks for flexible layouts.

## Technology Stack

  * **[Eleventy (11ty)](https://www.11ty.dev/)**: The static site generator that builds the site.
  * **[Nunjucks](https://mozilla.github.io/nunjucks/)**: The templating language used for layouts.
  * **Markdown**: For writing blog posts.
  * **CSS**: For styling, using CSS variables for easy theming.
  * **JavaScript**: For handling the appearance modal and saving user preferences.

## Getting Started

### Prerequisites

You must have [Node.js](https://nodejs.org/) (which includes `npm`) installed on your machine.

### Installation

1.  Clone this repository to your local machine.
2.  Navigate into the project directory (e.g., `cd Geem_b`).
3.  Install the project dependencies (specifically Eleventy):
    ```sh
    npm install
    ```

### Running the Project Locally

To build the site and run a local development server with hot-reloading, run the `start` script from your `package.json` file:

```sh
npm start
```

This will build the site into the `_site/` folder and serve it locally, usually at `http://localhost:8080`.

## Project Structure

```
.
├── _includes/        # Nunjucks layouts and partials (e.g., base.njk)
├── posts/            # Blog posts written in Markdown
├── _site/            # The final, built static site (this is what's deployed)
├── .eleventy.js      # Eleventy configuration file (if you have one)
├── index.njk         # The template for the homepage
├── package.json      # Project dependencies and scripts
├── script.js         # Site-wide JavaScript
└── style.css         # Site-wide CSS
```