import {Component, View, NgZone, provide} from 'angular2/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, APP_BASE_HREF} from 'angular2/router';

import {bootstrap, MeteorComponent} from 'angular2-meteor';
import {AccountsUI} from 'meteor-accounts-ui';
import {InjectUser} from 'meteor-accounts';

import {ANGULAR2_GOOGLE_MAPS_PROVIDERS, ANGULAR2_GOOGLE_MAPS_DIRECTIVES, MapMouseEvent} from 'ng2-google-maps/core';

import {Locations} from 'collections/locations';
import {LocationList} from 'client/location-list/location-list';
import {CheckInForm} from 'client/check-in-form/check-in-form';




Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});


@Component({
  selector: 'app'
})
@View({
    template: '<accounts-ui></accounts-ui><router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES, AccountsUI]
})


@InjectUser()


@RouteConfig([
    { path: '/', as: 'CheckInForm', component: CheckInForm },
//    { path: '/', as: 'LocationList', component: LocationList }
    { path: '/locations/:userId', as: 'LocationList', component: LocationList }
])

class CheckIn {}
//class CheckIn extends MeteorComponent {
//  locations: Mongo.Cursor<Object>;
//
//  // TYPES EXPECTED!!!
//  centerLat: Number = 39.058833;
//  centerLng: Number = -77.453420;
//
//  // Constructors
//  constructor () {
//    super();
//  }
//
//  // get? what is this, C#?
//  get lat(): Number {
//    return this.location && this.location.lat;
//  }
//
//  get lng(): Number {
//    return this.location && this.location.lng;
//  }
//
//  mapClicked($event: MapMouseEvent) {
//    this.location.lat = $event.coords.lat;
//    this.location.lng = $event.coords.lng;
//  }
//}

bootstrap(CheckIn, [ROUTER_PROVIDERS, ANGULAR2_GOOGLE_MAPS_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);
