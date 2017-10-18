import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import { Locations } from './locations'
import { Activity } from '../activity/activity'

export const getNearestLocations = new ValidatedMethod({
  name: 'Locations.getNearestLocations',

  validate: new SimpleSchema({
    latitude: { type: Number, decimal: true },
    longitude: { type: Number, decimal: true },
  }).validator(),

  run({ latitude, longitude }) {
    const query = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [ longitude, latitude ],
          },
          $minDistance: 0,
        },
      },
    }

    return Locations.find(query, { limit: 10 }).fetch()
  },
})

export const changeCheckinStatus = new ValidatedMethod({
  name: 'Locations.changeCheckin',

  validate: new SimpleSchema({
    locationId: { type: String },
    status: { type: String, allowedValues: [ 'in', 'out' ] },
  }).validator(),

  run({ locationId, status }) {
    if (!this.userId) {
      throw new Meteor.Error(
        'Locations.changeCheckin.notLoggedIn',
        'Must be logged in to change checkin status.',
      )
    }

    const location = Locations.findOne({ _id: locationId })
    if (!location) {
      throw new Meteor.Error(
        'Locations.changeCheckin.invalidLocationId',
        'Must pass a valid location id to change checkin status.',
      )
    }

    const existingCheckin = Locations.findOne({
      checkedInUserId: this.userId,
    })

    switch (status) {
      case 'in':
        if (location.checkedInUserId === this.userId) {
          throw new Meteor.Error(
            'Locations.changeCheckin.checkedInByUser',
            "You're already checked in at this location.",
          )
        }

        if (typeof location.checkedInUserId === 'string') {
          throw new Meteor.Error(
            'Locations.changeCheckin.checkedInByDifferentUser',
            'Someone is already checked in at this location.',
          )
        }

        if (existingCheckin) {
          throw new Meteor.Error(
            'Locations.changeCheckin.checkedInElsewhere',
            "You're already checked in at a different location.",
          )
        }

        Locations.update(
          { _id: locationId },
          { $set: { checkedInUserId: this.userId } },
        )
        break
      case 'out':
        if (location.checkedInUserId !== this.userId) {
          throw new Meteor.Error(
            'Locations.changeCheckin.notCheckedInHere',
            "You're not checked into this location.",
          )
        }

        Locations.update(
          { _id: locationId },
          { $set: { checkedInUserId: null } },
        )
        break
      default:
    }

    Activity.insert({
      createdAt: new Date(),
      username: Meteor.user().username,
      userId: this.userId,
      type: status,
      locationId,
    })
  },
})
