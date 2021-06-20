import React, { Component } from "react";
import {Grid, Snackbar, SnackbarContent} from '@material-ui/core';
import _ from 'lodash';
import { Link } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import man from '../../Resources/images/man.jpg';
import users from '../../Resources/images/users.png';
import tickets from '../../Resources/images/tickets.png';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MessageShow from '../messageShow';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
			id: "",
			password: "",
			passwordtype:false,
			module:JSON.parse(window.localStorage.getItem('menuOptions')),
			toggle:false
    };
  }

  sideNav = () => {
		const {fullScreen,primaryColor} = this.props;
		const {module} = this.state;
		let className ='';
		_.map(module, (obj) => {
			if(this.props.location.pathname === obj.path){
				className = obj.id
			}
		})	
		let primaryValue = {
			backgroundColor:primaryColor
		}
		return (
			<div style={primaryValue} className={fullScreen === true ? 'side_nav' : 'side_nav _small'}>
				<ul className='sideDefination'>
				<div className='rowInitial'>
					E-STOCK APPLICATION
				</div>
				{_.map(module, (obj, i) => {       
				return (
				<div key={i}>
					<Link to={obj.path} key={i}>
					<li  id={obj.id} className={(className === obj.id) ? 'active'  :''}>
					<span className='imgspanWidth'><img alt='icon' src={obj.icon} width={fullScreen === true ? obj.width : obj.maxWidth} className={fullScreen === true ? '' : 'm-r-5'}/></span> 
					{fullScreen === true ? <span>{obj.moduleName}<ChevronRightIcon className='svgIcon m-t-8 float-r'  /></span> :''}
					</li>			  
					</Link> 
				</div>
				)
				}) }
				</ul>     
			</div>
		)   
  }
  handleSmall = () => {
	  this.props.toggleFullScreen(this.props.fullScreen ? false : true)
  }
  handleClick = (event) => {
		this.setState({open:event.currentTarget})
  };
  handleClose = () => {
		this.setState({open:false})
  };
  handleLogout = () =>{
		this.setState({loggedOut:true})	  
  }
  handleLogoutClose = () =>{
		this.setState({loggedOut:false})
  }
  handleLogoutSuccess = () =>{	 
	this.props.attempttologout({}, this.props.history)
 }
  componentWillUnmount(){
    this.props.attempttologinerrorClose()
  } 
 	render(){ 
	 const {fullScreen, logshowMessage,logmessage, showColor} = this.props;
	 const {open, loggedOut} = this.state;
	 
    return (
      <div> 
				{loggedOut ? <MessageShow message='Are you sure you want to logout the application ?' 
				closeModal={this.handleLogoutClose} onCallBack={this.handleLogoutSuccess} /> : null} 
				<div className={fullScreen?'header':'header smallLeft'}>
				<div className='text-left'>
					{/* <MenuIcon className='svgIcon menuIcon m-l-10' fontSize='default'  style={primaryColorVal}   onClick={this.handleSmall} />
					<span className='fs-18 text-middle' style={primaryColorVal}></span> */}
		

				</div>
				<div className='rowEnd'>
					<span>
						<IconButton
						aria-label="more"
						aria-controls="long-menu"
						aria-haspopup="true"
						className='verticalEllipsis'
						onClick={this.handleClick}
						>
						<MoreVertIcon />
					</IconButton>
					<Menu
					id="long-menu"
					anchorEl={open}
					keepMounted
					open={Boolean(open)}
					onClose={this.handleClose}
					style={{top:'32px'}}>  
						<MenuItem onClick={this.handleClose}>
							<div className='fullWidth fs-14 text-a'>
							<img src={man} alt='PROFILE' width='35px' height='30px' className='text-middle'/>	
							<span className='m-l-8 text-transformCap userName'>Admin</span>
							</div>
						</MenuItem>  
						<MenuItem onClick={this.handleClose}>
							<div className='fullWidth fs-14 text-a' onClick={this.handleLogout}>
							<ExitToAppIcon fontSize={'default'} className={'svgIcon m-l-5'}  />	
							<span className='m-l-11'>Logout</span> 
							</div>
						</MenuItem>   			
					</Menu>
				</span>
				</div>
			</div> 
				<Snackbar anchorOrigin={{vertical:'bottom',horizontal: 'right'}} open={logshowMessage} 
					autoHideDuration={6000} onClose={this.props.attempttologinerrorClose} >
					<SnackbarContent style={{background:showColor}} message={logmessage} />
				</Snackbar>
				<Grid container spacing={0}>
				<Grid item xs={2}>{this.sideNav()}</Grid>
			</Grid>  
      </div>
    );
  }
}
