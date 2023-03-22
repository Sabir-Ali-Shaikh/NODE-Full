import * as functions from "./modules/function.mjs";
import http from "http";
import url from "url";

let location = {
  city: "hisar",
  lat: 23,
  long: 29,
};

let condition = {
  humidity: 51,
  tempC: 34.8,
  tempF: 89.6,
  uv: 7,
  cloud: 10,
};

let item = {
  location: {
    city: "patna",
    lat: 56,
    long: 34,
  },

  condition: {
    humidity: 62,
    tempC: 27,
    tempF: 80.6,
    uv: 8,
  },
};

// functions.getWeatherData("kolkata");
// functions.addLocation(location, condition);
// functions.removeLocation("hisar")
// functions.updateLocation("patna", item);
// functions.getLocation()

// const notes = "./modules/weatherData.txt";
// console.log(path.dirname(notes));
// console.log(path.basename(notes));
// // notes.txt
// console.log(path.extname(notes));

// for myself

// fs.writeFile("./modules/weatherData.txt",s WeatherData.toString(), (err) => {
//   if (err) {
// console.error(err);
//   }
// });

// fs.writeFile(
//   "./modules/weatherData.txt",
//   JSON.stringify(WeatherData),
//   (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//   }
// );

const server = http.createServer(function (req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const linkPath = url.parse(req.url, true);
    const path = linkPath.pathname;
    let q = linkPath.query;
    if (path === "/get-weather") {
      if (q.city !== undefined) {
        let data = functions.getWeatherData(q.city);
        if (data !== undefined) {
          res.write(JSON.stringify(data));
          res.end();
        } else {
          res.end(
            JSON.stringify({
              succes: false,
              message: "City Not found in Data Base",
            })
          );
        }
      }
    } else if (path === "/city") {
      res.end(JSON.stringify(functions.getLocation()));
    } else {
      res.end(
        JSON.stringify({
          message: "404 not found",
        })
      );
    }

    // console.log(q.city);
  } catch (err) {
    console.log(err);
  }
});
server.listen(5000);
