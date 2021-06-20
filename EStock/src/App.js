import React from 'react';
import { HashRouter as Router , Route } from 'react-router-dom'
import LoginContainer from './Components/Login/LoginContainer';
import DashboardContainer from './Components/Dashboard/DashboardContainer';
import StockListContainer from './Components/Stock/stockListContainer';
import CompanyListContainer from './Components/Company/companyListContainer';
import './App.css';
import './Resources/css/util.css';
import './Resources/css/login.scss';
import 'react-app-polyfill/ie11';
import 'babel-polyfill'; 

function App() {
  return (
    <div className="App">
       <Router basename={process.env.PUBLIC_URL}>      
          <Route exact path ="/" component={LoginContainer} />         
          <Route path ="/Dashboard" component={DashboardContainer} />   
          <Route path ="/Dashboard/Company" component={CompanyListContainer} />  
          <Route path ="/Dashboard/Stock" component={StockListContainer} />  
       </Router>
    </div>
  );
}

export default App;
