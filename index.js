const url = window.location;
const secret = 'CB2C7B60537C6F19CA265A93D52C3B779401807D07FA77B921DC91B2BBF118BE';
const clientId = '70140_70481';
const authServer = 'https://segsoft-server.onrender.com';

// --- Configuration ---
const redirectUri = url;
const responseType = 'code';
const scope = 'default';
const state = Math.random().toString(36).substring(2); // Random string for security

document.getElementById('ourOauth').onclick = function() {
  const authEndpoint = authServer + '/Oauth/authorize';
  const authUrl = `${authEndpoint}?response_type=${responseType}&client_id=${clientId}&scope=${encodeURIComponent(scope)}&state=${state}`;
  window.location.href = authUrl;
};

document.getElementById('clientBtn').onclick = async function() {
  const response = await fetch(authServer + '/Oauth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: clientId,
        secret: secret,
        redirectUri: redirectUri.href,
      })
  });

  const data = await response.json();
  console.log(data);
};

document.getElementById('registerBtn').onclick = async function() {
  const username = document.getElementById('RegisterUsername').value;
  const password = document.getElementById('RegisterPassword').value;

  if(username && password){
    const response = await fetch(authServer + '/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      })
  });

  const data = await response.json();
  console.log(data);
  }else{
    alert("Username or password missing!!!")
  }
}

// Handle redirect back with the code
window.onload = async function() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const returnedState = params.get('state');

  if (code) {
    document.getElementById('result').innerText = `Received Authorization Code: ${code}`;

    // Exchange authorization code for access token
    const response = await fetch(`${authServer}/Oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code: code,
        client_id: clientId,
      })
    });

    const data = await response.json();
    console.log(data);

    document.getElementById('result').innerText += `\nAccess Token: ${data.token}`;
  }else{
    console.log("No code");
  }
};