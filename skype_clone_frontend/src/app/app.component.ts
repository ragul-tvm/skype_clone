import { Component } from '@angular/core';
import { Event as NavigationEvent, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LoginOrSignupComponent } from './components/login-or-signup/login-or-signup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'skype_clone';
  // constructor(router: Router,
  //   private loginComp: LoginOrSignupComponent) {

  //   router.events
  //     .pipe(
  //       // The "events" stream contains all the navigation events. For this demo,
  //       // though, we only care about the NavigationStart event as it contains
  //       // information about what initiated the navigation sequence.
  //       filter(
  //         (event: NavigationEvent) => {
  //           return (event instanceof NavigationStart);
  //         })
  //     )
  //     .subscribe(
  //       (event: any) => {
  //         console.group("NavigationStart Event");
  //         // Every navigation sequence is given a unique ID. Even "popstate"
  //         // navigations are really just "roll forward" navigations that get
  //         // a new, unique ID.
  //         console.log("navigation id:", event.id);
  //         console.log("route:", event.url);

  //         if (event.url === '' && loginComp.loginToken) {
  //           router.navigateByUrl(`/main/${this.loginComp.loginToken}`, { skipLocationChange: true })
  //         }
  //         // The "navigationTrigger" will be one of:
  //         // --
  //         // - imperative (ie, user clicked a link).
  //         // - popstate (ie, browser controlled change such as Back button).
  //         // - hashchange
  //         // --
  //         // NOTE: I am not sure what triggers the "hashchange" type.
  //         console.log("trigger:", event.navigationTrigger);
  //         // This "restoredState" property is defined when the navigation
  //         // event is triggered by a "popstate" event (ex, back / forward
  //         // buttons). It will contain the ID of the earlier navigation event
  //         // to which the browser is returning.
  //         // --
  //         // CAUTION: This ID may not be part of the current page rendering.
  //         // This value is pulled out of the browser; and, may exist across
  //         // page refreshes.
  //         if (event.restoredState) {
  //           console.warn(
  //             "restoring navigation id:",
  //             event.restoredState.navigationId
  //           );
  //         }
  //         console.groupEnd();
  //       });

  // }
}
