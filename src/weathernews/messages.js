const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

function parseResponse(document) {
  let results = {
    title: document.querySelector('.title_now').textContent,
    temp: document.querySelector('.obs_temp_main').textContent,
    sub: document.querySelector('.obs_sub_value').textContent.replace(/[^0-9]/g, ''),
  };

  let messageParent = document.querySelector('.title_hourly')
    .parentElement
    .querySelector('.card_text');
  results.messageTitle = messageParent.querySelector('h4').textContent;
  results.messageBody = messageParent.querySelector('p').textContent;

  return results;
}

module.exports = function fetchForecastMessages(longitude, latitude) {
  longitude = encodeURIComponent(longitude);
  latitude = encodeURIComponent(latitude);
  let url = `https://weathernews.jp/onebox/${longitude}/${latitude}/temp=c&lang=ja`;
  return fetch(url)
    .then(resp => resp.text())
    .then(text => (new JSDOM(text)).window.document)
    .then(parseResponse)
    .then(res => Object.assign(res, { url }));
}
