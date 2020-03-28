import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api'

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewProduct() {
    const [title, setTitle] = useState(''); //useState('') = começa sem nenhum valor
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();
    
    const ongId = localStorage.getItem('ongId');

    async function handleNewProduct(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('products', data, {
                headers: {
                    Authorization: ongId,
                }
            })

            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }




    return (
        <div className="new-product-container">
            <div className="content">
                <section>
                <img src={logoImg} alt="Be the Hero"/>

                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolve-lô.</p>
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Voltar para home
                </Link>
                </section>

                <form onSubmit={handleNewProduct}>
                <input 
                    placeholder="Título do caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)} 
                />
                <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}  
                />
                <input 
                    placeholder="Valor em reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}  
                />
                
                <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}