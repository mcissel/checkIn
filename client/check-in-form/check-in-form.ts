import {Component, View} from 'angular2/core';

import {FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';

import {Locations} from 'collections/locations';

@Component({
  selector: 'check-in-form'
})
@View({
  templateUrl: '/client/check-in-form/check-in-form.html'
})
export class LocationsForm {
  locationsForm: ControlGroup;

  constructor() {
    var fb = new FormBuilder();
    this.locationsForm = fb.group({
      jobName: ['', Validators.required],
      location: ['', Validators.required],
      notes: ['']
    });
  }

  addLocation(location) {
    if (Meteor.userId()) {
      if (this.locationsForm.valid) {
        Locations.insert({
          jobName: location.jobName,
          location: location.location,
          notes: location.notes,
          owner: Meteor.userId()
        });

        (<Control>this.locationsForm.controls['jobName']).updateValue('');
        (<Control>this.locationsForm.controls['location']).updateValue('');
        (<Control>this.locationsForm.controls['notes']).updateValue('');
      }
    }
    else {
      alert('You have to log in before you can check in');
    }
  }
}
