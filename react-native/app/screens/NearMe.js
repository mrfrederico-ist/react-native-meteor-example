import React, { Component } from 'react'
import { View } from 'react-native'
import { List, ListItem } from 'react-native-elements'

import { replaceScreen } from '../config/utils'

import Container from '../components/Container'
import FloatingButton from '../components/FloatingButton'

class NearMe extends Component {
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
      <View>
        <Container scroll>
          <List>
            {locations.map(location => (
              <ListItem
                key={location._id}
                title={location.station_name}
                subtitle={this.subTitle(location)}
                onPress={() => this.goToLocationDetails(location)}
              />
            ))}
          </List>
        </Container>
        <FloatingButton
          icon='map'
          onPress={() =>
            replaceScreen({
              routeName: 'NearMeMap',
              params: { locations, position },
              dispatch: this.props.navigation.dispatch,
            })}
        />
      </View>
    )
  }
}

export default NearMe
