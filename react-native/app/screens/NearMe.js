import React, { Component } from 'react'
import { List, ListItem } from 'react-native-elements'

import Container from '../components/Container'

class NearMe extends Component {
  render() {
    const { locations } = this.props.navigation.state.params

    return (
      <Container scroll>
        <List>
          {locations.map(location => (
            <ListItem key={location._id} title={location.station_name} />
          ))}
        </List>
      </Container>
    )
  }
}

export default NearMe
