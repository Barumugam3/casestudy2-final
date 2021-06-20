import React, { Component } from "react";
import {TextField, Grid, Button} from '@material-ui/core';
import _ from 'lodash';
import Select from 'react-dropdown-select';
import MessageShow from '../messageShow';

export default class AddEditStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
        input:['companyCode', 'companyName', 'companyCEO', 'companyWebsite','companyTurnOver', 'stockExchange'],
        edit:_.isEmpty(props.data) ? false : true,
        code: !_.isEmpty(props.code)?props.code:Math.floor((Math.random() * 1000000) + 1).toString(),
        errors:{}
    };
  }
  handleSetValue = (event) => {
    let input = this.state.input;
    const {errors} = this.state;
    input[event.target.id] = event.target.value;  
    if(!_.isEmpty(input[event.target.id])){
      errors[event.target.id] = ''
    } 
    this.setState({input,errors});
  }
  handleSetRole = (e) => {
    let input = this.state.input;
    input['role'] = e[0].label  
    const {errors} = this.state;
    if(!_.isEmpty(input['role'])){
      errors['role'] = ''
    } 
    this.setState({input,errors});
}
  validate(){
    let input = this.state.input;
    const {edit} = this.state;
    let errors = {};
    let isValid = true;
   /*  if (!input["companyCode"]) {
      isValid = false;
      errors["companyCode"] = "Please enter your companyCode.";
    }
   if (typeof input["companyCode"] !== "undefined") {
      if(input["companyCode"].length < 3 || input["companyCode"].length > 30){
          isValid = false;
          errors["companyCode"] = "Please enter atleast 3 - 30 charateres in companyCode.";
      }
    } */
    if (!input["companyName"]) {
      isValid = false;
      errors["companyName"] = "Please enter your companyName1.";
    }
    if (typeof input["companyName"] !== "undefined") {
      if(input["companyName"].length < 1 || input["companyName"].length > 30){
          isValid = false;
          errors["companyName"] = "Please enter valid companyName.";
      }
    }
    if (!input["companyCEO"]) {
      isValid = false;
      errors["companyCEO"] = "Please enter your companyCEO.";
    }
    if (typeof input["companyCEO"] !== "undefined") {
      if(input["companyCEO"].length < 1 || input["companyCEO"].length > 30){
          isValid = false;
          errors["companyCEO"] = "Please enter valid companyCEO.";
      }
    }
   
    if (!input["companyWebsite"]) {
      isValid = false;
      errors["companyWebsite"] = "Please enter your companyWebsite.";
    }
   
    
    
    if (!input["companyTurnOver"]) {
      isValid = false;
      errors["companyTurnOver"] = "Please enter your companyTurnOver.";
    }

    if (input["companyTurnOver"] && parseInt(input["companyTurnOver"]) <= 100000000) {

      isValid = false;
      errors["companyTurnOver"] = "Company turn over must be greater than 10Cr";
    }

    if (!input["stockExchange"]) {
      isValid = false;
      errors["stockExchange"] = "Please enter your stockExchange.";
    }


    this.setState({
      errors: errors
    });

    return isValid;
  }
  handleCreate = () => {
     let input = this.state.input;
    const {errors} = this.state;
    input['companyCode'] = document.getElementById("companyCode").value;
    this.setState({input,errors});
    if(this.validate()){
        this.props.onCallBack(this.state.input)
    }
  }
  handleCancel = (prop) =>{
    this.setState({confirmation:prop})
  }
  handleCancelSucess = () =>{
    this.props.onClose()
    this.setState({confirmation:false})
  }
	
  render() {	
    const {input, code, edit, errors, confirmation} = this.state;
    return(
    <div className='m-l-10 text-left'>   
    <p className='ptag'>{edit ? 'EDIT COMPANY' :'ADD COMPANY'}</p>
    <Grid container spacing={3} className='dataTables_wrapper m-t-0 m-l-0' style={{width:'80%'}}>
    {confirmation ?
      	<MessageShow message='Are you sure you want to discard the changes ?' closeModal={()=>this.handleCancel(false)} onCallBack={this.handleCancelSucess} />
     : null}
        
        <Grid item md={6} xs={12}>
            <div className='fw-600 text-content text-left'>Company Code<span className='text-danger'> *</span></div>
            <TextField className='textField'
            autoFocus
            id="companyCode"
            variant="outlined"
            type="companyCode"
            value={this.state.code}
            placeholder="Enter Company Code"
            fullWidth size="small"
            />
            <div className="text-danger">{errors['companyCode']}</div>
        </Grid>
        <Grid item md={6} xs={12}>
            <div className='fw-600 text-content text-left'>Company Name<span className='text-danger'> *</span></div>
            <TextField className='textField'
            autoFocus
            id="companyName"
            variant="outlined"
            type="companyName"
            value={input['companyName']}
            placeholder="Enter Last Name"
            onChange={this.handleSetValue}
            fullWidth size="small"
            />
              <div className="text-danger">{errors['companyName']}</div>
        </Grid>
        <Grid item md={6} xs={12}>
            <div className='fw-600 text-content text-left'>Company CEO<span className='text-danger'> *</span></div>
            <TextField className='textField'
            autoFocus
            id="companyCEO"
            variant="outlined"
            type="companyCEO"
            value={input['companyCEO']}
            placeholder="Enter Company CEO Name"
            onChange={this.handleSetValue}
            fullWidth size="small"
            />
              <div className="text-danger">{errors['companyCEO']}</div>
        </Grid>
        <Grid item md={6} xs={12}>
            <div className='fw-600 text-content text-left'>Company TurnOver<span className='text-danger'> *</span></div>
            <TextField className='textField'
            autoFocus
            id="companyTurnOver"
            variant="outlined"
            type="companyTurnOver"
            placeholder="Enter companyTurnOver"
            value={input['companyTurnOver']}
            onChange={this.handleSetValue}
            fullWidth size="small"
            />
             <div className="text-danger">{errors['companyTurnOver']}</div> 
        </Grid>
       <Grid item md={6} xs={12}>
            <div className='fw-600 text-content text-left'>Company Website<span className='text-danger'> *</span></div>
            <TextField className='textField'
            autoFocus
            id="companyWebsite"
            variant="outlined"
            type="companyWebsite"
            placeholder="Enter Company Website"
            value={input['companyWebsite']}
            onChange={this.handleSetValue}
            fullWidth size="small" 
            />
             <div className="text-danger">{errors['companyWebsite']}</div> 
        </Grid>
        <Grid item md={6} xs={12}>
            <div className='fw-600 text-content text-left'>Stock Exchange Name<span className='text-danger'> *</span></div>
            <TextField className='textField'
            autoFocus
            id="stockExchange"
            variant="outlined"
            type="stockExchange"
            placeholder="Enter Stock Exchange Name"
            value={input['stockExchange']}
            onChange={this.handleSetValue}
            fullWidth size="small"
            />
             <div className="text-danger">{errors['stockExchange']}</div> 
        </Grid>
        
        <Grid item md={12} className='text-center'>
        <Button
        variant="contained"
        className='mainContentBtn'
        size="medium"
        onClick={this.handleCreate}
        >{edit ? 'EDIT COMPANY' :'ADD COMPANY'}
        </Button>
        <Button 
        variant="contained"
        size="medium"
        className='closeContentBtn'
        onClick={()=>this.handleCancel(true)}
        >CANCEL
        </Button>
        </Grid>
        
    </Grid>

    </div>
  )
  }
}