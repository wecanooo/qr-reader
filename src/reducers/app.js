const initialState = {
  openMenu: false,
  uuid: null,
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDE_MENU': {
      const { openMenu } = action.payload

      return {
        ...state,
        openMenu
      }
    }

    case 'SET_UUID': {
      const { uuid } = action.payload

      return {
        ...state,
        uuid
      }
    }

    case 'CLEAR_UUID': {
      return initialState;
    }

    default:
      return state;
  }
}

export default app;
