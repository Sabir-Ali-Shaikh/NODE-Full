const http = require("http");

const port = 200;
const weatherdata = {
  data: {
    location: "kol",
  },
  status: "success",
  message: "ok",
};
const server = http.createServer((req, res) => {
  console.log(req);
  res.end(JSON.stringify(weatherdata));
});

server.listen(200, () => {
  console.log("port....", port);
});
