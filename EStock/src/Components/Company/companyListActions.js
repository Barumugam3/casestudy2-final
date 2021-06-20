import {USERS_LIST, CREATE_USERS, EDIT_USERS, DELETE_USERS, API_ENDPOINT_COMPANY}  from '../apiList';
import {attempttologout} from '../Login/LoginActions';
import _ from 'lodash';
const successCode = [200, 201];
const infoCode = [404, 406, 401, 407];
const errorCode = [500, 501, 400];
export function FetchUserData(data){
  return (dispatch) => {
    let accessToken = JSON.parse(window.localStorage.getItem('accessToken')) 
    let headers = new Headers()
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
    headers.append('Authorization',accessToken);  
    dispatch(isPending())
    fetch(API_ENDPOINT_COMPANY+"/getall", {
      method: 'GET',
      headers : headers,
    }).then((res) => _.includes(successCode, res.status) && res.json())
    .then((json) =>{
       
            dispatch(FetchUserDataSuccess(json))
         
         // else if(_.includes(infoCode, json.statusCode)) {
        //   dispatch(FetchUserDataMessage(json, 'orange'))
        //   dispatch(ResetFetchUserDataSuccess())          
        // } else if(_.includes(errorCode, json.statusCode)){         
        //   dispatch(FetchUserDataMessage(json, 'red')) 
        //   dispatch(ResetFetchUserDataSuccess())
        // }
      })
      .catch((error) =>{
        //  if(_.includes(infoCode, error.statusCode)) {
        //   dispatch(FetchUserDataMessage(error, 'orange')) 
        //   dispatch(ResetFetchUserDataSuccess())
        // } else if(_.includes(errorCode, error.statusCode)){         
        //   dispatch(FetchUserDataMessage(error, 'red'))   
        //   dispatch(ResetFetchUserDataSuccess())
        // } 
      })   
    }
}

export function SearchUserData(data){
  return (dispatch) => {
    let accessToken = JSON.parse(window.localStorage.getItem('accessToken')) 
    let headers = new Headers()
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
    headers.append('Authorization',accessToken);  
    dispatch(isPending())
    fetch(API_ENDPOINT_COMPANY+"/info/"+data, {
      method: 'GET',
      headers : headers,
    }).then((res) => _.includes(successCode, res.status) && res.json())
    .then((json) =>{
            let tempJson = [json];
            dispatch(FetchUserDataSuccess(tempJson))
         
         // else if(_.includes(infoCode, json.statusCode)) {
        //   dispatch(FetchUserDataMessage(json, 'orange'))
        //   dispatch(ResetFetchUserDataSuccess())          
        // } else if(_.includes(errorCode, json.statusCode)){         
        //   dispatch(FetchUserDataMessage(json, 'red')) 
        //   dispatch(ResetFetchUserDataSuccess())
        // }
      })
      .catch((error) =>{
        //  if(_.includes(infoCode, error.statusCode)) {
        //   dispatch(FetchUserDataMessage(error, 'orange')) 
        //   dispatch(ResetFetchUserDataSuccess())
        // } else if(_.includes(errorCode, error.statusCode)){         
        //   dispatch(FetchUserDataMessage(error, 'red'))   
        //   dispatch(ResetFetchUserDataSuccess())
        // } 
      })   
    }
}
export function isPending(){
  return{
    type:'COMPANY_LIST_PENDING',
    isPending:true
  }
}
export function FetchUserDataSuccess(data){
    return{
      type:'COMPANY_LIST_SUCCESS',
      companyListData:data,
      isPending:false,     
    }
}

export function ResetFetchUserDataSuccess(data){
  return{
    type:'COMPANY_LIST_SUCCESS',
    userListData:[],
    isPending:false,     
  }
}
export function CreateUserData(data){
  data.latestStockPrice = 0;
  return (dispatch) => {
    let accessToken = JSON.parse(window.localStorage.getItem('accessToken')) 
    let headers = new Headers()
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
    headers.append('Authorization',accessToken);  
    let url = API_ENDPOINT_COMPANY + "/register";
    dispatch(isPending())   
    fetch(url, {
      method: 'POST',
      headers : headers,
      body:JSON.stringify(data)
    }).then((res) => {
      if(_.includes(successCode, res.status)){
        return res.json();
      } else {
        return res;
      }
    })
    .then((json) =>{
        if(!_.isEmpty(json)){      
          json.message = "Company registerd successfully -> Company Code:-"+json.companyCode; 
          dispatch(FetchUserDataMessage(json, 'green'))
          dispatch(FetchUserData())
          dispatch(BadRequest(json, false))   
        } else if(_.includes(infoCode, json.statusCode)) {
          dispatch(FetchUserDataMessage(json, 'orange')) 
          dispatch(BadRequest(json, true))   
        } else if(_.includes(errorCode, json.statusCode)){         
          dispatch(FetchUserDataMessage(json, 'red'))   
          dispatch(BadRequest(json, true)) 
        }
       
      })
      .catch((error) =>{
        if(_.includes(infoCode, error.statusCode)) {
          dispatch(FetchUserDataMessage(error, 'orange')) 
          dispatch(BadRequest(error, true))
        } else if(_.includes(errorCode, error.statusCode)){         
          dispatch(FetchUserDataMessage(error, 'red'))   
          dispatch(BadRequest(error, true))
        }        
      })   
    }
}

export function UpdateUserData(data, logoutNeeded, history){  
  return (dispatch) => {
    let accessToken = JSON.parse(window.localStorage.getItem('accessToken')) 
    let headers = new Headers()
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
    headers.append('Authorization','bearer '+accessToken);  
    dispatch(isPending())
    fetch(EDIT_USERS, {
      method: 'PUT',
      headers : headers,
      body:JSON.stringify(data)
    }).then((res) => res.json())
      .then((json) =>{
        if(_.includes(successCode, json.statusCode)){       
          dispatch(FetchUserDataMessage(json, 'green'))
          dispatch(FetchUserData())
          dispatch(BadRequest(json, false))   
        } else if(_.includes(infoCode, json.statusCode)) {
          dispatch(FetchUserDataMessage(json, 'orange')) 
          dispatch(BadRequest(json, true))   
        } else if(_.includes(errorCode, json.statusCode)){         
          dispatch(FetchUserDataMessage(json, 'red'))   
          dispatch(BadRequest(json, true)) 
        }
        if(logoutNeeded){
          let obj = {
            "userId" : data.userId,
            "clientId":data.clientId,
            "role":data.role		
          }
          dispatch(attempttologout(obj,history))  
        }
      })
      .catch((error) =>{
        if(_.includes(infoCode, error.statusCode)) {
          dispatch(FetchUserDataMessage(error, 'orange')) 
          dispatch(BadRequest(error, true))
        } else if(_.includes(errorCode, error.statusCode)){         
          dispatch(FetchUserDataMessage(error, 'red'))   
          dispatch(BadRequest(error, true))
        }  
      })   
    }
}
export function BadRequest(data, value){
    return{
      type:'COMPANY_BAD_REQUEST',
      badRequest:value,
      isPending:false,     
    }
   
}
export function ResetBadRequest(){
    return{
      type:'COMPANY_BAD_REQUEST',
      badRequest:null,
      isPending:false,     
      }
}
export function DeleteUserData(data, code){
  return (dispatch) => {
    let accessToken = JSON.parse(window.localStorage.getItem('accessToken')) 
    let headers = new Headers()
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
    headers.append('Authorization',accessToken); 
     let url = API_ENDPOINT_COMPANY + "/delete/"+data;
    dispatch(isPending())
    fetch(url, {
      method: 'DELETE',
      headers : headers,
    }).then((res) =>{
      if(_.includes(successCode, res.status)){
        let val = {"companyCode":data}
        return val;
      } else {
        return res;
      }
    }).then((json) =>{
        if(!_.isEmpty(json)){      
          json.message = "Company deleted successfully -> "+json.companyCode;
          dispatch(FetchUserDataMessage(json, 'green'))
          dispatch(FetchUserData())
        } else if(_.includes(infoCode, json.statusCode)) {
          dispatch(FetchUserDataMessage(json, 'orange')) 
        } else if(_.includes(errorCode, json.statusCode)){         
          dispatch(FetchUserDataMessage(json, 'red'))   
        }
      })
      .catch((error) =>{
        if(_.includes(infoCode, error.statusCode)) {
          dispatch(FetchUserDataMessage(error, 'orange')) 
          dispatch(BadRequest(error, true))
        } else if(_.includes(errorCode, error.statusCode)){         
          dispatch(FetchUserDataMessage(error, 'red'))   
          dispatch(BadRequest(error, true))
        }  
      })   
    }
}
export function FetchUserDataMessage(data, color){
  return {
      type:'COMPANY_LIST_FAILED',
      message:!_.isEmpty(data) ? data.message :'',
      isPending:false,
      showMessage:true,
      showColor:typeof color !== 'undefined' ? color: 'green'
  }
}
export function FetchUserDataMessageClose(){
    return {
        type:'COMPANY_LIST_FAILED_CLOSE',
        showMessage:false,
        message:''
    }
}