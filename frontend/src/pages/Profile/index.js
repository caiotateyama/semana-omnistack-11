import React, {useState, useEffect} from 'react'; //useEffect serve para disparar uma função em algum determinado momento do componente
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import './styles.css';

import api from '../../services/api';

export default function Profile() {
    const [products, setProducts] = useState([]);
    
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setProducts(response.data);
        })
    }, [ongId]);

    async function handleDeleteProduct(id) {
        try {
            await api.delete(`products/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setProducts(products.filter(product => product.id !== id))
        } catch (err) {
            alert('Erro ao deletar o caso, tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear(); //limpa todo o localStorage
    
        history.push('/')
    }

    return (
        <div className="profile-container"> 
            <header>
            <img src={logoImg} alt="Be the Hero"/>
    <span>Bem vinda, {ongName}</span>

            <Link className="button" to="/products/new">Cadastrar novo caso</Link>
            <button onClick={handleLogout} type="button">
                <FiPower size={18} color="E02041" />

            </button>
            </header>  

            <h1>Casos cadastrados</h1>

            <ul>
               {products.map(product => (
                    <li key ={product.id}> 
                    <strong>CASO:</strong>
                    <p>{product.title}</p>

                    <strong>Descrição:</strong>
                    <p>{product.description}</p>

                    <strong>Valor:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(product.value)}</p>

                    <button onClick={() => handleDeleteProduct(product.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />

                    </button>
                </li>
               ))}
            </ul> 
        </div>
       
    )
}