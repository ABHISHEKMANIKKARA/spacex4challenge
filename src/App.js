import logo from './logo.svg';
import './App.css';
import Head from './components/Heading/Head'; 
import Table from './components/Table/Table'
import { Switch,Route,Link } from "react-router-dom";


function App() {
  console.log("inside app")
  return (
    <div className="App">
        <Head/>
        <div className="container">
         
      <Switch>
          <Route key="filter" path="/filter">
              <Table/>
          </Route>

          <Route key="home" exact path="/">
               <Table/>
          </Route>
          
      </Switch>
          
        </div>
    </div>
  );
}

export default App;
