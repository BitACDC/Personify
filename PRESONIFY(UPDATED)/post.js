import { followUser } from './followers.js';
import { getCurrentUsername } from './accUserName.js' ;
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

async function getPosts(username = null) {
        try {
            const token = localStorage.getItem("token");

            let apiUrl = 'http://localhost:3000/api/v1/posts';

            if (username) {
                apiUrl += `?username=${username}`;
            }

            const response = await fetch(apiUrl, {
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

            const postsContainer = document.getElementById("posts-container");
            postsContainer.innerHTML = '';

            data.forEach(post => {
                const postBox = document.createElement("div");
                postBox.classList.add("post-box");

                const usernameElement = document.createElement("div");
                usernameElement.classList.add("username");
                usernameElement.style.fontWeight = 'bold';
                usernameElement.style.textDecoration = 'underline';

                if (post.postedBy && post.postedBy.username) {
                    usernameElement.innerText = post.postedBy.username;
                }

                const postContent = document.createElement("div");
                postContent.classList.add("post-content");
                postContent.innerText = post.content;

                const likeButton = document.createElement("button");
                likeButton.innerText = "Like (" + post.likeCount + ")";
                likeButton.classList.add("like-button");
                likeButton.addEventListener("click", function () {
                    post.likeCount++;
                    likeButton.innerText = "Like (" + post.likeCount + ")";
                });

                const followButton = document.createElement("button");
                followButton.innerText = "Follow";
                followButton.classList.add("follow-button");
                followButton.addEventListener("click", function () {
                    if (followButton.innerText === "Follow") {
                        followButton.innerText = "Following";
                    } else {
                        followButton.innerText = "Follow";
                    }
                });

                postBox.appendChild(usernameElement);
                postBox.appendChild(postContent);
                postBox.appendChild(likeButton);
                postBox.appendChild(followButton);

                postsContainer.appendChild(postBox);
            });
        } catch (error) {
            console.error('Error occurred while fetching posts:', error);
        }
    }

    document.querySelector(".search-bar").addEventListener("input", async function() {
        try {
            var searchText = this.value.trim();

            if (searchText === '') {
                // If search bar is empty, display posts for the current user
                await getPosts(getCurrentUsername());
            } else {
                // Display posts based on the entered username
                await getPosts(searchText);
            }
        } catch (error) {
            console.error('Error occurred during search:', error);
        }
    });

// Assume there is an updateLike function to update the like count
async function updateLike(postId, likeButton) {
    try {
        const token = localStorage.getItem("token");
        const likeAction = likeButton ? "like" : "unlike";

        // Make a request to the server to update the like count for the given postId
        const response = await fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                action: likeAction
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update like');
        }

        // Update the like count on the button
        console.log('Post liked'); // You can handle this message as needed
    } catch (error) {
        console.error('Error occurred while updating like:', error);
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