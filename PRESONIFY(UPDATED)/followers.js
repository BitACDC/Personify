async function followUser(loggedInUser, userToFollow) {
    try {
        let token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/api/v1/users/${loggedInUser}/following/${userToFollow}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        // Handle the response as needed
        if (!res.ok) {
            throw new Error('Failed to follow user');
        }
        console.log('Followed user successfully');
    } catch (error) {
        console.error('Error occurred while following user:', error);
    }
}
async function unfollowUser(loggedInUser, userToFollow) {
    try {
        let token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/api/v1/users/${loggedInUser}/following/${userToFollow}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        // Handle the response as needed
        if (!res.ok) {
            throw new Error('Failed to follow user');
        }
        console.log('Followed user successfully');
    } catch (error) {
        console.error('Error occurred while following user:', error);
    }
}

export { followUser, unfollowUser};