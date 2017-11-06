const traininfo = require('../traininfo');
const utils = require('../utils');

function fetchAttachments(config) {
  let promises = config.map(id => traininfo.fetchInfo(id).then(info => ({
    fallback: `${info.name} ${info.state}`,
    color: info.isNormal ? 'good' : 'danger',
    author_name: info.name,
    author_link: info.url,
    title: info.state,
    text: info.message,
    footer: info.updatedAt,
  })));
  return utils.allAttachmentsPromises(promises, console.error);
}

module.exports = {
  fetchAttachments,
};
