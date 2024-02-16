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

        console.log(data);  // Log the data received from the server

        const postsFeedContainer = document.getElementById("posts-container");
        postsFeedContainer.innerHTML = '';

        data.forEach(post => {
            // Create post elements
            const postBox = document.createElement("div");
            postBox.classList.add("post-box");

            const usernameElement = document.createElement("div");
            usernameElement.classList.add("username");
            usernameElement.style.fontWeight = 'bold';
            usernameElement.style.textDecoration = 'underline';
            usernameElement.innerText = post.postedBy;

            // Check if "postedBy" information is available
            if (post.postedBy && post.postedBy.username) {
                usernameElement.innerText = post.postedBy.username;
            }

            const postContent = document.createElement("div");
            postContent.classList.add("post-content");
            postContent.innerText = post.content;

            const likeCount = post.likeCount !== undefined ? post.likeCount : 0;

            const likeButton = document.createElement("button");
            likeButton.innerText = likeCount === 0 ? "Like" : `Like (${likeCount})`;
            likeButton.classList.add("like-button");
            likeButton.addEventListener("click", async function () {
                // Update like count on button click
                await updateLike(post.id, likeButton);
            });

            const followButton = document.createElement("button");
            followButton.innerText = "Follow";
            followButton.classList.add("follow-button");
            followButton.addEventListener("click", function () {
                // Implement follow functionality if needed
            });

            // Append elements to postBox
            postBox.appendChild(usernameElement);
            postBox.appendChild(postContent);
            postBox.appendChild(likeButton);
            postBox.appendChild(followButton);

            // Append postBox to postsFeedContainer
            postsFeedContainer.appendChild(postBox);
        });
    } catch (error) {
        console.error('Error occurred while fetching posts:', error);
    }
}

// Assume there is an updateLike function to update the like count
async function updateLike(postId, likeButton) {
    // Implement the logic to update the like count for the given postId
    // Make a request to the server to update the like count
    // Update the like count on the button
    const updatedLikeCount = 1; // Update with the actual like count
    likeButton.innerText = `Like (${updatedLikeCount})`;
}

// ... (rest of the code)



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

async function handlePost() {
    try {
      const postText = document.getElementById("PostInput").value.trim();

      console.log(postText);

      // Call CreatePost function to create the post
      await CreatePost();

      // Wait for CreatePost to complete, then refresh the posts by calling getPosts
      await getPosts();

      // Clear the input field
      document.getElementById("PostInput").value = '';
    } catch (error) {
      console.error('Error occurred while posting:', error);
    }
  }
  
export {CreatePost, getPosts , handlePost}

