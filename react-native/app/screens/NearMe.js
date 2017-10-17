import React, { Component } from 'react'
import { List, ListItem } from 'react-native-elements'

import Container from '../components/Container'

class NearMe extends Component {
  goToLocationDetails = location => {
    this.props.navigation.navigate('LocationDetails', { location })
  }

  render() {
    const { locations } = this.props.navigation.state.params

    return (
      <Container scroll>
        <List>
          {locations.map(l => (
            <ListItem
              key={l._id}
              title={l.station_name}
              onPress={() => this.goToLocationDetails(l)}
            />
          ))}
        </List>
      </Container>
    )
  }
}

export default NearMe
