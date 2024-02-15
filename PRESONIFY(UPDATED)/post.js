async function CreatePost() {
    var post = document.getElementById("PostInput").value;
    let token = localStorage.getItem("token");

    const res = await fetch('http://localhost:3000/api/v1/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "content": post
        })
    });

    if (res.ok) {
        console.log('successful');
    } else {
        console.log('failed');
    }
}

//document.getElementById("PostButton").addEventListener("click", CreatePost);

async function sendtoAPI(formElement, event) {
    const textarea = formElement.querySelector('#PostInput');
    const postText = textarea.value.trim();

    try {
        console.log(postText);
        // Call the function to create a post and handle response
        await handleCreatePost(postText);
        // Optionally, fetch and display updated posts
        getPosts();
        textarea.value = ''; // Clear the input field
        event.preventDefault();
    } catch (error) {
        console.error('Error occurred while posting:', error);
    }
}

