const fetch = require('node-fetch');
const fetchers = require('./fetchers');
const utils = require('./utils');

let config = JSON.parse(process.env['MORNING_BOT_CONFIG'] || null);
let slackIncomingWebhookURL = process.env['SLACK_INCOMING_WEBHOOK_URL'];
let slackChannel = process.env['SLACK_CHANNEL'];

if (!config || !slackIncomingWebhookURL) {
  console.log('Please set MORNING_BOT_CONFIG, and SLACK_INCOMING_WEBHOOK_URL');
  process.exit(1);
}

let promises = Object.keys(config).map(fetcherID => fetchers[fetcherID].fetchAttachments(config[fetcherID]));

utils.allAttachmentsPromises(promises, console.error).then(attachments => {
  let payload = {
    username: 'morning-bot',
    attachments: attachments,
  };

  if (slackChannel) {
    payload.channel = slackChannel;
  }

  return fetch(slackIncomingWebhookURL, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}).then(resp => resp.text()).then(console.log).catch(console.error);
