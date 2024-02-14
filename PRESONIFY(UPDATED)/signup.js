export function handleSignUp() {
    const createAccConfirmButton = document.getElementById("CreateAccConfirm");//gets values from button

    if (createAccConfirmButton) {
        createAccConfirmButton.addEventListener("click", async function () {
            const getUsername = document.getElementById("Uname").value; //gets username
            const getPassword = document.getElementById("CreatePass").value; //gets password

            try {
                const response = await fetch('http://localhost:3000/api/v1/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: getUsername, password: getPassword }),
                });//sets up values for username and password

                const token = await response.text();
                console.log('Response:', token);//status update on response 
            } catch (error) {
                console.error('Failed to create user. Error:', error);
            }
        });
    }
}
