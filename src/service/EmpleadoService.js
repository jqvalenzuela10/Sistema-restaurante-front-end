import axios from 'axios'

export default class EmpleadoService{

 
    //``
    getAll(){

        return axios.get('http://localhost:8090/rest/users');
    }
    



    getById(id){
        return axios.get(`http://localhost:8090/rest/users/${id}`);
    }
}