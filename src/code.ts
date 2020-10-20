import { Observable, fromEvent, merge, from } from 'rxjs';
import { pluck, map, scan, throttleTime } from 'rxjs/operators';

export const addItem = (val: any) => {
  const node = document.createElement('li');
  const textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById('output').appendChild(node);
};

from([
  { first: 'Beth', last: 'Simon', age: 30 },
  { first: 'Bob', last: 'Fell', age: 32 },
  { first: 'Plato', last: 'Kant', age: 33 },
])
  .pipe(pluck('first'))
  .subscribe(addItem); // same as x => addItem(x);

fromEvent(document, 'click')
  .pipe(
    throttleTime(1000),
    map((event: MouseEvent) => event.clientX),
    scan((count, clientX) => count + clientX, 0) // scan is like Array.reduce(), but flat
  )
  .subscribe(total =>
    console.log(`Clicked ${total} pixels to the right in total!`)
  );

fromEvent(document, 'mouseover')
  .pipe(throttleTime(50), pluck('clientY'))
  .subscribe(res => console.log(`Client Y!!! >> ${res}`));

// The general format:
const observable = new Observable(subscriber => {
  try {
    subscriber.next('He yo, heyyo');
    subscriber.next('Whatsup');

    subscriber.complete();
    subscriber.next('this will not send');
  } catch (err) {
    subscriber.error(err);
  }
});

const obs2 = new Observable(subs => {
  subs.next('i am obs subscriber 2');
});

const obsMerger = merge(observable, obs2);

obsMerger.subscribe(
  x => addItem(x),
  err => addItem(err),
  () => addItem('Completed')
);
