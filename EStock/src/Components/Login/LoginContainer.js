import { connect } from "react-redux";
import {attempttologin, attempttologinerrorClose} from "./LoginActions";
import Login from './Login';

const mapStateToProps = (state) => {
  return {
    loggedinData: state.LoginReducer.loggedinData,
    message: state.LoginReducer.message,
    showMessage: state.LoginReducer.showMessage,    
    isPending: state.LoginReducer.isPending,
    accessToken: state.LoginReducer.accessToken,
    userId: state.LoginReducer.userId,
    clientId: state.LoginReducer.clientId,
    showColor: state.LoginReducer.showColor
    
  }
}
const mapDispatchToProps = (dispatch) => ({
  attempttologin: (a) => dispatch(attempttologin(a)),
  attempttologinerrorClose: () => dispatch(attempttologinerrorClose()),
})
const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer