import axios from 'axios';
import Config from 'react-native-config';

let baseURL = '';
baseURL = Config.API_URL;

// if(processColor.env.REACT_APP_TARGET_ENV === 'development'){
//     baseURL = 'http://localhost:3000/'
// }

export default axios.create({
  baseURL,
});
