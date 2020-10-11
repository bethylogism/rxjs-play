import { Observable, fromEvent, merge } from 'rxjs';
import { map, scan, throttleTime } from 'rxjs/operators';

export const addItem = (val: any) => {
  const node = document.createElement('li');
  const textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById('output').appendChild(node);
};

fromEvent(document, 'click')
  .pipe(
    throttleTime(1000),
    map((event: MouseEvent) => event.clientX),
    scan((count, clientX) => count + clientX, 0) // scan is like Array.reduce()
  )
  .subscribe(count =>
    console.log(`Clicked ${count} pixels to the right in total!`)
  );

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
