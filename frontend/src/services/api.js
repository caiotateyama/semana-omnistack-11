//services é todo tipo de arquivo que vai prover algum tipo de integração como um serviço externo
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export default api;