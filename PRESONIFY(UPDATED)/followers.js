async function followUser(loggedInUser, userToFollow) {
    try {
        console.log(userToFollow);
        let token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/api/v1/users/${loggedInUser}/following/${userToFollow}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to follow user. Status: ${res.status} ${res.statusText}`);
        }
        console.log(res);
        const followedUser = userToFollow || 'the user';
        console.log(`Followed ${followedUser} successfully. Status: ${res.status} ${res.statusText}`);
    } catch (error) {
        console.error('Error occurred while following user:', error);
    }
}


async function unfollowUser(loggedInUser, userToUnfollow) {
    try {
        let token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/api/v1/users/${loggedInUser}/following/${userToUnfollow}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        // Handle the response as needed
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`Failed to unfollow user: ${data.message}`);
        }

        console.log(`Unfollowed ${userToUnfollow} successfully`);
    } catch (error) {
        console.error('Error occurred while unfollowing user:', error);
    }
}

export { followUser, unfollowUser };
