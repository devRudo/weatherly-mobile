import axios from 'axios';

let baseURL = '';
baseURL = 'http://192.168.1.8:3000/';

// if(processColor.env.REACT_APP_TARGET_ENV === 'development'){
//     baseURL = 'http://localhost:3000/'
// }

export default axios.create({
  baseURL,
});
