import users from '../../Resources/images/users.png';
import tickets from '../../Resources/images/tickets.png';
import _ from 'lodash';
const initialState = {
  isPending:false,
  showMessage:false,
  loggedinData:{},
  accessToken:"",
  message:"",
  fullScreen:true,  
  primaryColor:'#02244a',
  menuOptions:[
    {'moduleName':'Company', 'id':'0','icon':tickets, 'path':'/Dashboard/Company','width':'35px', 'maxWidth':'40px'},
    {'moduleName':'Stock', 'id':'1','icon':users, 'path':'/Dashboard/Stock','width':'35px', 'maxWidth':'40px'}
     ],
}
const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_ACTION_PENDING':
      return Object.assign({}, state, {
        isPending: action.isPending
      })
    case 'LOGIN_ACTION_SUCCESS':
      let menuOptions = [{"moduleUId":"COMPANY",'icon':tickets, "id":0}, {"moduleUId":"STOCK",'icon':users, "id":1}]
      if(!_.isEmpty(action.loggedinData) && _.has(action.loggedinData, "modules")){
        menuOptions = action.loggedinData.modules
      }
       _.map(menuOptions, (data) =>{
          if(data.moduleUId === "STOCK"){
            data['path'] = '/Dashboard/Stock'
            data['position'] = 2
            data['moduleName'] = 'Stock'
            data['width'] = '35px'
            data['maxWidth'] = '40px'
          } else if(data.moduleUId === "COMPANY"){
            data['path'] = '/Dashboard/Company'
            data['position'] = 1
            data['moduleName'] = 'Company'
            data['width'] = '35px'
            data['maxWidth'] = '40px'
          }    
       })
        window.localStorage.setItem('menuOptions', JSON.stringify(menuOptions))
        return Object.assign({}, state, {      
          loggedinData: action.loggedinData,
          accessToken: action.accessToken,
          menuOptions: menuOptions,
          isPending: action.isPending,
        })
    case 'AUTHENTICATION_FAILED':
      return Object.assign({}, state, {
        message: action.message,
        loggedinData: action.loggedinData,
        accessToken: action.accessToken,
        showMessage: action.showMessage,
        isPending: action.isPending,        
        showColor: action.showColor
      })  
    case "AUTHENTICATION_FAILED_CLOSE":
      return Object.assign({}, state, {
        showMessage: action.showMessage,
        message: action.message,
      })
    case "TOGGLE_FULL_SCREEN":
        return Object.assign({}, state, {
          fullScreen: action.fullScreen,
        })
   default:
      return state
  }
}
export default LoginReducer;