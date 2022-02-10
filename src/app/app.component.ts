import {Component} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'subscribeProj';

  constructor() {
    console.log('constructor is called \n \n \n \n \n ');

    //todo: method1- Accessing Observable
    /*const text$ = new Observable(function(subscriber) {
      subscriber.next(1);
      console.log('teasdst')
    })*/

    //todo: method2- Accessing Observable
    /*const text$ = new Observable(function Subscribe(subscriber:Subscriber<any>) {
      subscriber.next(1);
      console.log('teasdst')
    })*/

    //todo: method3- Accessing Observable
    //producer method can send and receive data.
    //By default producer method can support both sync and async call.

    const text$ = new Observable(subscriber => {
      console.log('test')
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);

      //todo: subscriber.error('manual subscriber error') - to generate manual error
      // subscriber.error('manual subscriber error')

      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete()
      }, 1000);

      //  subscriber.complete() - bruteforce method to complete an event
      // subscriber.complete()
    })

/*    text$.subscribe(x => {
        console.log(x)
        console.log('from inside of the subscribe method')
      }
    );*/

    //another way of executing observable from consumer method
    //1) consumer method can be called as many as possible.

    text$.subscribe({
      next(x) {
        console.log('another way of using subscriber')
        console.log(' value of x is =' + x+'\n\n')
      },
      error(err) {
        console.log('something wrong = '+err)
      },
      complete() {
        console.log('done');
      }
    })
  }
}


/*    SINGLE	  MULTIPLE
Pull	Function	Iterator
Push	Promise	  Observable*/
