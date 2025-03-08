// œ«·… · Õ„Ì· «·„‰‘Ê—«  „‰ localStorage
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postList = document.getElementById('postList');
    postList.innerHTML = '';
    
    posts.forEach(post => {
        const newPost = createPostElement(post);
        postList.prepend(newPost);
    });
}

// œ«·… ·≈‰‘«¡ ⁄‰’— „‰‘Ê—
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.setAttribute('data-id', post.id);
    
    // „Õ ÊÏ «·„‰‘Ê—
    let mediaContent = '';
    if (post.mediaType === 'image') {
        mediaContent = `<img src="${post.mediaData}" alt="’Ê—… «·„‰‘Ê—">`;
    } else if (post.mediaType === 'video') {
        mediaContent = `<video controls><source src="${post.mediaData}"></video>`;
    }
    
    postDiv.innerHTML = `
        <p>${post.text}</p>
        ${mediaContent}
        <small>${new Date(post.timestamp).toLocaleString()}</small>
        <button class="deleteBtn">Õ–›</button>
    `;
    
    // ÕœÀ Õ–› «·„‰‘Ê—
    postDiv.querySelector('.deleteBtn').addEventListener('click', () => {
        if (confirm('Â·  —Ìœ Õ–› Â–« «·„‰‘Ê—ø')) {
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            const updatedPosts = posts.filter(p => p.id !== post.id);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
            postDiv.remove();
        }
    });
    
    return postDiv;
}

// ÕœÀ “— «·‰‘—
document.getElementById('postButton').addEventListener('click', function() {
    const postContent = document.getElementById('postContent').value.trim();
    const mediaInput = document.getElementById('mediaInput');
    const file = mediaInput.files[0];
    
    if (!postContent && !file) {
        alert('?? «·—Ã«¡ ≈œŒ«· ‰’ √Ê „·›!');
        return;
    }
    
    // ﬁ—«¡… «·„·› ≈–« ÊÃœ
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const mediaType = file.type.startsWith('image') ? 'image' : 'video';
            savePost(postContent, mediaType, e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        savePost(postContent);
    }
});

// œ«·… ·Õ›Ÿ «·„‰‘Ê—
function savePost(text, mediaType = null, mediaData = null) {
    const post = {
        id: Date.now(),
        text,
        mediaType,
        mediaData,
        timestamp: Date.now()
    };
    
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
    
    const postList = document.getElementById('postList');
    postList.prepend(createPostElement(post));
    
    // ≈⁄«œ…  ⁄ÌÌ‰ «·ÕﬁÊ·
    document.getElementById('postContent').value = '';
    document.getElementById('mediaInput').value = '';
}

//  Õ„Ì· «·„‰‘Ê—«  ⁄‰œ › Õ «·’›Õ…
window.addEventListener('load', loadPosts);

// √Õœ«À «·√“—«— «·√Œ—Ï (‰›” «·ﬂÊœ «·”«»ﬁ)
// ...