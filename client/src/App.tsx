import {CssBaseline} from '@mui/material';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Loader from './components/Loader';
import AlertLine from './components/AlertLine/AlertLine';
import Bar from './components/bar/Bar';

const App = () => (
  <BrowserRouter>
    <CssBaseline />
    <Loader />
    <Bar />
    <AppRouter />
    <AlertLine />
  </BrowserRouter>
);

export default App;
