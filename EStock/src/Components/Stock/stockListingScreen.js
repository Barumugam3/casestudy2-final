import React, { Component } from "react";
import {Table,TableBody, TextField, TableCell,TableHead,TableContainer,TablePagination,TableRow,Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import _ from 'lodash';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddEditStock from './addEditStock';
import MessageShow from '../messageShow';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 
import moment from "moment";
export default class StockListingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
		input:['companySearch'],
		errors:{},
		rowsPerPage:10,
		page:0,
		startDate: new Date(),
		endDate: new Date(),
		stockListData:_.cloneDeep(props.stockListData)
		
    };
  }
  componentDidMount(){
	if(this.props.badRequest === false){
		this.handleCreate(false, '')		
	} 
  }
	componentDidUpdate(prevProps, prevState) {
		if(!_.isEqual(prevProps.stockListData,this.props.stockListData)){
			this.setState({stockListData:_.cloneDeep(this.props.stockListData)})
		}		
		if(!_.isEqual(prevProps.badRequest, this.props.badRequest) && this.props.badRequest === false){
			this.handleCreate(false, '')		
		}
		
	}
	handleChangePage = (event, newPage) => {
		this.setState({page:newPage})
	};
	handleChangeRowsPerPage = (event) => {
			this.setState({rowsPerPage:event.target.value})
		};
	handleCreate = (data, id) => {	
		this.setState({create:data, editIndex:id})
		this.props.actions.ResetBadRequest()
	}
	handleSearch = (data, id) => {
		this.setState({searchIndex:data, editIndex:id})
		const { startDate, endDate} = this.state;
		this.props.actions.SearchUserData(document.getElementById("searchCompany").value, moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'))
		this.setState({searchIndex:false, editIndex:''})
	}
	handleSearchSuccess = () => {
		const {editIndex, searchIndex} = this.state;
		this.props.actions.SearchUserData(editIndex, searchIndex)
		this.setState({searchIndex:false, editIndex:''})
	}
	handleDelete = (data, id) => {
		this.setState({deleteIndex:data, editIndex:id})
	}
	handleDeleteSucess = () => {
		const {editIndex, deleteIndex} = this.state;
		this.props.actions.DeleteUserData(editIndex, deleteIndex)
		this.setState({deleteIndex:false, editIndex:''})
	}
	handleCreateSuccess = (obj) => {
		const {stockListData, editIndex} = this.state;
		let data = _.find(stockListData, {'userId':editIndex})
		if(!_.isEmpty(data)){
		} else {
		 let request = {...obj ,'clientId':this.props.actions.clientId}
		 this.props.actions.CreateUserData(request)
		}		
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

	  handleChangeStart = (e) =>{
		this.setState({startDate:e})
		if(!_.isEqual(this.state.startDate, e)){
		  this.setState({searched:false, activePage:1, endDate:null})
		}
	  }
	  handleChangeEnd = (e) =>{
		this.setState({endDate:e})
		if(!_.isEqual(this.state.endDate, e)){
		  this.setState({searched:false, activePage:1})                  
		}
	  }
  render() {
	
	let code = Math.floor((Math.random() * 1000000) + 1).toString();
	
	const {startDate, endDate,create, input,errors, stockListData, deleteIndex, editIndex} = this.state;
	let stockListData1 = stockListData !== null && stockListData !== undefined?stockListData[0]:null;

	 return(
    <div>
	{deleteIndex === true ?
		<MessageShow message='Are you sure you want to delete ?' closeModal={()=>this.handleDelete(false, '')}   
		onCallBack={this.handleDeleteSucess} />
	: null}
	{create === true ?
	<AddEditStock code={code} data={_.find(stockListData, {'userId':editIndex})} loggedinData={this.props.loggedinData} onClose={()=>this.handleCreate(false, '')}
	onCallBack={this.handleCreateSuccess} 
	/>:
	<div>
		<div className='displayFlex'>
			<p className='ptag'>Stock Details</p>
			<TextField className='textField'
            autoFocus
            id="searchCompany"
            variant="outlined"
            type="search"
            placeholder="Enter Company Code"
            value={input['searchCompany']}
            onChange={this.handleSetValue}
            fullWidth size="small" className='SearchCompany-Width'
            />
             <p className="text-danger">{errors['searchCompany']}</p>
			<DatePicker  dateFormat={'yyyy-MM-dd'} placeholderText="Select Start Date" className='textField' selected={startDate}  onChange={this.handleChangeStart}  />
          	<DatePicker  dateFormat={'yyyy-MM-dd'} placeholderText="Select End Date"   className='textField' selected={endDate}  onChange={this.handleChangeEnd}  />
			<Button
			variant="contained"
			className='mainContentBtn float-l'
			size="medium"
			onClick={()=>this.handleSearch(true, '')}
			onCallBack={this.handleSearchSuccess} 
			startIcon={<SearchIcon />}
			>SEARCH
			</Button>
			
			<Button
			variant="contained"
			className='mainContentBtn float-r'
			size="medium"
			onClick={()=>this.handleCreate(true, '')}
			startIcon={<AddIcon />}
			>ADD STOCK
			</Button>
		</div>	
		<div className='dataTables_wrapper m-t-5'>
		<TableContainer>
			<Table aria-label="table" size="medium" >
			<TableHead>
					<TableRow>
					<TableCell id='companyCode' style={{width:'10%'}}>Company Code: {stockListData1 !== undefined && stockListData1 !== null && stockListData1.companyCode !== undefined ? stockListData1.companyCode:''}</TableCell>
					</TableRow>
					<TableRow>
					<TableCell id='max' style={{width:'10%'}}>Max Price: {stockListData1 !== undefined && stockListData1 !== null && stockListData1.maxStockPrice !== undefined ? stockListData1.maxStockPrice:''}</TableCell>
					<TableCell id='min' style={{width:'10%'}}>Min Price: {stockListData1 !== undefined && stockListData1 !== null && stockListData1.minStockPrice !== undefined ? stockListData1.minStockPrice:''}</TableCell>
					<TableCell id='avg' style={{width:'10%'}}>Avg Price: {stockListData1 !== undefined && stockListData1 !== null && stockListData1.avgStockPrice !== undefined ? stockListData1.avgStockPrice:''}</TableCell>
					</TableRow>
                      <TableRow>
                      	<TableCell id='stockPrice' style={{width:'10%'}}>Stock Price</TableCell>
                        <TableCell id='createdDate' style={{width:'10%'}}>Created Date</TableCell>                    
                      </TableRow>
                    </TableHead>
					<TableBody>
                    {				
					(stockListData1 !== null && stockListData1 !== undefined && stockListData1.stockPrices !== undefined ? stockListData1.stockPrices:[]).map((tableBody, tableIndex) =>{
                      return(
                        <TableRow key={tableIndex}>
                          	<TableCell id='stockPrice'>{tableBody.stockPrice}</TableCell>
                            <TableCell id='createdDate'>{tableBody.stockCreatedDate}</TableCell>
                        </TableRow>
                      )
                    }) }
                  </TableBody>
			</Table>			
		</TableContainer>
		</div>
	</div> }

    </div>
  )
  }
}