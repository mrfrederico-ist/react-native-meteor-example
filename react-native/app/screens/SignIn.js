import React, { Component } from 'react'

import { Card } from 'react-native-elements'
import { Input, PrimaryButton } from '../components/Form'

import Container from '../components/Container'

class SignUp extends Component {
  state = {
    emailOrUsername: '',
    password: '',
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
          <PrimaryButton title='Sign In' />
        </Card>
      </Container>
    )
  }
}

export default SignUp
