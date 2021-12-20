module.exports = function validator(v) {
  const isUrlValid = /^(http:\/\/|https:\/\/)(www\.|)[a-zA-Z0-9-]+(.com$|.com\/[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]*$)/;
  return isUrlValid.test(v);
};
