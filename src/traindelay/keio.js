const fetch = require('node-fetch');

const LINE_KEYS = {
  'K': 'keio',
  'S': 'sagamihara',
  'I': 'inokashira',
};

const DIRECTION_KEYS = {
  '0': 'up',
  '1': 'down',
};

function parseResponse(res) {
  let results = {};
  for (let pos of res['TS']) {
    let line = LINE_KEYS[pos['sn']];
    for (let train of pos['ps']) {
      let direction = DIRECTION_KEYS[train['ki']];
      let key = `${line}_${direction}`;
      results[key] = Math.max((results[key] || 0), train['dl']);
    }
  }
  return results;
}

function fetchDelays() {
  return fetch('https://i.opentidkeio.jp/data/traffic_info.json')
    .then(resp => resp.json())
    .then(parseResponse);
}

const LINE_NAMES = {
  'keio_down':         '京王線(下り)',
  'keio_up':           '京王線(上り)',
  'sagamihara_down': '相模原線(下り)',
  'sagamihara_up':   '相模原線(上り)',
  'inokashira_down': '井の頭線(下り)',
  'inokashira_up':   '井の頭線(上り)',
};

module.exports = {
  LINE_NAMES,
  fetchDelays,
};
