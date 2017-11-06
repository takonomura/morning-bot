function allAttachmentsPromises(promises, errorHandler) {
  promises = promises.map(promise => promise.catch(errorHandler));
  return Promise.all(promises).then(results => {
    return results.reduce((attachments, result) => {
      if (!Array.isArray(result)) {
          result = [result];
      }
      attachments.push(...result);
      return attachments;
    }, []);
  });
}

module.exports = {
  allAttachmentsPromises,
};
