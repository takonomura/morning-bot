const traindelay = require('../traindelay');

function fetchAttachments(config) {
  let promises = [];

  Object.keys(config).forEach(company => {
    promises.push(traindelay[company].fetchDelays().then(delays => {
      let result = {};
      for (let line of config[company]) {
        let name = traindelay[company].LINE_NAMES[line];
        let delay = delays[line]
        if (name && delay != null) {
          result[name] = delay;
        }
      }
      return result;
    }));
  });

  return Promise.all(promises).then(results => {
    let result = {};
    results.forEach(res => Object.assign(result, res));

    return {
      fallback: '電車遅延情報',
      title: '電車遅延情報',
      text: '各線の遅延情報です',
      fields: Object.keys(result).map(lineName => ({
        title: lineName,
        value: `最大 ${result[lineName]}分`,
        short: true
      })),
    };
  });
}

module.exports = {
  fetchAttachments,
};
