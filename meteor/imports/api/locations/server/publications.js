import { Meteor } from 'meteor/meteor'

import { Locations } from '../locations'

Meteor.publish('Location.pub.details', function getLocationDetails({
  locationId,
}) {
  return Locations.find({ _id: locationId })
})
