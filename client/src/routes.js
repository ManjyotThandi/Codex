import React from "react";
import { Route, Switch } from "react-router-dom"; //redirect
import Answer from "./pages/Answer"
import Dashboard from "./pages/Dashboard";
import Wizard from "./pages/Wizard";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import NoMatch from "./pages/NoMatch";
import Questions from "./pages/QuestionPage";

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   console.log(document.cookie);
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         document.cookie ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/signin",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//   );
// };

export default props => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/signin" component={SignIn} />
    <Route exact path="/wizard" component={Wizard} />
    <Route exact path="/Questions" component={Questions} />
    <Route exact path="/answer/:id" component={Answer} />
    <Route component={NoMatch} />
  </Switch>
);
