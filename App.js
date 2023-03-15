/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import Navigator from './src/navigation';
import { Provider, useDispatch } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
    // </React.StrictMode>
  );
}

export default App;
{
  /* <a href="https://www.freepik.com/free-vector/realistic-clouds-with-falling-rain_18309129.htm#page=6&query=vector%20weather&position=10&from_view=search&track=robertav1">Image by starline</a> on Freepik */
}
