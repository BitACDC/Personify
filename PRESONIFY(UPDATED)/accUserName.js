async function UserList() {
  try {
    const response = await fetch('http://localhost:3000/api/v1/users', {
      method: 'GET',
      headers: {  
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
    if (response.ok) {
      const userInfo = await response.json();
      console.log(userInfo);
      return userInfo;
    } else {
      console.error('Failed to fetch user information:', response.status);
      const errorData = await response.json(); // attempt to parse error response
      console.error('Error details:', errorData);
      return null;
    } 
  } catch (error) {
    console.error('Error during UserList:', error);
    return null;
  }
}

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
}

function getCurrentUsername() {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = parseJwt(token);
    return decodedToken ? decodedToken.username : null;
  } else {
    console.error('Token not found');
    return null;
  }
}

async function displayUserInfo() {
  const username = getCurrentUsername();

  if (username) {
    const usernameElement = document.querySelector('.username');

    if (usernameElement) {
      usernameElement.textContent = 'USERNAME: ' + username;
    } else {
      console.error('Username element not found:', usernameElement);
    }
  } else {
    console.error('Username not available.');
  }
}

export { getCurrentUsername,displayUserInfo };
