const initialState = {
    isPending:false,
    showMessage:false,
    message:"",
    stockListData:[],
    badRequest:null,
    showColor:''
  }
const stockListReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'COMPANY_LIST_PENDING':
        return Object.assign({}, state, {
          isPending: action.isPending
        })
      case 'COMPANY_BAD_REQUEST':
          return Object.assign({}, state, {
            badRequest: action.badRequest
          })
      case 'COMPANY_LIST_SUCCESS':
        return Object.assign({}, state, {      
          stockListData: action.stockListData,
          isPending: action.isPending,
        })
      case 'COMPANY_LIST_FAILED':
        return Object.assign({}, state, {
          message: action.message,
          showMessage: action.showMessage,
          isPending: action.isPending,
          showColor:action.showColor
        })  
      case "COMPANY_LIST_FAILED_CLOSE":
        return Object.assign({}, state, {
          showMessage: action.showMessage,
          message: action.message,
        })
     default:
        return state
    }
   }
export default stockListReducer;