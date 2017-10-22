import { NavigationActions } from 'react-navigation'

export const replaceScreen = ({ routeName, params, dispatch }) => {
  dispatch({
    key: routeName,
    type: 'ReplaceCurrentScreen',
    routeName,
    params,
  })
}

export const resetScreen = ({ routeName, dispatch }) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [ NavigationActions.navigate({ routeName }) ],
  })
  dispatch(resetAction)
}
