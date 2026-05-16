const fs = require('fs');
const readline = require('readline');
const { OAuth2Client } = require('google-auth-library');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';
const CREDENTIALS_PATH = 'credentials.json';

// Load client secrets from a local file.
fs.readFile(CREDENTIALS_PATH, (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), generateToken);
});

function authorize(credentials, callback) {
  // Check if it's "installed" or "web" type OAuth credentials
  const {client_secret, client_id, redirect_uris} = credentials.installed || credentials.web;
  
  // Create an OAuth2 client
  const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0] || 'urn:ietf:wg:oauth:2.0:oob');

  // Generate the url that will be used for authorization
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  
  console.log('\n=============================================');
  console.log('Authorize this app by visiting this url:\n');
  console.log(authUrl);
  console.log('\n=============================================');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('\n✅ Token stored to', TOKEN_PATH);
        console.log('You are now ready to run the scraper!');
      });
    });
  });
}

function generateToken() {
    // Empty callback since we save it inside the rl.question block
}
