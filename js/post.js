// Get post ID from URL
const urlParams = new URLSearchParams(window.location.search);
const postId = parseInt(urlParams.get('id'));

// Get posts from localStorage
function getPosts() {
  const posts = localStorage.getItem('blogPosts');
  if (posts) {
    return JSON.parse(posts);
  }
  // Default posts if none in localStorage
  return [
    {
      id: 1,
      title: "Getting Started with Web Development",
      category: "technology",
      date: "2024-04-03",
      excerpt: "Learn the basics of HTML, CSS, and JavaScript to start your web development journey.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      readTime: "5 min read",
      content: `
        <h2>Introduction to Web Development</h2>
        <p>Web development is an exciting field that combines creativity with technical skills. Whether you're building a personal blog or a complex web application, understanding the fundamentals is crucial.</p>

        <h3>The Core Technologies</h3>
        <p>Modern web development relies on three core technologies:</p>
        <ul>
          <li><strong>HTML (HyperText Markup Language)</strong>: The structure of web pages</li>
          <li><strong>CSS (Cascading Style Sheets)</strong>: The styling and layout</li>
          <li><strong>JavaScript</strong>: The interactivity and dynamic behavior</li>
        </ul>

        <h3>Getting Started</h3>
        <p>The best way to learn web development is by building projects. Start with simple static websites and gradually move to more complex applications. Practice regularly and don't be afraid to experiment!</p>

        <blockquote>
          "The only way to learn a new programming language is by writing programs in it." - Dennis Ritchie
        </blockquote>

        <h3>Resources for Learning</h3>
        <p>There are countless free resources available online. Websites like MDN Web Docs, freeCodeCamp, and The Odin Project offer comprehensive guides and tutorials for beginners.</p>

        <p>Remember, every expert was once a beginner. Keep learning, stay curious, and enjoy the journey!</p>
      `
    },
    {
      id: 2,
      title: "The Art of Photography",
      category: "photography",
      date: "2024-04-02",
      excerpt: "Discover essential tips and techniques for capturing stunning photographs.",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop",
      readTime: "7 min read",
      content: `
        <h2>Mastering Photography</h2>
        <p>Photography is more than just clicking a button. It's about capturing moments, telling stories, and expressing your unique perspective on the world.</p>

        <h3>Understanding Composition</h3>
        <p>Good composition is the foundation of great photography. The rule of thirds, leading lines, and framing are essential techniques to master.</p>

        <h3>Lighting Matters</h3>
        <p>Natural light is a photographer's best friend. The golden hour (shortly after sunrise or before sunset) provides the most beautiful, soft light for photography.</p>

        <p>Keep practicing and experimenting with different styles and techniques!</p>
      `
    },
    {
      id: 3,
      title: "Travel Adventures",
      category: "travel",
      date: "2024-04-01",
      excerpt: "Exploring hidden gems and must-visit destinations around the world.",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
      readTime: "6 min read",
      content: `
        <h2>Discovering the World</h2>
        <p>Travel opens your mind to new cultures, experiences, and perspectives. Every destination has its own unique charm and stories to tell.</p>

        <h3>Planning Your Trip</h3>
        <p>Research is key to a successful trip. Learn about local customs, must-see attractions, and hidden gems that only locals know about.</p>

        <h3>Traveling on a Budget</h3>
        <p>You don't need to be wealthy to explore the world. With careful planning and smart choices, you can have amazing experiences without breaking the bank.</p>

        <p>The world is waiting to be explored. Start planning your next adventure today!</p>
      `
    }
  ];
}

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Load and display post
function loadPost() {
  const posts = getPosts();
  const post = posts.find(p => p.id === postId);

  if (post) {
    document.getElementById('postTitle').textContent = post.title;
    document.getElementById('postCategory').textContent = post.category;
    document.getElementById('postDate').textContent = formatDate(post.date);
    document.getElementById('postReadTime').textContent = post.readTime;
    document.getElementById('postImage').src = post.image;
    document.getElementById('postImage').alt = post.title;
    document.getElementById('postContent').innerHTML = post.content;

    // Update page title
    document.title = `${post.title} - My Blog`;
  } else {
    document.getElementById('postTitle').textContent = 'Post Not Found';
    document.getElementById('postContent').innerHTML = '<p>The blog post you are looking for does not exist.</p>';
  }
}

// Initialize
loadPost();
