import React, { Component } from "react";
import {Table,TableBody, TextField, TableCell,TableHead,TableContainer,TablePagination,TableRow,Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import _ from 'lodash';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddEditCompany from './addEditCompany';
import MessageShow from '../messageShow';
export default class CompanyListingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
		input:['companySearch'],
		errors:{},
		rowsPerPage:10,
		page:0,
		companyListData:_.cloneDeep(props.companyListData)
		
    };
  }
  componentDidMount(){
	if(this.props.badRequest === false){
		this.handleCreate(false, '')		
	} 
  }
	componentDidUpdate(prevProps, prevState) {
		if(!_.isEqual(prevProps.companyListData,this.props.companyListData)){
			this.setState({companyListData:_.cloneDeep(this.props.companyListData)})
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
		const {editIndex, searchIndex} = this.state;
		this.props.actions.SearchUserData(document.getElementById("searchCompany").value)
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
		const {companyListData, editIndex} = this.state;
		let data = _.find(companyListData, {'userId':editIndex})
		if(!_.isEmpty(data)){
			let request={
				"firstName" :obj.firstName,
				"lastName" : obj.lastName,
				"email":obj.email,
				"userName":obj.userName,
				"role":obj.role,
				"clientId" :data.clientId,
				"userId": data.userId
			}
			this.props.actions.UpdateUserData(request,_.isEqual(this.props.loggedinData.userId,editIndex),this.props.history)
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
  render() {
	
	let code = Math.floor((Math.random() * 1000000) + 1).toString();
	
	const {rowsPerPage, page, create, input,errors, companyListData, deleteIndex, editIndex} = this.state;
  return(
    <div>
	{deleteIndex === true ?
		<MessageShow message='Are you sure you want to delete ?' closeModal={()=>this.handleDelete(false, '')}   
		onCallBack={this.handleDeleteSucess} />
	: null}
	{create === true ?
	<AddEditCompany code={code} data={_.find(companyListData, {'userId':editIndex})} loggedinData={this.props.loggedinData} onClose={()=>this.handleCreate(false, '')}
	onCallBack={this.handleCreateSuccess} 
	/>:
	<div>
		<div className='displayFlex'>
			<p className='ptag'>Company List</p>
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
			>ADD COMPANY
			</Button>
		</div>	
		<div className='dataTables_wrapper m-t-5'>
		<TableContainer>
			<Table aria-label="table" size="medium" >
			<TableHead>
                      <TableRow>
                      <TableCell id='company' style={{width:'10%'}}>Company Name</TableCell>
                        <TableCell id='companyCode' style={{width:'10%'}}>Company Code</TableCell>
                        <TableCell id='ceo' style={{width:'10%'}}>Company CEO</TableCell>
                        <TableCell id='turnover' style={{width:'10%'}}>Company Turn Over</TableCell>
                        <TableCell id='website' style={{width:'10%'}}>Company Website</TableCell>		
                        <TableCell id='exchange' style={{width:'15%'}}>Stock Exchange Company In</TableCell>	
                        <TableCell id='stockPrice' style={{width:'15%'}}>Latest Stock Price</TableCell>	
						<TableCell id='option' style={{width:'15%'}}>Option</TableCell>	
	
                      </TableRow>
                    </TableHead>
					<TableBody>
                    {(rowsPerPage > 0
                      ? companyListData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : companyListData
                      ).map((tableBody, tableIndex) =>{
                      return(
                        <TableRow key={tableIndex}>
                          <TableCell id='company'>{tableBody.companyName}</TableCell>
                            <TableCell id='companycode'>{tableBody.companyCode}</TableCell>
                            <TableCell id='companyCEO'>{tableBody.companyCEO}</TableCell>
                            <TableCell id='CompanyTurnOver'>{tableBody.companyTurnOver}</TableCell>
                            <TableCell id='companyWebsite'>{tableBody.companyWebsite}</TableCell>									
                            <TableCell id='stockExchange'>{tableBody.stockExchange}</TableCell> 
                            <TableCell id='lateststockprice'>{tableBody.latestStockPrice}</TableCell>
							
							<TableCell id='option'>
								<Button
								variant="contained"
								className='mainContentBtn float-r'
								size="medium"
								onClick={()=>this.handleDelete(true,tableBody.companyCode)}
								startIcon={<DeleteIcon />}
								>DELETE
								</Button> 
							</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
			</Table>
			<TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={companyListData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />	
		</TableContainer>
		</div>
	</div> }

    </div>
  )
  }
}