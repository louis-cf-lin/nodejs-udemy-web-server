const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=62bdda5169b1c77804c268d74c78e36e&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      const {
        current: {
          weather_descriptions: [description],
          temperature,
        },
      } = body;
      callback(
        undefined,
        `${description}. It is currently ${temperature} degrees out.`
      );
    }
  });
};

module.exports = forecast;
