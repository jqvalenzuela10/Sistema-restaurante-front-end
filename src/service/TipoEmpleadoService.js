import axios from 'axios'

export default class TipoEmpleadoService{

    getAll(){

        return axios.get('http://localhost:8090/rest/tipoEmpleo');
    }
    
}