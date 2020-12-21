import React from 'react';

const AppContext = React.createContext();

export default AppContext;

export function withAppContext(Component) {
  // eslint-disable-next-line react/display-name
  return (props) => (
    <AppContext.Consumer>
      {(appClient) => <Component {...props} appClient={appClient} />}
    </AppContext.Consumer>
  );
}