const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

function parseResponse(document) {
  let name = document.querySelector('.title').textContent.trim();
  let updatedAt = document.querySelector('.subText').textContent.trim();

  let statusElement = document.getElementById('mdServiceStatus');
  let isNormal = statusElement.querySelector('.icnNormalLarge') != null;
  let state = Array.from(statusElement.querySelector('dt').childNodes).filter(e => e.nodeName === '#text').reduce((s, e) => s + e.textContent, '').trim();
  let message = statusElement.querySelector('dd').textContent.trim();
  return {
    name,
    updatedAt,
    isNormal,
    state,
    message,
  };
}

function fetchInfo(id) {
  id = encodeURIComponent(id);
  let url = `https://transit.yahoo.co.jp/traininfo/detail/${id}/0/`;
  return fetch(url)
    .then(resp => resp.text())
    .then(text => (new JSDOM(text)).window.document)
    .then(parseResponse)
    .then(res => Object.assign(res, { url }));
}

module.exports = {
  fetchInfo,
};
