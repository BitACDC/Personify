async function login() {
  // Retrieve values from input fields
  const account = document.getElementById("accountbar").value;
  const password = document.getElementById("Password").value;

  try {
    // Construct login data
    const loginData = {
      "email": account, // Assuming email is used for login
      "password": password
    };

    // Send login request
    const response = await fetch('http://localhost:3000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    // Check response status
    if (response.ok) {
      const userToken = await response.text();
      console.log('Login successful! Token:', userToken);
      // Redirect or perform other actions upon successful login
    } else {
      console.error('Failed to login. Status:', response.status);
      console.error('Response Text:', await response.text());
      // Handle login failure (e.g., display error message)
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
}

export default login;