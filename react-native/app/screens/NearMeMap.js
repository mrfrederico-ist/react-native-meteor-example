import React, { Component } from 'react'
import MapView from 'react-native-maps'
import { StyleSheet } from 'react-native'

import { replaceScreen } from '../config/utils'

import Container from '../components/Container'
import FloatingButton from '../components/FloatingButton'
import MapCallout, {
  styles as mapCalloutStyles,
} from '../components/MapCallout'

class NearMeMap extends Component {
  goToLocationDetails = location => {
    this.props.navigation.navigate('LocationDetails', { location })
  }

  subTitle = location => {
    let subtitle = ''
    if (location.street_address) {
      subtitle = location.street_address
    }

    if (location.access_days_time && subtitle.length) {
      subtitle = `${subtitle} - ${location.access_days_time}`
    } else if (location.access_days_time) {
      subtitle = location.access_days_time
    }

    return subtitle
  }

  render() {
    const { locations, position } = this.props.navigation.state.params

    return (
      <Container>
        <MapView
          style={{ ...StyleSheet.absoluteFillObject }}
          initialRegion={{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
        >
          {locations.map(location => {
            const [ longitude, latitude ] = location.location.coordinates

            return (
              <MapView.Marker
                key={location._id}
                coordinate={{ latitude, longitude }}
              >
                <MapView.Callout
                  style={mapCalloutStyles.calloutContainer}
                  tooltip
                  onPress={() => this.goToLocationDetails(location)}
                >
                  <MapCallout
                    title={location.station_name}
                    description={this.subTitle(location)}
                    onPress={() => this.goToLocationDetails(location)}
                  />
                </MapView.Callout>
              </MapView.Marker>
            )
          })}
        </MapView>
        <FloatingButton
          icon='list'
          onPress={() =>
            replaceScreen({
              routeName: 'NearMe',
              params: { locations, position },
              dispatch: this.props.navigation.dispatch,
            })}
        />
      </Container>
    )
  }
}

export default NearMeMap
