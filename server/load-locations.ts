import {Locations} from 'collections/locations';

export function loadLocations() {

  if (Locations.find().count() === 0) {
    var locations = [
      {
        'jobName': 'This job',
        'location': 'Chantilly',
        'notes': 'friendly'
      },
      {
        'jobName': 'phone sex operator',
        'location': 'Arlington',
        'notes': 'mean cat on premises'
      },
      {
        'jobName': 'install at hospital',
        'location': 'Chantilly',
        'notes': 'no parking'
      }
    ];

    for (var i = 0; i < locations.length; i++) {
      Locations.insert(locations[i]);
    }
  }
};
