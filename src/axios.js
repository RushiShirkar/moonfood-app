
import axios from 'axios';
var token = localStorage.getItem('token');
var local_id = localStorage.getItem('local_id');
var instance1 = null;
if(token != null && local_id != null) {
  var instance1=axios.create({
    baseURL:'https://moonfood.in',
    headers:{
      'token':localStorage.getItem('token'),
      'local-id':localStorage.getItem('local_id')
    }
  });
}
else{
  var instance1=axios.create({
    baseURL:'https://moonfood.in'
  });
}
const instance = instance1;
export default instance

/*
import axios from 'axios';
var token = localStorage.getItem('token');
var local_id = localStorage.getItem('local_id');
var instance1 = null;
if(token != null && local_id != null) 
{
  var instance1=axios.create({
    baseURL:'http://localhost/moonfood-api/public',
    headers:{
      'token':localStorage.getItem('token'),
      'local-id':localStorage.getItem('local_id')
    }
  });
}
else{
  var instance1=axios.create({
    baseURL:'http://localhost/moonfood-api/public'
  });
}
const instance = instance1;
export default instance
*/