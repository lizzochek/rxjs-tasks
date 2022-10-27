import rx from 'rxjs';
import { createReadStream } from 'fs';

// Task 1.1.1
// Create an observable that emits numbers in range from 0 to 20

const numbersObservable = rx.range(0, 21);

numbersObservable.subscribe({
  next: (val) => console.log('Observable 1.1: ', val),
});

// Task 1.1.2
// Create an Observable that emits one event and then completes.

const observable = new rx.Observable((subscriber) => {
  subscriber.next(1);
  subscriber.complete();
  // Will not be emitted
  subscriber.next(2);
});

observable.subscribe({
  next(x) {
    console.log('Observable 1.2: value ' + x);
  },
  error(err) {
    console.error('Something is wrong in Observable 1.2: ' + err);
  },
  complete() {
    console.log('Observable 1.2 done');
  },
});

// Task 1.1.3
// Create observable from an array

const arrayObservable = rx.from([1, 2, 3, 4, 5]);
const subscribe = arrayObservable.subscribe((el) =>
  console.log('Observable 1.3: ', el)
);

// Task 1.1.4
// Create an Observable from a Readable stream

const readStream = createReadStream('task1/task1.1/text.txt', {
  encoding: 'utf-8',
});
rx.from(readStream).subscribe((x) => console.log('Observable 1.4:   ', x));

// Task 1.1.5
// Create an Observable that emits only one event from a callback
const someFunction = (value, callback) => {
  callback(value);
};
const bindedCallback = rx.bindCallback(someFunction);
const callbackObservable = bindedCallback(1);
callbackObservable.subscribe({
  next: (val) => console.log('Observable 1.5: ', val),
});

// Task 1.1.6
// Create an Observable that emits numbers from 0 to 4 in an interval of 1 sec
const numbers = rx.interval(1000);

const intervalObservable = numbers.pipe(rx.take(4));

intervalObservable.subscribe((x) => console.log('Observable 1.6: ', x));

// Task 1.1.7
// Create an Observable from Promise

const myPromise = new Promise((resolve) => {
  setTimeout(() => resolve('Promise Resolved'), 1000);
});

const promiseObservable = rx.from(myPromise);
promiseObservable.subscribe((x) => console.log('Observable 1.7: ', x));

// Task 1.1.8
// Generate a Promise which returns a given value only in case the value is in bounds [min, max]
// In case the value is out of bounds return a rejected Promise.

const rangePromise = (val, range) =>
  new Promise((resolve, reject) => {
    // console.log(val, range[1], range[0], val <= range[0], val >= range[0]);
    if (val <= range[1] && val >= range[0]) {
      resolve('Range Promise resolved');
    } else {
        reject(new Error("Range Promise error"));
    }
  });

  const rangePromiseObservable = rx.from(rangePromise(2, [1, 5]));
  rangePromiseObservable.subscribe((x) => console.log('Observable 1.8 resolved: ', x));

  const rangeErrorPromiseObservable = rx.from(rangePromise(2, [3, 10]));
  rangeErrorPromiseObservable.subscribe({error: err => console.log('Observable 1.8 error catched')});


// Task 1.1.9
// Create Observable that is empty and sends onComplete only

rx.EMPTY.subscribe({
  next: () => console.log('Observer 1.9: next'),
  complete: () => console.log('Observer 1.9: complete'),
});

// Create Observable that emits no signals and never completes
const info = () => console.log('Will never be called');

rx.NEVER.subscribe({
  next: (x) => console.log(x),
  error: info,
  complete: info,
});

// Task 1.1.10
// Create Observable that generates a Fibonacci sequence with 20 iterations depth

// Version 1
const fibonacci = (count) => {
  let num1 = 0,
    num2 = 1,
    nextTerm;

  const res = [num1, num2];
  for (let i = 1; i <= count; i++) {
    nextTerm = num1 + num2;
    num1 = num2;
    num2 = nextTerm;
    res.push(nextTerm);
  }
  return res;
};

const fibonacciObservable = rx.from(fibonacci(19)).subscribe({
  next: (val) => console.log('Fibonacci Observable v1: ', val),
});

// Version 2
let prevNum;
const fibonacciIterator = (curNum) => {
  let nextTerm;
  nextTerm = prevNum + curNum;
  prevNum = curNum;
  curNum = nextTerm;
  if (nextTerm === 0) {
    prevNum++;
    return prevNum;
  }
  return nextTerm;
};

prevNum = 0;
const result = rx.generate({
  initialState: 0,
  condition: (x) => x < 6766,
  iterate: fibonacciIterator,
  resultSelector: (x) => x,
});

const sequenceArray = [];
result.subscribe((x) => sequenceArray.push(x));
console.log('Fibonacci Observable v2: ', sequenceArray);
