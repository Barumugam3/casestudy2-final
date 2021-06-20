import { connect } from "react-redux";
import CompanyList from './companyList';
import {SearchUserData, FetchUserData,CreateUserData,UpdateUserData,ResetBadRequest,DeleteUserData,FetchUserDataMessageClose} from './companyListActions';
const mapStateToProps = (state) => {
  return {  
     fullScreen:state.LoginReducer.fullScreen,
     showMessage: state.companyListReducer.showMessage,    
     isPending: state.companyListReducer.isPending,
     companyListData: state.companyListReducer.companyListData,
     badRequest: state.companyListReducer.badRequest, 
     message: state.companyListReducer.message,   
     clientId:state.LoginReducer.clientId,
     showColor: state.companyListReducer.showColor,
     loggedinData:state.LoginReducer.loggedinData,
  }
}
const mapDispatchToProps = (dispatch) => ({
  FetchUserData: (a) => dispatch(FetchUserData(a)),
  CreateUserData: (a) => dispatch(CreateUserData(a)),
  SearchUserData: (a) => dispatch(SearchUserData(a)),
  UpdateUserData: (a,b,c) => dispatch(UpdateUserData(a,b,c)),
  DeleteUserData: (a) => dispatch(DeleteUserData(a)),
  ResetBadRequest: (a) => dispatch(ResetBadRequest(a)),
  FetchUserDataMessageClose: (a) => dispatch(FetchUserDataMessageClose(a)),
})
const companyListContainer = connect(mapStateToProps , mapDispatchToProps)(CompanyList)

export default companyListContainer