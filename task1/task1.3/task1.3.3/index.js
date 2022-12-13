const mapFunc = (x) => {
  if (typeof x === 'string') return x.toUpperCase();
  if (typeof x === 'number') return x * 2;
  else return x;
};

const observableFunc = (observable) => {
  const res = [];
  observable.pipe(rx.map((x) => mapFunc(x))).subscribe((x) => res.push(x));
  return rx.from(res);
};

module.exports = {
  randomGenObservable,
  observableFunc,
};