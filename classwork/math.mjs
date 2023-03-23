export function add(a, b) {
  if (typeof a === "number" && typeof b === "function") {
    return a + b;
  } else {
    console.log("Type numbers only");
  }
}

exports = {
  add: add,
};

export function sub(a, b) {
  if (typeof a === "number" && typeof b === "function") {
    return a - b;
  } else {
    console.log("Type numbers only");
  }
}

module.exports = {
  add: add,
  sub: sub,
};
