import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import NavBar from './Components/NavBar';
import QueryPage from "./Components/FadeMenu";
import FilesPage from "./Components/FilesPage";
import FooterPage from './Components/Footer';

function App() {
  return (
		<Router>
			<NavBar />

			<Switch>
				<Route exact path="/" component={QueryPage} />
				<Route path="/query" component={QueryPage} />
				<Route path="/files" component={FilesPage} />
		  </Switch>
		  
		  {/* <FooterPage /> */}

		</Router>
  );
}

export default App;
