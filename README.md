# My Personal Blog

A modern, responsive blog website built with HTML, CSS, and JavaScript. This blog is designed to be hosted on GitHub Pages and can be easily customized to match your personal style.

## Features

- Responsive design that works on all devices
- Modern and clean user interface
- Smooth scrolling navigation
- Blog post grid with hover effects
- Contact form
- About section with social media links
- Mobile-friendly navigation menu

## Getting Started

1. Clone this repository to your local machine
2. Customize the content in `index.html`
3. Modify the styles in `css/style.css`
4. Update the JavaScript functionality in `js/main.js`
5. Replace placeholder images with your own
6. Deploy to GitHub Pages

## Customization

### Changing Colors

The main colors used in the design are:

- Primary: #3498db (blue)
- Secondary: #2c3e50 (dark blue)
- Text: #333 (dark gray)

You can modify these colors in the `css/style.css` file.

### Adding Blog Posts

To add new blog posts, copy the following structure in the blog-grid section of `index.html`:

```html
<article class="blog-card">
  <img src="path-to-your-image.jpg" alt="Blog post image" />
  <div class="blog-content">
    <h3>Your Blog Post Title</h3>
    <p class="date">Publication Date</p>
    <p class="excerpt">Your blog post excerpt goes here.</p>
    <a href="#" class="read-more">Read More</a>
  </div>
</article>
```

### Updating Social Media Links

Update the social media links in both the About section and Footer of `index.html`:

```html
<div class="social-links">
  <a href="your-twitter-url"><i class="fab fa-twitter"></i></a>
  <a href="your-linkedin-url"><i class="fab fa-linkedin"></i></a>
  <a href="your-github-url"><i class="fab fa-github"></i></a>
</div>
```

## Deployment to GitHub Pages

1. Push your changes to GitHub
2. Go to your repository settings
3. Scroll down to the "GitHub Pages" section
4. Select the branch you want to deploy (usually `main` or `master`)
5. Click "Save"

Your blog will be available at `https://your-username.github.io/repository-name`

## Custom Domain

To use a custom domain:

1. Add a `CNAME` file to your repository with your domain name
2. Configure your domain's DNS settings to point to GitHub Pages
3. Wait for DNS propagation (can take up to 24 hours)

## Contributing

Feel free to fork this repository and submit pull requests for any improvements.

## License

This project is open source and available under the MIT License.
