import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from "./context/theme";
import Nav from "./components/Nav";
import Loading from "./components/Loading";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
const Popular = React.lazy(() => import("./components/Popular"));
const Battle = React.lazy(() => import("./components/Battle"));
const Results = React.lazy(() => import("./components/Results"));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "light",
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === "light" ? "dark" : "light",
        }));
      },
    };
  }
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />
              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path="/" component={Popular}></Route>
                  <Route exact path="/battle" component={Battle}></Route>
                  <Route path="/battle/results" component={Results}></Route>
                  <Route render={() => <h1>404</h1>}></Route>
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
