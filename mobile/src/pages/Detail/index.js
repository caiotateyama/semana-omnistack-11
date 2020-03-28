import React from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
//useRoute serve para pegar info específica da pág atual da aplicação
import { View, Image , Text, TouchableOpacity, Linking} from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();
    
    const product = route.params.product;
    const message = `Olá ${product.name}, estou entrando em contato, pois gostaria de ajudar no caso "${product.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(product.value)}.`

    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${product.title}`,
            recipients: ['caio@tat.com.br'],
            body: message
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${product.whatsapp}&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

               <TouchableOpacity onPress={navigateBack}>
                <Feather name={"arrow-left"} size={28} color="#E02041"/>
                </TouchableOpacity> 
            </View>

            <View style={styles.product}>
                <Text style={[styles.productProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.productValue}>{product.name} de {product.city}/{product.uf}</Text>

                <Text style={styles.productProperty}>CASO:</Text>
                <Text style={styles.productValue}>{product.title}</Text>

                <Text style={styles.productProperty}>VALOR:</Text>
                <Text style={styles.productValue}>
                    {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(product.value)}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}> Salve o dia!</Text>
                <Text style={styles.heroTitle}> Seja o herói desse caso!</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View> 
    );
}