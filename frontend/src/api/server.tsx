import axios from 'axios';
import constants from '../service/constants';

export default axios.create({
    baseURL: constants.SERVER_ADDRESS
})