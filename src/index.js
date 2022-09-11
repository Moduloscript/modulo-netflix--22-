import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import ToggleColorModeProvider from './utils/ToggleColorMode';
import App from './components/App';
import store from './app/store';


ReactDOM.render(
  <Provider store={store}>
    <ToggleColorModeProvider>
      <Router>
        <App />
      </Router>
    </ToggleColorModeProvider>
  </Provider>,
  document.getElementById('root'),
);
