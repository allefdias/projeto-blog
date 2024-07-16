let posts = [
   
];

let currentPostIndex = null;

function renderPosts() {
    const postList = document.querySelector('.post-list');
    postList.innerHTML = '';
    posts.forEach((post, index) => {
        const postItem = document.createElement('div');
        postItem.className = 'post-item';
        postItem.innerHTML = `
            <h3>${post.title}</h3>
            <p>Por: ${post.author}</p>
            <p>${post.content.substring(0, 100)}...</p>
            ${post.image ? `<img src="${post.image}" alt="Post Image">` : ""}
            <span>${post.date}</span>
        `;
        postItem.onclick = () => showPostDetails(index);
        postList.appendChild(postItem);
    });
}

function showPostDetails(index) {
    currentPostIndex = index;
    const postModal = document.getElementById('postModal');
    const postDetails = document.getElementById('postDetails');
    const commentsList = document.getElementById('commentsList');
    const post = posts[index];
    postDetails.innerHTML = `
        <h2>${post.title}</h2>
        <p>Por: ${post.author}</p>
        <p>${post.content}</p>
        ${post.image ? `<img src="${post.image}" alt="Post Image">` : ""}
        <span>${post.date}</span>
    `;
    renderComments(post.comments);
    postModal.style.display = 'block';
}

function hidePostDetails() {
    const postModal = document.getElementById('postModal');
    postModal.style.display = 'none';
}

function showNewPostForm() {
    clearNewPostForm();
    const newPostForm = document.getElementById('newPostForm');
    newPostForm.style.display = 'block';
}

function hideNewPostForm() {
    const newPostForm = document.getElementById('newPostForm');
    newPostForm.style.display = 'none';
}

function clearNewPostForm() {
    document.getElementById('postAuthor').value = '';
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
    document.getElementById('postImage').value = '';
}

function addPost() {
    const author = document.getElementById('postAuthor').value;
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const imageInput = document.getElementById('postImage');
    const image = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : "";
    if (author && title && content) {
        posts.push({
            author,
            title,
            content,
            date: new Date().toLocaleString(),
            image,
            comments: []
        });
        renderPosts();
        hideNewPostForm();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function renderComments(comments) {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '';
    comments.forEach(comment => {
        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item';
        commentItem.innerHTML = `
            <strong>${comment.author}</strong>
            <p>${comment.content}</p>
        `;
        commentsList.appendChild(commentItem);
    });
}

function addComment() {
    const author = document.getElementById('commentAuthor').value;
    const content = document.getElementById('commentContent').value;
    if (author && content) {
        posts[currentPostIndex].comments.push({
            author,
            content
        });
        renderComments(posts[currentPostIndex].comments);
        document.getElementById('commentAuthor').value = '';
        document.getElementById('commentContent').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

document.addEventListener('DOMContentLoaded', renderPosts);
