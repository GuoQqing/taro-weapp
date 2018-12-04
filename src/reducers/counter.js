
const INITIAL_STATE = {

}

export default function AppStore (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_LOCATION':
      return {
        ...state,
        ...action,
      }
     default:
       return state
  }
}
