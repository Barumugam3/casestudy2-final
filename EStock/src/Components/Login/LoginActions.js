import {LOGIN_API, LOGOUT_API}  from '../apiList';
import _ from 'lodash';
const successCode = [200, 201, 1001];
const infoCode = [404, 406, 401, 407];
const errorCode = [500, 501, 400];
export function attempttologin(obj){
  let headers = new Headers()
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');  
  headers.append('Access-Control-Allow-Origin','*');
  return (dispatch,getState) => {
    let request = {...obj}
    dispatch(attempttologinpending())
    fetch(LOGIN_API, {
      method: 'POST',
      headers : headers,
      body:JSON.stringify(request)
    }).then((res) => {
      console.log(res.headers.get('Authorization'));
      var json = {"accessToken": res.headers.get('Authorization')};
        console.log('json',json,_.includes(successCode, res.status))
        if(_.includes(successCode, res.status)){        
          dispatch(attempttologinsuccess(json))
        } else if(_.includes(infoCode, res.status)) {
          dispatch(attempttologinerror(res, 'orange'))    
        } else if(_.includes(errorCode, res.status)) {         
          dispatch(attempttologinerror(res, 'red'))    
        }        
      })
      .catch((error) =>{
        if(_.includes(successCode, error.status)){  
          dispatch(attempttologinerror(error, 'green'))
        } else if(_.includes(infoCode, error.status)) {
          dispatch(attempttologinerror(error, 'orange'))    
        } else if(_.includes(errorCode, error.status)) {         
          dispatch(attempttologinerror(error, 'red'))    
        }
      })   
    }
}
export function attempttologinpending(){
  return{
    type:'LOGIN_ACTION_PENDING',
    isPending:true
  }
}
export function attempttologinsuccess(json){
    window.localStorage.setItem('accessToken', JSON.stringify(json.accessToken))
    return{
      type:'LOGIN_ACTION_SUCCESS',
      loggedinData:json,
      accessToken:json.accessToken,
      isPending:false,     
    }
}
export function attempttologout(obj, history){   
  return  (dispatch, getState) => {    
    let accessToken =  JSON.parse(window.localStorage.getItem('accessToken'))
    console.log("accessToken",accessToken)
    let headers = new Headers()
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
    headers.append('accessToken','bearer '+accessToken);  
    if(!_.isEmpty(history)){
      history.push("/") 
    }    
    dispatch(attempttologinpending())
    fetch(LOGOUT_API, {
      method: 'DELETE',
      headers : headers,
      body:JSON.stringify(obj)
    }).then((res) => res.json())
      .then((json) =>{    
        dispatch({type:"LOG_OUT"})
        window.localStorage.clear()
      })
      .catch((error) =>{dispatch({type:"LOG_OUT"})
        window.localStorage.clear()
      })
      
    }
}
export function attempttologinerror(data, color){
  return {
      type:'AUTHENTICATION_FAILED',
      message:data.message,
      isPending:false,
      loggedinData:[],
      accessToken:'',
      showMessage:true,
      showColor:typeof color !== 'undefined' ? color: 'green'
  }
}
export function attempttologinerrorClose(){
    return {
        type:'AUTHENTICATION_FAILED_CLOSE',
        showMessage:false,
        message:'',
        
    }
}
export function toggleFullScreen(data){
  return{
    type:'TOGGLE_FULL_SCREEN',
    fullScreen:data
  }
}
