import {Component, View, NgZone} from 'angular2/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {bootstrap, MeteorComponent} from 'angular2-meteor';
import {AccountsUI} from 'meteor-accounts-ui';
import {InjectUser} from 'meteor-accounts';

import {Locations} from 'collections/locations';
import {LocationsForm} from 'client/check-in-form/check-in-form';

@Component({
    selector: 'app'
})
@View({
    templateUrl: 'client/app.html',
    directives: [LocationsForm, ROUTER_DIRECTIVES, AccountsUI]
})
@InjectUser()
class CheckIn extends MeteorComponent {
    locations: Mongo.Cursor<Object>;

    constructor () {
      super();
        this.locations = Locations.find();
    }

    removeLocation(location) {
        Locations.remove(location._id);
    }
}

bootstrap(CheckIn, [ROUTER_PROVIDERS]);
