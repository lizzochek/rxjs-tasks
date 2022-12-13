const rx = require('rxjs');

describe('RxJS', () => {
  // Test the given Observable in such a way so execution takes less than a second
  it('should fire', (done) => {
    const myObservable = rx.timer(0, 1000);
    myObservable.subscribe((data) => {
      done();
    });
  }, 1000);
})
