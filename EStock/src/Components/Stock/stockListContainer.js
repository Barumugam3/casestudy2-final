import { connect } from "react-redux";
import StockList from './stockList';
import {SearchUserData, FetchUserData,CreateUserData,UpdateUserData,ResetBadRequest,DeleteUserData,FetchUserDataMessageClose} from './stockListActions';
const mapStateToProps = (state) => {
  return {  
     fullScreen:state.LoginReducer.fullScreen,
     showMessage: state.stockListReducer.showMessage,    
     isPending: state.stockListReducer.isPending,
     stockListData: state.stockListReducer.stockListData,
     badRequest: state.stockListReducer.badRequest, 
     message: state.stockListReducer.message,   
     clientId:state.LoginReducer.clientId,
     showColor: state.stockListReducer.showColor,
     loggedinData:state.LoginReducer.loggedinData,
  }
}
const mapDispatchToProps = (dispatch) => ({
  FetchUserData: (a) => dispatch(FetchUserData(a)),
  CreateUserData: (a) => dispatch(CreateUserData(a)),
  SearchUserData: (a,b,c) => dispatch(SearchUserData(a,b,c)),
  UpdateUserData: (a,b,c) => dispatch(UpdateUserData(a,b,c)),
  DeleteUserData: (a) => dispatch(DeleteUserData(a)),
  ResetBadRequest: (a) => dispatch(ResetBadRequest(a)),
  FetchUserDataMessageClose: (a) => dispatch(FetchUserDataMessageClose(a)),
})
const stockListContainer = connect(mapStateToProps , mapDispatchToProps)(StockList)

export default stockListContainer