import React, { Component } from "react";
import { Button, Grid, InputAdornment, TextField , Snackbar, FormControl, SnackbarContent } from '@material-ui/core';
import {Link} from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import _ from 'lodash';
import { connect } from 'react-redux';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import {ResetPasswordAPI, attempttologinerrorClose} from './LoginActions';
class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData:{
        schema: {
          "password": {
            "type":"password",
            "title":"Password"
          },
          "confirmPassword": {
            "type":"password",
            "title":"Confirm Password"
          }
        },
        form: [
          {
            "key": "password",
            "type":"string"
          },
          {
            "key": "confirmPassword",
            "type":"string"
          }
        ]
      },
      input:{},
      errors:{},
      submitted:false
    };
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
    event.preventDefault();   
    if(this.validate()){
      this.setState({submitted:true})
      let token = this.props.location.search
      if(!_.isEmpty(token)){
        let data = _.split(token, '?token=')
        if(!_.isEmpty(data)){
          token = data[1]
        }
      }
      let request = {...this.state.input, "token":token}
      this.props.ResetPasswordAPI(request)
    }
  } 
  validate(){
    let input = this.state.input;
    let errors = {};
    let isValid = true;
    if (!input["confirmPassword"]) {
      isValid = false;
      errors["confirmPassword"] = "Please enter your confirmPassword.";
    }
    if(typeof input["confirmPassword"] !== "undefined") {
      if(!_.isEqual(input["confirmPassword"], input['password'])){
          isValid = false;
          errors["confirmPassword"] = "Password and Confirm Password should be same";
      }
    }
    if (!input["password"]) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }
    if (typeof input["password"] !== "undefined") {
      if(input["password"].length < 8){
          isValid = false;
          errors["password"] = "Please add at least 8 charachter.";
      }
      const re = /^(?=.*\d)(?=.*[A-Z]).{6,20}$/
      if(!re.test(input["password"])){
        isValid = false;
        errors["password"] = "Please add at least one numeric digit, one uppercase.";
      }
      
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
   const {formData } = this.state;
   const {message, showMessage, attempttologinerrorClose, showColor} = this.props;

    return (
      <div className="password"> 
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={showMessage} autoHideDuration={6000} onClose={attempttologinerrorClose}
        ><SnackbarContent style={{background:showColor}} message={message} />
        </Snackbar>
       <Grid container className='login_Content'>
          <Grid item md={12} className='login_Form'>          
          <h4 className='fs-20 m-b-25 fw-600 text-danger text-center'>Reset Password ?</h4>
           <form className='fullWidth'>            
           {_.map(formData.form, (obj, keyIndex) => {
                return (               
                  <div className='m-b-20 m-t-10' key={keyIndex} ><span className='fw-600 float-l'>{formData.schema[obj.key].title}</span>
                  <FormControl fullWidth size='small' variant="outlined" >
                  <TextField 
                  id={obj.key}
                  value={this.state[obj.key]}
                  type={formData.schema[obj.key].type}   
                  onChange={this.handleChange}
                  placeholder={'Enter '+obj.key}
                  InputProps={{
                    endAdornment:(
                      <InputAdornment position="end">
                      {formData.schema[obj.key].type === 'password'?
                      <VisibilityOffIcon onClick={()=>this.handleVisible(obj.key, 'string')} />                    
                      : <VisibilityIcon onClick={()=>this.handleVisible(obj.key,'password')}/> }
                      </InputAdornment>)                   
                  }} 
                    />
                  </FormControl> 
                  <div className="text-danger">{this.state.errors[obj.key]}</div>
                  </div>                
                )
              })
              }
           </form> 
           <div className='m-t-20 m-b-10 fullWidth'>
            <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={this.handleSubmit}
            >  
            SUBMIT
            </Button>
            <Link to='/'><span className='forgot float-r'>Back to Login <TrendingFlatIcon className='dis-inline text-middle'/></span></Link>
          </div>
           <hr className='fullWidth' />
          
          </Grid>  
         
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{    
  message: state.LoginReducer.message,
  showMessage: state.LoginReducer.showMessage,    
  isPending: state.LoginReducer.isPending,
  showColor: state.LoginReducer.showColor
  }  
}

const mapDispatchToProps = (dispatch) => ({
  ResetPasswordAPI: (a) => dispatch(ResetPasswordAPI(a)),
  attempttologinerrorClose: () => dispatch(attempttologinerrorClose()),
})
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);