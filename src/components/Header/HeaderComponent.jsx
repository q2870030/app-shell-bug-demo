import * as React from "react";
import { NavLink } from "react-router-dom";

import HeaderStyle from "./Header.scss";

const HeaderComponent = () => {
  return (
    <header
      className={`display-flex flex-items-align-center padding-all-15 ${
        HeaderStyle["header"]
      }`}
    >
      <h1>
        <NavLink className={`width-100 ${HeaderStyle["logo"]}`} to="/">
          App Shell Demo
        </NavLink>
      </h1>
    </header>
  );
};

export default HeaderComponent;
