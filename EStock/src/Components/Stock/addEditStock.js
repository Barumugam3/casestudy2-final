import React, { Component } from "react";
import {TextField, Grid, Button} from '@material-ui/core';
import _ from 'lodash';
import Select from 'react-dropdown-select';
import MessageShow from '../messageShow';

export default class AddEditStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
        input:['companyCode', 'stockId', 'stockPrice', 'stockCreatedDate'],
        edit:_.isEmpty(props.data) ? false : true,
        stockId: Math.floor((Math.random() * 100000000) + 1).toString(),
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
  
  validate(){
    let input = this.state.input;
    const {edit} = this.state;
    let errors = {};
    let isValid = true;
     if (!input["companyCode"]) {
      isValid = false;
      errors["companyCode"] = "Please enter your companyCode.";
    }

    if (typeof input["companyCode"] !== "undefined") {
      if(input["companyCode"].length < 6 ){
          isValid = false;
          errors["companyCode"] = "Please enter valid companyCode.";
      }
    }
   
    if (!input["stockPrice"]) {
      isValid = false;
      errors["stockPrice"] = "Please enter your stockPrice.";
    }
    if (typeof input["stockPrice"] !== "undefined") {
      if(input["stockPrice"].length < 1 || input["stockPrice"].length > 30){
          isValid = false;
          errors["stockPrice"] = "Please enter valid stockPrice.";
      }
    }
    
    this.setState({
      errors: errors
    });

    return isValid;
  }
  handleCreate = () => {
     let input = this.state.input;
    const {errors} = this.state;
    input['stockId'] = document.getElementById("stockId").value;
    input['stockCreatedDate'] =  new Date();
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
            <div className='fw-600 text-content text-left'>Stock Id<span className='text-danger'> *</span></div>
            <TextField className='textField'
            autoFocus
            id="stockId"
            variant="outlined"
            type="stockId"
            value={this.state.stockId}
            placeholder="Enter stockId Code"
            fullWidth size="small"
            />
            <div className="text-danger">{errors['stockId']}</div>
        </Grid>
        <Grid item md={6} xs={12}>
            <div className='fw-600 text-content text-left'>Company Code<span className='text-danger'> *</span></div>
            <TextField className='textField'
            autoFocus
            id="companyCode"
            variant="outlined"
            type="companyCode"
            value={input['companyCode']}
            onChange={this.handleSetValue}
            placeholder="Enter Company Code"
            fullWidth size="small"
            />
            <div className="text-danger">{errors['companyCode']}</div>
        </Grid>
       
        <Grid item md={6} xs={12}>
            <div className='fw-600 text-content text-left'>Stock Price<span className='text-danger'> *</span></div>
            <TextField className='textField'
            autoFocus
            id="stockPrice"
            variant="outlined"
            type="stockPrice"
            placeholder="Enter Stock Price"
            value={input['stockPrice']}
            onChange={this.handleSetValue}
            fullWidth size="small"
            />
             <div className="text-danger">{errors['stockPrice']}</div> 
        </Grid>
              
        <Grid item md={12} className='text-center'>
        <Button
        variant="contained"
        className='mainContentBtn'
        size="medium"
        onClick={this.handleCreate}
        >{edit ? 'EDIT STOCK' :'ADD STOCK'}
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