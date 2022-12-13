const rx = require('rxjs');
const { observableFunc } = require('./index');

describe('RxJS', () => {
  // Unit-Test the given function which accepts and produces an Observable. Manually supply required elements
  it('should correctly execute', () => {
    const res = observableFunc(
      rx.from([1, 'abc', [2, 3], { name: 'Anna' }, 4, 5])
    );
    let final = [];
    res.subscribe((x) => final.push(x));
    expect(res).toBeInstanceOf(rx.Observable);
    expect(final).toEqual([2, 'ABC', [2, 3], { name: 'Anna' }, 8, 10]);
  });
});