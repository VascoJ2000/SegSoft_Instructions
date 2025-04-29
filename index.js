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
  localStorage.setItem("Oauth", "70140_70481");
  const authEndpoint = authServer + '/Oauth/authorize';
  const authUrl = `${authEndpoint}?response_type=${responseType}&client_id=${clientId}&scope=${encodeURIComponent(scope)}&state=${state}`;
  window.location.href = authUrl;
};

document.getElementById('70665-70715_Oauth').onclick = function() {
  localStorage.setItem("Oauth", "70665-70715");
  const authUrl = 'https://authorization-server-70665-70715.onrender.com/authorize?client_id=70140_70481&redirect_uri=https://vascoj2000.github.io/SegSoft_Instructions/&response_type=code&scope=profile';
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

  if (code) {
    document.getElementById('result').innerText = `Received Authorization Code: ${code}`;

    const Oauth = localStorage.getItem("Oauth");
    if(Oauth == "70140_70481"){
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

    }else if(Oauth == "70665-70715"){
      // Exchange authorization code for access token
      const response = await fetch(`https://authorization-server-70665-70715.onrender.com/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Basic 70140_70481:CB2C7B60537C6F19CA265A93D52C3B779401807D07FA77B921DC91B2BBF118BE (Base64)',
        },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: url,
          client_id: clientId
        })
      });

      const data = await response.json();
      console.log(data);

      document.getElementById('result').innerText += `\nAccess Token: ${data.access_token}\nRefresh Token: ${data.refresh_token}`;
    }
  }else{
    console.log("No code");
  }
};