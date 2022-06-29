//function to format the createdAt date and time to english GB style(dd/mmm/yyyy) and 24 hr time.
const formatDate = (createdAt) => {
  let date = Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    hour12: false,
  });
  return date.format(createdAt);
};

module.exports = {
  formatDate,
};
