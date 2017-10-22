import React, { Component } from 'react'
import Meteor from 'react-native-meteor'
import { Card } from 'react-native-elements'

import { resetScreen } from '../config/utils'

import { connectAlert } from '../components/Alert'
import Container from '../components/Container'
import { Input, PrimaryButton } from '../components/Form'

class SignUp extends Component {
  state = {
    emailOrUsername: '',
    password: '',
    loading: false,
  }

  signIn = () => {
    const { emailOrUsername, password } = this.state

    if (emailOrUsername.length === 0) {
      return this.props.alertWithType(
        'error',
        'Error',
        'Email or username is required.',
      )
    } else if (password.length === 0) {
      return this.props.alertWithType('error', 'Error', 'Password is required.')
    }

    this.setState({ loading: true })
    return Meteor.loginWithPassword(emailOrUsername, password, err => {
      this.setState({ loading: false })
      if (!err) {
        resetScreen({
          routeName: 'Profile',
          dispatch: this.props.navigation.dispatch,
        })
      } else {
        this.props.alertWithType('error', 'Error', err.reason)
      }
    })
  }

  render() {
    return (
      <Container scroll>
        <Card>
          <Input
            label='Email or Username'
            placeholder='Please enter your email or username...'
            keyboardType='email-address'
            onChangeText={emailOrUsername => this.setState({ emailOrUsername })}
            value={this.state.emailOrUsername}
          />
          <Input
            label='Password'
            placeholder='Please enter your password...'
            secureTextEntry
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <PrimaryButton
            title='Sign In'
            onPress={this.signIn}
            loading={this.state.loading}
          />
        </Card>
      </Container>
    )
  }
}

export default connectAlert(SignUp)
