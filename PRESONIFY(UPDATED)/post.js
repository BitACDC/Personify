async function CreatePost() {
    try {
        const postInput = document.getElementById("PostInput");
        const postContent = postInput.value.trim();
        const token = localStorage.getItem("token");

        const response = await fetch('http://localhost:3000/api/v1/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ content: postContent })
        });

        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        console.log('Post created successfully');
    } catch (error) {
        console.error('Error occurred while creating post:', error);
    }
}



async function getPosts() {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch('http://localhost:3000/api/v1/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const data = await response.json();

        console.log(data); 

        const postsFeedContainer = document.getElementById("posts-container");
        postsFeedContainer.innerHTML = '';

        data.forEach(post => {
            const postBox = document.createElement("div");
            postBox.classList.add("post-box");
            postBox.innerText = post.content;
            postsFeedContainer.appendChild(postBox);
        });
    } catch (error) {
        console.error('Error occurred while fetching posts:', error);
    }
}

// Call getPosts() when the page loads
window.addEventListener("load", function() {
    getPosts();
});

document.getElementById("PostButton").addEventListener("click", sendtoAPI);

async function sendtoAPI(event) {
    try {
        event.preventDefault();

        const postText = document.getElementById("PostInput").value.trim();

        console.log(postText); 

        await CreatePost();

        await getPosts();
       
        document.getElementById("PostInput").value = '';
    } catch (error) {
        console.error('Error occurred while posting:', error);
    }
}


