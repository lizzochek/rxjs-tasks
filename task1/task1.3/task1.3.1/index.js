const rx = require('rxjs');

function* generateTen(min, max) {
  for (let i = 0; i < 10; i++) {
    yield Math.ceil(Math.random() * (max - min) + min);
  }
}

const randomGenObservable = () => rx.from(generateTen(0, 9000));

module.exports = {
  randomGenObservable,
};