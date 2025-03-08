// ���� ������ ��������� �� localStorage
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postList = document.getElementById('postList');
    postList.innerHTML = '';
    
    posts.forEach(post => {
        const newPost = createPostElement(post);
        postList.prepend(newPost);
    });
}

// ���� ������ ���� �����
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.setAttribute('data-id', post.id);
    
    // ����� �������
    let mediaContent = '';
    if (post.mediaType === 'image') {
        mediaContent = `<img src="${post.mediaData}" alt="���� �������">`;
    } else if (post.mediaType === 'video') {
        mediaContent = `<video controls><source src="${post.mediaData}"></video>`;
    }
    
    postDiv.innerHTML = `
        <p>${post.text}</p>
        ${mediaContent}
        <small>${new Date(post.timestamp).toLocaleString()}</small>
        <button class="deleteBtn">���</button>
    `;
    
    // ��� ��� �������
    postDiv.querySelector('.deleteBtn').addEventListener('click', () => {
        if (confirm('�� ���� ��� ��� ������ѿ')) {
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            const updatedPosts = posts.filter(p => p.id !== post.id);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
            postDiv.remove();
        }
    });
    
    return postDiv;
}

// ��� �� �����
document.getElementById('postButton').addEventListener('click', function() {
    const postContent = document.getElementById('postContent').value.trim();
    const mediaInput = document.getElementById('mediaInput');
    const file = mediaInput.files[0];
    
    if (!postContent && !file) {
        alert('?? ������ ����� �� �� ���!');
        return;
    }
    
    // ����� ����� ��� ���
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

// ���� ���� �������
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
    
    // ����� ����� ������
    document.getElementById('postContent').value = '';
    document.getElementById('mediaInput').value = '';
}

// ����� ��������� ��� ��� ������
window.addEventListener('load', loadPosts);

// ����� ������� ������ (��� ����� ������)
// ...