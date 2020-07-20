import axios from 'axios'

export default class SucursalService{


    //``
    getAll(){

        return axios.get('http://localhost:8090/rest/sucursal');
    }
    


}