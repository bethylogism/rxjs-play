import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';

import { addItem } from './code';

const asyncSubj = new AsyncSubject(); // Only gets the last thing, so subj coplewte() needs to be called

const replaySubj = new ReplaySubject(30, 200); // max 30 things, in 200ms interavals

const behaviourSubj = new BehaviorSubject('First');

const subj = new Subject();

subj.subscribe(
  data => addItem(`Obs 1:  ${data}`),
  err => addItem(err),
  () => addItem('Obs 1 is done mate')
);
behaviourSubj.subscribe(
  data => addItem(`behav subj:  ${data}`),
  err => addItem(err),
  () => addItem('behav subj is done mate')
);

behaviourSubj.next('this is the first thing that has been sent, buddy.');
behaviourSubj.next('The Prof is about to subscribe...');

// A classic subject, the Prof only receives whatever comes after him
const professorObserverre = subj.subscribe(data =>
  addItem(`Prof Observington professeth: ${data}`)
);

const professorBehaviourSubject = behaviourSubj.subscribe(allTheData =>
  addItem(`Prof Behaviour knows: ${allTheData}`)
);

behaviourSubj.next('the second thing');
behaviourSubj.next('the third thing');

professorObserverre.unsubscribe();
subj.unsubscribe();

behaviourSubj.next('The Final Thing has been sent, pal');
