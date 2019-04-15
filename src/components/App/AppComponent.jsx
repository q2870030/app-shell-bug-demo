import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Route, Switch } from "react-router-dom";

import AppStyles from "./App.scss";

import Footer from "../Footer";
import Header from "../Header";
import NotFound from "../NotFound";
import routes from "../../routes";

const AppComponent = () => (
  <div className={AppStyles["wrapper"]}>
    <Header />
    <section className={`padding-all-15 ${AppStyles["page-specific-content"]}`}>
      <Switch>
        {routes.map(({ path, exact, component: C, ...rest }) => (
          <Route
            exact={exact}
            key={path}
            path={path}
            render={props => <C {...props} {...rest} />}
          />
        ))}
        <Route component={NotFound} />
      </Switch>
    </section>
    <Footer />
  </div>
);

export default hot(AppComponent);
