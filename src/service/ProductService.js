import axios from 'axios'

export default class ProductService{


    getAll(){

        return axios.get('http://localhost:8090/rest/products');
    }
    
    postProduct(){
        return axios.post('http://localhost:8090/rest/products')
    }

}