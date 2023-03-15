import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readFiled() {
  try {
    const WeatherDatacontent = fs.readFileSync(
      path.join(__dirname, "weatherData.txt"),
      "utf8"
    );
    return JSON.parse(WeatherDatacontent);
  } catch (err) {
    console.log(err);
  }
}

function writeFile(data) {
  fs.writeFileSync(
    path.join(__dirname, "weatherData.txt"),
    JSON.stringify(data)
  );
}

export function getWeatherData(location) {
  try {
    const WeatherDB = readFiled();
    let result = WeatherDB.find(
      (obj) => obj.location.city.toLowerCase() == location.toLowerCase()
    );
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
}

export function addLocation(location, condition) {
  const WeatherDB = readFiled();
  let index = WeatherDB.findIndex(
    (obj) => obj.location.city.toLowerCase() == location.city.toLowerCase()
  );
  if (index > -1) {
    console.log("City Already Exist Cannot Add");
  } else {
    WeatherDB.push({ location, condition });
    writeFile(WeatherDB);
    console.log(WeatherDB);
  }
}

export function updateLocation(location, item) {
  const WeatherDB = readFiled();
  let index = WeatherDB.findIndex(
    (obj) => obj.location.city.toLowerCase() == location.toLowerCase()
  );
  if (index > -1) {
    WeatherDB.splice(index, 1, item);
    writeFile(WeatherDB);
    console.log(WeatherDB);
  } else {
    console.log("Requried Data Doesn't Exist to Update");
  }
}

export function removeLocation(location) {
  const WeatherDB = readFiled();
  let index = WeatherDB.findIndex(
    (obj) => obj.location.city.toLowerCase() == location.toLowerCase()
  );
  if (index > -1) {
    WeatherDB.splice(index, 1);
    console.log(WeatherDB);
    writeFile(WeatherDB);
  } else {
    console.log("Nothing to Delete");
  }
}

export function getLocation() {``
  const WeatherDB = readFiled();
  let citylocation = [];
  WeatherDB.forEach((obj) => {
    citylocation.push(obj.location.city);
  });
  console.log(citylocation);
  return citylocation;
}
