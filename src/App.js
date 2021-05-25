import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
} from "react-router-dom";


import Todos from "./components/Todos";
import ColorModeContainer from "./components/ColorModeContainer";
import Login from "./components/Login";
import Home from "./components/Home";

export default function App() {
    return (
        <ColorModeContainer>
          
          <Router>
            <div className="d-flex gap-3">

              <NavLink to="/"
        /* activeClassName="selected" */
                       activeStyle={{
                           fontWeight: "bold",
                       }}
              >
                Home
              </NavLink>

              <NavLink to="/todos"
                       activeStyle={{
                           fontWeight: "bold",
                       }}
              >
                Todos
              </NavLink>

              <NavLink to="/login"
                       activeStyle={{
                           fontWeight: "bold",
                       }}
              >
                Topics
              </NavLink>

              <div className="container my-4">
                <h1 className="text-center">ToDos App</h1>
                
                <Switch>
                  <Route exact path="/todos">
                    <Todos />
                  </Route>
                  <Route exact path="/login">
                    <Login />
                  </Route>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  {/* <Route path="/404"> */}
                  {/* <NotFound /> */}
                  {/* </Route> */}
                  <Route component="NotFound" />
                </Switch>
              </div>
            </div>
          </Router>
        </ColorModeContainer>
    );
}

// export default App;
