import axios from 'axios'

export default class CategoriaService{

    getAll(){

        return axios.get('http://localhost:8090/rest/categories');
    }
}