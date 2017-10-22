import React, { Component } from 'react'
import Meteor from 'react-native-meteor'

import { resetScreen } from '../config/utils'

import Container from '../components/Container'
import { PrimaryButton } from '../components/Form'
import { Header } from '../components/Text'

class Profile extends Component {
  signOut = () => {
    Meteor.logout(() => {
      resetScreen({
        routeName: 'SignUp',
        dispatch: this.props.navigation.dispatch,
      })
    })
  }

  render() {
    return (
      <Container>
        <Header>Profile</Header>
        <PrimaryButton title='Sign Out' onPress={this.signOut} />
      </Container>
    )
  }
}

export default Profile
