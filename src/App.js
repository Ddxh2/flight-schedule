import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { FlightsProvider, SchedulesProvider } from "./context";
import { Home } from "./pages";

import "./App.css";

function App() {
  return (
    <FlightsProvider>
      <SchedulesProvider>
        <Router>
          <Route exact route='/' component={Home} />
          <Redirect to='/' />
        </Router>
      </SchedulesProvider>
    </FlightsProvider>
  );
}

export default App;
