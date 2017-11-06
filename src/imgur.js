const fetch = require('node-fetch');
const FormData = require('form-data');

function uploadImage({clientID, data, filename, title, description}) {
  let fd = new FormData();
  fd.append('image', data);
  if (filename) {
    fd.append('name', filename);
  }
  if (title) {
    fd.append('title', title);
  }
  if (description) {
    fd.append('description', description);
  }
  return fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    body: fd,
    headers: {
      'Authorization': 'Client-ID ' + clientID
    },
  });
}

module.exports = {
  uploadImage,
};
