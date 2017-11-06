const imgur = require('../imgur');
const weathernews = require('../weathernews');

function fetchImage(config) {
  if (!config.imgurClientID) {
    return Promise.resolve();
  }
  return weathernews.screenshotHourlyForecast(config.longitude, config.latitude)
    .then(data => imgur.uploadImage({
      clientID: config.imgurClientID,
      data: data,
      filename: 'weathernews.png',
    }))
    .then(resp => resp.json())
    .then(data => {
      if (!data.success) {
        throw new Error(`${data.status}: ${data.data.error}`);
      }
      console.log(`Image deletehash ${data.data.deletehash}`);
      return data.data.link;
    })
    .catch(console.error);
}

function fetchAttachments(config) {
  // TODO: Check config

  let infoPromise = weathernews.fetchForecastMessages(config.longitude, config.latitude).catch(console.error);
  let imagePromise = fetchImage(config);

  return Promise.all([infoPromise, imagePromise])
    .then(([info, image]) => {
      return {
        fallback: info.title,
        author_name: 'Weather News',
        author_link: info.url,
        title: info.title,
        image_url: image,
        fields: [
          {
            title: info.messageTitle,
            value: info.messageBody,
          },
          {
            title: '気温',
            value: `${info.temp} ℃`,
            short: true
          },
          {
            title: '湿度',
            value: `${info.sub} %`,
            short: true
          },
        ]
      }
    });
}

module.exports = {
  fetchAttachments,
};
