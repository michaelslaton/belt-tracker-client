import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import RouteError from './utils/errors/route-error/RouteError';
import Layout from './layout/Layout';
import './App.css'
import DriftGodDisplay from './layout/drift-god/DriftGodDisplay';

function App() {

  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout/>,
      errorElement: <RouteError/>,
      // children: [
      //   { 
      //     path: '/',
      //     element: <HomePage />,
      //     errorElement: <RouteError />
      //   },
      // ],
    },
    {
      path: '/drift',
      element: <DriftGodDisplay/>,
      errorElement: <RouteError/>
    }
  ];

  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
};

export default App;
