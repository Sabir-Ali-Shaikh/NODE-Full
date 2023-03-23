import * as functions from "./modules/function.mjs";
import http from "http";
import url from "url";



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
  } catch (err) {
    console.log(err);
  }
});
server.listen(5000);
