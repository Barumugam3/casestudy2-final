import { connect } from "react-redux";
import Dashboard from './Dashboard';
import {toggleFullScreen, attempttologout, attempttologinsuccess, attempttologinerrorClose} from '../Login/LoginActions';
const mapStateToProps = (state) => {
  return {
    fullScreen:state.LoginReducer.fullScreen,    
    primaryColor:state.LoginReducer.primaryColor,
    userId:state.LoginReducer.userId,
    clientId:state.LoginReducer.clientId,
    loggedinData: state.LoginReducer.loggedinData,   
    accessToken: state.LoginReducer.accessToken,
    logmessage: state.LoginReducer.message,
    logshowMessage: state.LoginReducer.showMessage,   
    showColor: state.LoginReducer.showColor
  }
  
}
const mapDispatchToProps = (dispatch) => ({
  toggleFullScreen: (a) => dispatch(toggleFullScreen(a)),
  attempttologinsuccess: (a) => dispatch(attempttologinsuccess(a)),
  attempttologout: (a,b) => dispatch(attempttologout(a,b)),
  attempttologinerrorClose: () => dispatch(attempttologinerrorClose()),  
})
const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export default DashboardContainer