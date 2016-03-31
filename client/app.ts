import {Component, View, NgZone} from 'angular2/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {bootstrap, MeteorComponent} from 'angular2-meteor';
import {AccountsUI} from 'meteor-accounts-ui';
import {InjectUser} from 'meteor-accounts';

import {ANGULAR2_GOOGLE_MAPS_PROVIDERS, ANGULAR2_GOOGLE_MAPS_DIRECTIVES, MapMouseEvent} from 'ng2-google-maps/core';

import {Locations} from 'collections/locations';
import {LocationsForm} from 'client/check-in-form/check-in-form';

@Component({
  selector: 'app'
})
@View({
  templateUrl: 'client/app.html',
  directives: [LocationsForm, ROUTER_DIRECTIVES, ANGULAR2_GOOGLE_MAPS_DIRECTIVES, AccountsUI]
})
@InjectUser()

class CheckIn extends MeteorComponent {
  locations: Mongo.Cursor<Object>;

  // TYPES EXPECTED!!!
  centerLat: Number = 39.058833;
  centerLng: Number = -77.453420;

  // Constructors
  constructor () {
    super();
    this.locations = Locations.find();
  }

  removeLocation(location) {
    Locations.remove(location._id);
  }

  // get? what is this, C#?
  get lat(): Number {
    return this.location && this.location.lat;
  }

  get lng(): Number {
    return this.location && this.location.lng;
  }

  mapClicked($event: MapMouseEvent) {
    this.location.lat = $event.coords.lat;
    this.location.lng = $event.coords.lng;
  }
}

bootstrap(CheckIn, [ROUTER_PROVIDERS, ANGULAR2_GOOGLE_MAPS_PROVIDERS]);
