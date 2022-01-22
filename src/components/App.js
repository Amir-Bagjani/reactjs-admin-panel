import { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context
import { useUserState } from "../context/UserContext";

//google chapta
import { loadReCaptcha } from 'react-recaptcha-v3'
export const RECAPTCHA_SITE_KEY = "6LcnQQweAAAAAMBlBx-7k04NG7uHEBEkhpBaaR4l";

export default function App() {
  // global
  const { isAuthenticated } = useUserState();

  useEffect(() => {
    loadReCaptcha(RECAPTCHA_SITE_KEY);
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} />
        
        <Route path="/app">
          {isAuthenticated ? <Layout /> : <Redirect to="/login" /> }
        </Route>

        <Route path="/login">
          {isAuthenticated ? <Redirect to="/" /> : <Login />}
        </Route>

        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}
