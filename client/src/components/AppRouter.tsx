import {Route, Routes} from 'react-router-dom';
import {EPath} from '../types/EPath';
import Main from '../views/Main';

enum ERoute {
  Path = 'path',
  Component = 'Component',
}

interface IRoute {
  [ERoute.Path]: EPath;
  [ERoute.Component](): JSX.Element;
}

const publicRoutes: IRoute[] = [{[ERoute.Path]: EPath.Main, [ERoute.Component]: Main}];

const AppRouter = () => (
  <Routes>
    {publicRoutes.map(({path, Component}) => (
      <Route key={path} path={path} element={<Component />} />
    ))}
  </Routes>
);

export default AppRouter;
