const rx = require('rxjs');
const { randomGenObservable, observableFunc } = require('./index');

describe('RxJS', () => {
  // Test an Observable that returns 10 random elements
  it('Should randomGenObservable return 10 random numbers', () => {
    const res = randomGenObservable();
    res
      .pipe(rx.count())
      .subscribe((totalEmissions) => expect(totalEmissions).toEqual(10));
    res.subscribe((value) => expect(typeof value).toBe('number'));
    res.subscribe((value) => expect(value).toBeGreaterThanOrEqual(0));
    res.subscribe((value) => expect(value).toBeLessThan(9000));
  })
})
