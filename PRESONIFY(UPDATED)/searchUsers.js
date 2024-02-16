import { UserList } from './accUserName.js';

async function searchUsers(query) {
  const userList = await UserList();

  if (userList && userList.length > 0) {
    // Filter the users based on your search criteria (e.g., username includes the query)
    const filteredUsers = userList.filter(user => user.username.includes(query));
    return filteredUsers;
  } else {
    console.error('User list is empty or not available:', userList);
    return null;
  }
}

export { searchUsers };
