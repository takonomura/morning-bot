const fetch = require('node-fetch');

function fetchDelays() {
  return fetch('https://tid-stg.s3.amazonaws.com/delays_separately.json')
    .then(resp => resp.json());
}

const LINE_NAMES = {
  'toyoko_up':        '東横線(上り)',
  'toyoko_down':      '東横線(下り)',
  'meguro_up':        '目黒線(上り)',
  'meguro_down':      '目黒線(下り)',
  'dento_up':     '田園都市線(上り)',
  'dento_down':   '田園都市線(下り)',
  'oimachi_up':     '大井町線(上り)',
  'oimachi_down':   '大井町線(下り)',
  'ikegami':          '池上線',
  'tamagawa':   '東急多摩川線',
};

module.exports = {
  LINE_NAMES,
  fetchDelays,
};
