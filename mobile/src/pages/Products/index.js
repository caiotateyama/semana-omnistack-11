import React, { useEffect, useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { View, FlatList ,Image, Text, TouchableOpacity} from 'react-native'; //TouchableOpacity torna qualquer coisa clicável e quando clica diminui a opacidade da coisa
//sempre que for utilizar lista usar FlatList

import api from '../../services/api'

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    
    const navigation = useNavigation(); //Parecido com o useHistory() da web

    function navigateToDetail(product) {
        navigation.navigate('Detail', {product});
    }

    async function loadProducts() {
        if( loading) {
            return;
        }
        if (total > 0 && products.length === total) {
            return;
        }

        setLoading(true);
        
        const response = await api.get('products', {
            params: {
                page}
            });

        setProducts([... products, ...response.data]); //anexa um vetor ao outra, a páginas não é atualizada, somente entram mais produtos
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>
           
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
            
            <FlatList 
                data={products}
                style={styles.productList}
                keyExtractor={product => String(product.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadProducts} //função que dispara uma ordem automática quando o usuário chega no final da lista
                //onEndReachedThreshold={0.1} essa propriedade fala quando % o usuário deve estar para carregar os próximos itens, vem em porcentagem 0.1 0.2
                renderItem={({item: product}) => (
                    <View style={styles.product}>
                    <Text style={styles.productProperty}>ONG:</Text>
                <Text style={styles.productValue}>{product.name}</Text>

                    <Text style={styles.productProperty}>CASO:</Text>
                <Text style={styles.productValue}>{product.title}</Text>

                    <Text style={styles.productProperty}>VALOR:</Text>
                <Text style={styles.productValue}>
                    {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(product.value)}
                </Text>
                
                    <TouchableOpacity
                     style={styles.detailsButton}
                     onPress={() => navigateToDetail(product)}
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"/>

                    </TouchableOpacity>

                    </View>
                )}
            />
        </View>
    );
}
