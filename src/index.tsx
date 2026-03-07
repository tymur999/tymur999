import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {RouterProvider} from "./router/RouterContext";
import "@fontsource/inter"; // Defaults to weight 400
import "@fontsource/neuton";
import {Routes} from "./router/Route";

const Nav = React.lazy(() => import("./nav/Nav"));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider>
      <Nav/>
      <Routes/>
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
