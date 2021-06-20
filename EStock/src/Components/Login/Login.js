import React, { Component } from "react";
import { Button, InputAdornment, FormControl, OutlinedInput,Snackbar, SnackbarContent } from '@material-ui/core';
import Select from 'react-dropdown-select';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import _ from 'lodash';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData:{
        schema: {
          "username": {
            "type":"string",
            "title":"username"
          },
          "password": {
            "type":"password",
            "title":"Password"
          }
        },
        form: [
          {
            "key": "username",
            "type":"string",
          },
          {
            "key": "password",
            "type":"string"
          }         
        ]
      },
      input:{"username":'',"password":""},
      errors:{},
      showIcon:false
    };
  }
  componentDidUpdate () {  
    if(!_.isEmpty(this.props.loggedinData) && !_.isEmpty(this.props.accessToken)){
      this.signIN()
    }      
  }
  handleChange = event => {
    let input = this.state.input;
    const {errors} = this.state;
    input[event.target.id] = event.target.value;  
    if(!_.isEmpty(input[event.target.id])){
      errors[event.target.id] = ''
    } 
    this.setState({input,errors});
  }
  handleSubmit = event => {
    const {input} = this.state
    let request = {
     // "apikey": "5542578fe63ed66f179766924e4932ee_42789_7aa541891179f227c8e4eff54",
    //  "username": "skpraveenkumar1301@gmail.com",
    // "password": "sriju@123A",
      "userName":input.username,
      "password":input.password,
     // "channel_type": "",
     // "code": "",
     // "token": "",
     // "channel_id": "",
     // "two_factor_userid": ""
    }
    event.preventDefault();   
   // if(this.validate()){      
      this.setState({clicked:true})
      //this.signIN()
      this.props.attempttologin(request)
    //}
    
  } 
  signIN = () =>{    
    if(!_.isEmpty(_.cloneDeep(this.props.loggedinData)) && this.state.clicked === true){
      this.props.history.push('/Dashboard/Company')
    }
  }
  validate(){
    let input = this.state.input;
    let errors = {};
    let isValid = true;
    if (!input["userName"]) {
      isValid = false;
      errors["userName"] = "Please enter your userName.";
    }

    if (!input["password"]) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }
    this.setState({
      errors: errors
    });

    return isValid;
  }
  handleVisible = (key, data) =>{
    const {formData} = this.state
    if(!_.isEmpty(formData.schema[key])){
      formData.schema[key].type = data
    }
    this.setState({formData})
  }
  componentWillUnmount(){
    this.props.attempttologinerrorClose()
  }  
  render() {
   const {formData, input} = this.state;
   const {message, showMessage, attempttologinerrorClose, showColor} = this.props;
    return (
      <div className="login_Wrapper"> 
      <Snackbar
	  	anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		  open={showMessage} autoHideDuration={6000} onClose={attempttologinerrorClose}
      ><SnackbarContent style={{background:showColor}} message={message} />
      </Snackbar>
       <div container className='login_Content'>       
          <div className='login_Form'>
      
          <p className='fw-600 fs-25'>LOGIN</p>
           <form className='fullWidth'>            
           {_.map(formData.form, (obj, index) => {
                return (               
                  (obj.type === 'string') ?
                  <div className='m-b-15 m-t-10' key={index}><span className='fw-600 float-l'>{formData.schema[obj.key].title}</span>
                  <FormControl fullWidth size='small' variant="outlined" >
                  <OutlinedInput
                  id={obj.key}
                  value={input[obj.key]}
                  type={formData.schema[obj.key].type}    
                  onChange={this.handleChange}
                  placeholder={'Enter '+obj.key}
                  startAdornment={
                    <InputAdornment position="start">
                    {(obj.key === 'password') ? <PersonIcon /> : <LockIcon /> }
                    </InputAdornment>}
                   endAdornment ={obj.key === 'password' ?
                   <InputAdornment position="end">
                   {formData.schema[obj.key].type === 'password'?
                   <VisibilityOffIcon onClick={()=>this.handleVisible(obj.key, 'string')} />                    
                   : <VisibilityIcon onClick={()=>this.handleVisible(obj.key,'password')}/> }
                   </InputAdornment> : null}  
                  />
                    
                  </FormControl> 
                  <div className="text-danger">{this.state.errors[obj.key]}</div>
                  </div>   :                  
                  <div className='m-b-15' key={index}><span className='fw-600 float-l'>{formData.schema[obj.key].title}</span>
                    <Select
                      options={[{'label':'admin'},{'label':'user'}]}
                      id='role'
                      values={input[obj.key]}
                      required
                      placeholder="Select Role"
                      labelField={'label'}
                      valueField={'label'}   
                      className='m-t-5 text-left'       
                      onChange={this.handleSetRole}         
                      closeOnSelect={true}
                      dropdownPosition="bottom"
                      dropdownHeight='187px'
                      />
                   <div className="text-danger">{this.state.errors[obj.key]}</div>
                  </div>      
                )
              })
              }
           </form> 
           <div className='fullWidth m-t-20 m-b-10'>
            <Button
            style={{'borderRadius':'20px'}}
            fullWidth
            variant="contained"
            color="primary"
            size="large"           
            onClick={this.handleSubmit}
            >  
          SIGN IN
            </Button>
          </div>
           <hr className='fullWidth' />          
          </div>  
         
        </div>
      </div>
    );
  }
}
