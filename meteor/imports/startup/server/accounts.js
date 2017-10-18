import { Accounts } from 'meteor/accounts-base'

Accounts.onCreateUser(function onCreateUser(options, user) {
  if (!user.username) {
    Object.assign({ username: user.email.split('@')[0] }, user)
  }
  return user
})
