import {Component, OnInit} from '@angular/core';
import {Observable, Observer} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'subscribeProj';

  constructor() {
  }

  ngOnInit() {
    //todo: method1- Creating Observable
    /*const text$ = new Observable(function(subscriber) {
      subscriber.next(1);
      console.log('teasdst')
    })*/

    //todo: method2- Creating Observable
    /*const text$ = new Observable(function Subscribe(subscriber:Subscriber<any>) {
      subscriber.next(1);
      console.log('teasdst')
    })*/

    //todo: method3- Creating Observable
    /**
     * @Publisher is a person who create an observable that contain subscriber's functions for the subscriber.
     * By default, Publisher method can support both sync and async call.
     */

    const text$ = new Observable(subscriber => {
        console.log('test')
        subscriber.next(1);
        subscriber.error("This will call the error method & stops the execution.");
        subscriber.next(2);
        subscriber.next(3);

        //todo: subscriber.error('manual subscriber error') - to generate manual error
        // subscriber.error('manual subscriber error')

        setTimeout(() => {
          subscriber.next(4);
          subscriber.complete()
        }, 1000);

        //  subscriber.complete()// <- bruteforce method to complete an event
      })

//    todo : easiest method to handling observables
    /*    text$.subscribe(x => {
            console.log(x)
            console.log('from inside of the subscribe method')
          }
        );*/

    //todo: Angular.io recommended way of handling/executing observables from Observers interface
    /**
     * @Consumer method is a method which #subscribe() the observable.
     * Consumer method can be called as many times as possible.
     */

    // const consumer = text$.subscribe({
    //   next(x) {
    //     console.log('1 way of subscribing observable')
    //     console.log(' value of x is =' + x + '\n\n')
    //   },
    //   error(err) {
    //     console.log('something wrong = ' + err)
    //   },
    //   complete() {
    //     console.log('done');
    //   }
    // });

    /**
     * @note: As a general term, We refer the data published by an observable as a stream.
     *
     *  Any type of value can be represented with an observable, and the values are published as a stream.
     *
     * */

      // another method of subscribing to an observable
    const consumer = text$.subscribe(
        x => console.log('Observer got a next value: ' + x),
        err => console.error('Observer got an error: ' + err),
        () => console.log('Observer got a complete notification')
      );

    setTimeout(() => {
      consumer.unsubscribe()
    }, 10000);


    /************************************/
    //todo: method4- Creating Observable using constructor
    function sequenceSubscriber(observer: Observer<number>) {
      // synchronously deliver 1, 2, and 3, then complete
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();

      // unsubscribe function doesn't need to do anything in this
      // because values are delivered synchronously
      return {unsubscribe() {}};
    }

// Create a new Observable that will deliver the above sequence
    const sequence = new Observable(sequenceSubscriber);

// execute the Observable and print the result of each notification
    sequence.subscribe({
      next(num) { console.log(num); },
      complete() { console.log('Finished sequence'); }
    });

// Logs:
// 1
// 2
// 3
// Finished sequence
    /***************************************/

  }

}


/*    SINGLE	  MULTIPLE
Pull	Function	Iterator
Push	Promise	  Observable*/
