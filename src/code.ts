import { Observable, fromEvent } from 'rxjs';
import { map, scan, throttleTime } from 'rxjs/operators';

console.log(Observable);
console.log('updating again');

fromEvent(document, 'click')
  .pipe(
    throttleTime(1000),
    map((event: MouseEvent) => event.clientX),
    scan((count, clientX) => count + clientX, 0) // scan is like Array.reduce()
  )
  .subscribe(count =>
    console.log(`Clicked ${count} pixels to the right in total!`)
  );

const addItem = (val: any) => {
  const node = document.createElement('li');
  const textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById('output').appendChild(node);
};

// deprecated - what replaces?
const observable = new Observable(subscriber => {
  subscriber.next('He yo, heyyo');
  subscriber.next('Whatsup');
  subscriber.complete();
  subscriber.next('this will not send');
});

observable.subscribe(
  x => addItem(x),
  err => addItem(err),
  () => addItem('Completed')
);
