// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Web Development",
    category: "technology",
    date: "2024-04-03",
    excerpt:
      "Learn the basics of HTML, CSS, and JavaScript to start your web development journey.",
    image: "https://placehold.co/800x600/0a0a0a/3b82f6?text=Web+Development",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "The Art of Photography",
    category: "photography",
    date: "2024-04-02",
    excerpt:
      "Discover essential tips and techniques for capturing stunning photographs.",
    image: "https://placehold.co/800x600/0a0a0a/3b82f6?text=Photography",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Travel Adventures",
    category: "travel",
    date: "2024-04-01",
    excerpt:
      "Exploring hidden gems and must-visit destinations around the world.",
    image: "https://placehold.co/800x600/0a0a0a/3b82f6?text=Travel",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Modern JavaScript Features",
    category: "technology",
    date: "2024-03-30",
    excerpt:
      "Exploring the latest features in JavaScript and how to use them effectively.",
    image: "https://placehold.co/800x600/0a0a0a/3b82f6?text=JavaScript",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "Street Photography Tips",
    category: "photography",
    date: "2024-03-28",
    excerpt:
      "Master the art of street photography with these essential tips and techniques.",
    image: "https://placehold.co/800x600/0a0a0a/3b82f6?text=Street+Photography",
    readTime: "6 min read",
  },
  {
    id: 6,
    title: "Backpacking Through Europe",
    category: "travel",
    date: "2024-03-25",
    excerpt: "A comprehensive guide to backpacking through Europe on a budget.",
    image: "https://placehold.co/800x600/0a0a0a/3b82f6?text=Europe",
    readTime: "10 min read",
  },
];

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
                <a href="#" class="read-more">Read More</a>
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
