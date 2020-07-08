import Axios from 'axios';
import { Environment } from '../environment';
import { User } from '../../model';
import { getItemOnStorage } from '../../helpers';

const Client = Axios.create({
  baseURL: Environment.apiUri
})

Client.interceptors.request.use( config => {
  const user: User | null = getItemOnStorage('user');
  if ( user ) {
    config.headers['x-username'] = user.username;
  }
  return config;
})

export default Client;