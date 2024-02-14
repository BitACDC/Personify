// Function to handle API login
async function signInApi(data) {
  try {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });
      console.log(data);
      if (response.ok) {
          const token = await response.text();
          localStorage.setItem('token', token);
          return true; // Login successful
          // Redirect to mainPage.html regardless of errors
      } else {
          alert("Invalid username or incorrect password!");
          const errorData = await response.json();
          console.error(errorData);
          return false; // Login failed
      }
  } catch (error) {
      console.error('Sign In Error -', error);
      return false; // Login failed due to an error
  }
}

// Function to handle user login
async function login() {
  try {
      // Retrieve values from input fields
      const accountElement = document.getElementById("accountbar");
      const passwordElement = document.getElementById("Password");

      const account = accountElement ? accountElement.value : "";
      const password = passwordElement ? passwordElement.value : "";

      // Check if account and password are not empty
      if (!account || !password) {
          console.error('Account and password are required');
          return;
      }

      // Construct login data
      const loginData = {
          "username": account,
          "password": password
      };

      // Call the signInApi function with the login data
      const loginSuccess = await signInApi(loginData);
      if (loginSuccess) {
        window.location.href = "./mainPage.html";
    }
  } catch (error) {
      console.error('Error during login:', error);
      // Handle the error as needed
  }
}

// Export login function if needed
export default login;
