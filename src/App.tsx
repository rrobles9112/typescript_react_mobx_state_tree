import React from 'react';
import Routes from './views/Routes';
import { Provider, rootStore } from "./models/Root";


const App: React.FC = () => {
  return (
   <Provider value={rootStore}>
      <Routes />
    </Provider>
  );
};

export default App;
