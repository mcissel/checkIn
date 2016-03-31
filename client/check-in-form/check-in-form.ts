import {Component, View} from 'angular2/core';
import {FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';
import {MeteorComponent} from 'angular2-meteor';
import {RouterLink, Router} from 'angular2/router';

import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES, MapMouseEvent} from 'ng2-google-maps/core';
import {Locations} from 'collections/locations';
import {InjectUser, RequireUser} from 'meteor-accounts';


@Component({
  selector: 'check-in-form'
})
@View({
  templateUrl: '/client/check-in-form/check-in-form.html',
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES, RouterLink]
})
//@RequireUser()
@InjectUser()


export class CheckInForm extends MeteorComponent {
  locationsForm: ControlGroup;

  centerLat: Number = 39.058833;
  centerLng: Number = -77.453420;

  lat: Number;
  lng: Number;

  constructor() {
    super();
    var fb = new FormBuilder();
    this.locationsForm = fb.group({
      jobName: ['', Validators.required],
      notes: ['']
    });
  }

addLocation(location): void {
    if (this.user) {
      if (this.locationsForm.valid) {
        if (this.lat && this.lng) {
          Locations.insert({
            jobName: location.jobName,
            location: {
              lat: this.lat,
              lng: this.lng,
            },
            notes: location.notes,
            owner: Meteor.userId()
          });

          (<Control>this.locationsForm.controls['jobName']).updateValue('');
          (<Control>this.locationsForm.controls['location']).updateValue('');
          (<Control>this.locationsForm.controls['notes']).updateValue('');

          console.log('you submitted value: ', location);
          this.router.navigate(["LocationList"]);
        }
        else {
          alert('Click your location on the map before checking in');
        }
      }
    }
    else {
      alert('You have to log in before you can check in');
    }
  }

  // get? what is this, C#?
  get userName() {
    return this.user.username || this.user.emails[0].address;
  }

  mapClicked($event: MapMouseEvent) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }
}
