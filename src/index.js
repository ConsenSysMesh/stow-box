import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Favicon from 'linnia-brand/Favicon';
import store from './store';
import AppContainer from './containers/AppContainer';

/*
  Remove this ThemeProvider and insert your own to quickly restyle the application!
*/

import ThemeProvider from 'linnia-brand/ThemeProvider';

/*
  You can read more about creating your own theme here: https://material-ui.com/customization/themes/
*/

ReactDOM.render(
  <Fragment>
    <Favicon />
    <Provider store={store}>
      <CssBaseline>
        <ThemeProvider>
          <AppContainer />
        </ThemeProvider>
      </CssBaseline>
    </Provider>
  </Fragment>, document.getElementById('root'));
