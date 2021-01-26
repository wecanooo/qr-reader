export const toggleSideMenu = (openMenu) => ({
  type: 'TOGGLE_SIDE_MENU',
  payload: { openMenu },
});

export const setId = (uuid) => ({
  type: 'SET_UUID',
  payload: { uuid }
})

export const clearId = () => ({
  type: 'CLEAR_UUID'
})