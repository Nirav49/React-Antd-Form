import React, { Fragment } from "react";
import Forms from "./components/Forms";
import Forms2 from "./components/Forms2";
import { Redirect, Route } from "react-router-dom";

const App = () => {
  return (
    <Fragment>
    <Route exact path='/'>
      <Redirect to ='/form'/>
    </Route>
      <Route exact path="/form">
        <Forms />
      </Route>
      <Route exact path="/data">
        <Forms2 />
      </Route>
    </Fragment>
  );
};

export default App;
