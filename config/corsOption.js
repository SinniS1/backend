const whiteList = ["http://www.production.com", "http:localhost:3501"];
const corsOption = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) === 1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} is not allowed`));
    }
  },
};

module.exports = corsOption;