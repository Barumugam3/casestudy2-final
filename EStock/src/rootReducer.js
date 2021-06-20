import { combineReducers } from 'redux';
import LoginReducer from './Components/Login/LoginReducer';
import stockListReducer from './Components/Stock/stockListReducer'; 
import companyListReducer from './Components/Company/companyListReducer'; 
const appReducer = combineReducers({
  LoginReducer,
  companyListReducer,
  stockListReducer
});


const rootReducer = (state, action) => {  
  if (action.type === 'LOG_OUT') {
    state = {};
  }  
  return appReducer(state, action);
}
export default rootReducer;