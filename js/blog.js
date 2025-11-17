// Get posts from localStorage or use default posts
function getBlogPosts() {
  const storedPosts = localStorage.getItem('blogPosts');
  if (storedPosts) {
    return JSON.parse(storedPosts);
  }

  // Default posts
  const defaultPosts = [
    {
      id: 1,
      title: "Getting Started with Web Development",
      category: "technology",
      date: "2024-04-03",
      excerpt: "Learn the basics of HTML, CSS, and JavaScript to start your web development journey.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      readTime: "5 min read",
      content: "<p>Full content for web development post...</p>"
    },
    {
      id: 2,
      title: "The Art of Photography",
      category: "photography",
      date: "2024-04-02",
      excerpt: "Discover essential tips and techniques for capturing stunning photographs.",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop",
      readTime: "7 min read",
      content: "<p>Full content for photography post...</p>"
    },
    {
      id: 3,
      title: "Travel Adventures",
      category: "travel",
      date: "2024-04-01",
      excerpt: "Exploring hidden gems and must-visit destinations around the world.",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
      readTime: "6 min read",
      content: "<p>Full content for travel post...</p>"
    }
  ];

  // Save default posts to localStorage
  localStorage.setItem('blogPosts', JSON.stringify(defaultPosts));
  return defaultPosts;
}

const blogPosts = getBlogPosts();

// DOM Elements
const blogGrid = document.getElementById("blogGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const timeFilter = document.getElementById("timeFilter");

// Format date
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

// Create blog card HTML
function createBlogCard(post) {
  return `
        <article class="blog-card">
            <img src="${post.image}" alt="${post.title}">
            <div class="blog-content">
                <div class="blog-category">${post.category}</div>
                <h3>${post.title}</h3>
                <div class="blog-meta">
                    <span class="date">${formatDate(post.date)}</span>
                    <span class="read-time">${post.readTime}</span>
                </div>
                <p class="excerpt">${post.excerpt}</p>
                <a href="post.html?id=${post.id}" class="read-more">Read More</a>
            </div>
        </article>
    `;
}

// Filter and sort blog posts
function filterAndSortPosts() {
  let filteredPosts = [...blogPosts];

  // Search filter
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm)
    );
  }

  // Category filter
  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== "all") {
    filteredPosts = filteredPosts.filter(
      (post) => post.category === selectedCategory
    );
  }

  // Time sort
  const sortOrder = timeFilter.value;
  filteredPosts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  // Render filtered posts
  renderPosts(filteredPosts);
}

// Render blog posts
function renderPosts(posts) {
  blogGrid.innerHTML = posts.length
    ? posts.map((post) => createBlogCard(post)).join("")
    : '<div class="no-posts">No posts found matching your criteria.</div>';
}

// Event listeners
searchInput.addEventListener("input", filterAndSortPosts);
categoryFilter.addEventListener("change", filterAndSortPosts);
timeFilter.addEventListener("change", filterAndSortPosts);

// Initial render
renderPosts(blogPosts);
