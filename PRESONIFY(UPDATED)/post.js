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

document.getElementById("PostButton").addEventListener("click", sendtoAPI);

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

        console.log(data); // Log the data to check the structure and content

        const postsFeedContainer = document.querySelector(".postInput");
        postsFeedContainer.innerHTML = '';

        data.forEach(post => {
            const postCard = createPostElement(post.postedBy, post.content, post.timestamp);
            postsFeedContainer.prepend(postCard);
            likePost('.feed-card .like-btn');
        });
    } catch (error) {
        console.error('Error occurred while fetching posts:', error);
    }
}

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


