// Get posts from localStorage
function getPosts() {
  const posts = localStorage.getItem('blogPosts');
  return posts ? JSON.parse(posts) : [];
}

// Save posts to localStorage
function savePosts(posts) {
  localStorage.setItem('blogPosts', JSON.stringify(posts));
}

// Generate unique ID
function generateId() {
  const posts = getPosts();
  return posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
}

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Calculate stats
function updateStats() {
  const posts = getPosts();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonthPosts = posts.filter(post => {
    const postDate = new Date(post.date);
    return postDate.getMonth() === currentMonth && postDate.getFullYear() === currentYear;
  });

  document.getElementById('totalPosts').textContent = posts.length;
  document.getElementById('thisMonth').textContent = thisMonthPosts.length;
}

// Show success toast
function showSuccessToast(message) {
  const existingToast = document.querySelector('.success-toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'success-toast';
  toast.innerHTML = `<i data-lucide="check-circle"></i><span>${message}</span>`;
  document.body.appendChild(toast);

  // Initialize Lucide icons in the toast
  lucide.createIcons();

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// DOM Elements
const postForm = document.getElementById('postForm');
const postsList = document.getElementById('postsList');
const postCount = document.getElementById('postCount');
const postsSearch = document.getElementById('postsSearch');
const formTitle = document.getElementById('formTitle');
const submitBtnText = document.getElementById('submitBtnText');
const resetBtn = document.getElementById('resetBtn');
const cancelBtn = document.getElementById('cancelBtn');
const deleteModal = document.getElementById('deleteModal');
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');

let editingPostId = null;
let deletingPostId = null;
let allPosts = [];

// Render posts list
function renderPostsList(posts = null) {
  if (posts === null) {
    posts = getPosts();
  }

  allPosts = posts;
  postCount.textContent = posts.length;

  if (posts.length === 0) {
    postsList.innerHTML = `
      <div class="empty-state">
        <i data-lucide="file-text"></i>
        <p>No posts yet. Create your first post!</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  postsList.innerHTML = posts.map(post => `
    <div class="post-item">
      <div class="post-item-category">${post.category}</div>
      <div class="post-item-title">${post.title}</div>
      <div class="post-item-meta">
        <span><i data-lucide="calendar"></i> ${formatDate(post.date)}</span>
        <span><i data-lucide="clock"></i> ${post.readTime}</span>
      </div>
      <div class="post-item-excerpt">${post.excerpt}</div>
      <div class="post-item-actions">
        <button class="btn-ghost" onclick="editPost(${post.id})">
          <i data-lucide="pencil"></i> Edit
        </button>
        <a href="post.html?id=${post.id}" class="btn-ghost" target="_blank">
          <i data-lucide="eye"></i> View
        </a>
        <button class="btn-danger" onclick="deletePost(${post.id})">
          <i data-lucide="trash-2"></i> Delete
        </button>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

// Search posts
postsSearch.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();

  if (!searchTerm) {
    renderPostsList();
    return;
  }

  const filteredPosts = allPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.category.toLowerCase().includes(searchTerm)
  );

  renderPostsList(filteredPosts);
});

// Edit post
window.editPost = function(id) {
  const posts = getPosts();
  const post = posts.find(p => p.id === id);

  if (post) {
    editingPostId = id;
    document.getElementById('postId').value = id;
    document.getElementById('title').value = post.title;
    document.getElementById('category').value = post.category;
    document.getElementById('readTime').value = post.readTime;
    document.getElementById('image').value = post.image;
    document.getElementById('excerpt').value = post.excerpt;
    document.getElementById('content').value = post.content;

    formTitle.textContent = 'Edit Post';
    submitBtnText.textContent = 'Update Post';
    resetBtn.style.display = 'inline-flex';
    cancelBtn.style.display = 'inline-flex';

    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Delete post
window.deletePost = function(id) {
  deletingPostId = id;
  deleteModal.classList.add('active');
};

// Confirm delete
confirmDelete.addEventListener('click', () => {
  if (deletingPostId) {
    const posts = getPosts();
    const filteredPosts = posts.filter(p => p.id !== deletingPostId);
    savePosts(filteredPosts);
    renderPostsList();
    updateStats();
    deleteModal.classList.remove('active');
    showSuccessToast('Post deleted successfully!');
    deletingPostId = null;
    lucide.createIcons();
  }
});

// Cancel delete
cancelDelete.addEventListener('click', () => {
  deleteModal.classList.remove('active');
  deletingPostId = null;
});

// Close modal on backdrop click
document.querySelector('.modal-backdrop')?.addEventListener('click', () => {
  deleteModal.classList.remove('active');
  deletingPostId = null;
});

// Reset form
function resetForm() {
  postForm.reset();
  editingPostId = null;
  formTitle.textContent = 'Create New Post';
  submitBtnText.textContent = 'Publish Post';
  resetBtn.style.display = 'none';
  cancelBtn.style.display = 'none';
  document.getElementById('postId').value = '';
}

// Reset button click
resetBtn.addEventListener('click', resetForm);
cancelBtn.addEventListener('click', resetForm);

// Handle form submission
postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const category = document.getElementById('category').value;
  const readTime = document.getElementById('readTime').value.trim();
  const image = document.getElementById('image').value.trim();
  const excerpt = document.getElementById('excerpt').value.trim();
  const content = document.getElementById('content').value.trim();

  const posts = getPosts();

  if (editingPostId) {
    // Update existing post
    const index = posts.findIndex(p => p.id === editingPostId);
    if (index !== -1) {
      posts[index] = {
        ...posts[index],
        title,
        category,
        readTime,
        image,
        excerpt,
        content
      };
      savePosts(posts);
      showSuccessToast('Post updated successfully!');
    }
  } else {
    // Create new post
    const newPost = {
      id: generateId(),
      title,
      category,
      date: new Date().toISOString().split('T')[0],
      readTime,
      image,
      excerpt,
      content
    };

    posts.push(newPost);
    savePosts(posts);
    showSuccessToast('Post published successfully!');
  }

  renderPostsList();
  updateStats();
  resetForm();
});

// Initialize
renderPostsList();
updateStats();
lucide.createIcons();
