import React, { Component } from "react";
import {Snackbar, SnackbarContent} from '@material-ui/core';
import CompanyListingScreen from './companyListingScreen';

export default class UserList extends Component {
	componentDidMount(){
	 this.props.FetchUserData()
	}
	componentWillUnmount(){
		this.props.FetchUserDataMessageClose()
	}
		
 	render() {
	const {fullScreen, message, showMessage,loggedinData, companyListData, FetchUserDataMessageClose,history, showColor, badRequest} = this.props;
	return (
		<div  className={fullScreen === true ? 'Content' : 'Content ContentSmall'}> 
		<CompanyListingScreen companyListData={companyListData} actions={this.props} 
		loggedinData={loggedinData} badRequest={badRequest} history={history}/>
		<Snackbar
		anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		open={showMessage} autoHideDuration={6000} onClose={FetchUserDataMessageClose}>
		<SnackbarContent style={{background:showColor}} message={message} />
		</Snackbar>
		</div>
    );
  }
}
