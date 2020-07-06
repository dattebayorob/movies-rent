import Axios from 'axios';
import { Environment } from '../environment';

const Client = Axios.create({
  baseURL: Environment.apiUri
})

export default Client;