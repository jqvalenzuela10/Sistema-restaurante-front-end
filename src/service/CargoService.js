import axios from 'axios'

export default class CargoService{

    getAll(){

        return axios.get('http://localhost:8090/rest/cargo');
    }

}