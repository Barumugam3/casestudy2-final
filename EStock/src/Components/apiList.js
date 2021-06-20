/** LOGIN */
export const API_ENDPOINT_COMPANY = 'http://localhost:8092/company-service/api/v1.0/market/company';
export const API_ENDPOINT_STOCK_COMMAND = 'http://localhost:8092/stock-command-service/api/v1.0/market/stock';
export const API_ENDPOINT_STOCK_QUERY = 'http://localhost:8092/stock-query-service/api/v1.0/market/stock';
    
export const HOST_PORT = 'http://localhost:8092'
export const API_URL = HOST_PORT + '/chat/api'; 
export const LOGIN_API = HOST_PORT +'/login'; 
export const LOGOUT_API = API_URL+ '/logout';
export const CHAT_HISTORY = API_URL + '/chat';
export const CHAT_SEND_MESSAGE = API_URL + '/chat';
export const TICKET_DETAILS = API_URL + '/tickets';
export const TICKET_HISTORY = API_URL + '/tickets/';

export const WEB_SOCKET_URL = HOST_PORT + '/chat/ws?Authorization='

export const CHAT_UPLOAD = API_URL + '/upload'; 
export const CLOSE_TICKET = API_URL + '/ticket';
export const AGENT_LIST = API_URL + '/agents'; 

export const USERS_LIST = API_URL + '/'; 
export const CREATE_USERS = API_URL + '/';
export const EDIT_USERS = API_URL + '/'; 
export const DELETE_USERS = API_URL + '/'; 
