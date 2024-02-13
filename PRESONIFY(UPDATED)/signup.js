export function handleSignUp() {
    const createAccConfirmButton = document.getElementById("CreateAccConfirm");

    if (createAccConfirmButton) {
        createAccConfirmButton.addEventListener("click", async function () {
            const getUsername = document.getElementById("Uname").value;
            const getPassword = document.getElementById("CreatePass").value;

            try {
                const response = await fetch('http://localhost:3000/api/v1/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: getUsername, password: getPassword }),
                });

                const token = await response.text();
                console.log('Response:', token);
            } catch (error) {
                console.error('Failed to create user. Error:', error);
            }
        });
    }
}
