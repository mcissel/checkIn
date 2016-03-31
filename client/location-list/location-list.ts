import {Component, View} from 'angular2/core';
import {RouteParams, RouterLink} from 'angular2/router';

import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'ng2-google-maps/core';
import {Locations} from 'collections/locations';

@Component({
  selector: 'location-list'
})
@View({
  templateUrl: '/client/location-list/location-list.html',
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES, RouterLink]
})

export class LocationList {
  locations: Mongo.Cursor<Object>;

  centerLat: Number = 39.058833;
  centerLng: Number = -77.453420;

  constructor(params: RouteParams) {
    var userId = params.get('userId');
    console.log("userId: " + userId)
    this.locations = Locations.find({owner: userId});
  }

  removeLocation(location) {
    Locations.remove(location._id);
  }
}
