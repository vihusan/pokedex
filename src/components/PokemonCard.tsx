import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { SimplePokemon } from '../interfaces/pokemonInterfaces'
import { FadeInImage } from './FadeInImage';
import { useNavigation } from '@react-navigation/native';
import { PokemonScreen } from '../screens/PokemonScreen';

interface Props {
    pokemon: SimplePokemon
}

const windowWidth = Dimensions.get('window').width;

export const PokemonCard = ( {pokemon} : Props) => {
    const navigation = useNavigation<any>();
    
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
                return navigation.navigate('PokemonScreen', {simplePokemon : pokemon});
            }}
        >
            <View 
                style={{
                    ...style.cardContainer,
                    width: windowWidth * 0.4,
                }}
            >
                <View>
                    <Text style={{
                        ...style.name
                    }}>
                        {pokemon.name}
                        { "\n#" + pokemon.id}
                    </Text>
                </View>
                
                <View style={
                    style.pokebolaContainer
                }>
                    <Image
                        source={ require('../../assets/img/pokebola-blanca.png')}
                        style={style.pokebola}
                    />
                </View>
                

                <FadeInImage
                    uri={pokemon.picture}
                    style={style.pokemonImage}
                />

            </View>
        </TouchableOpacity>
    )
}


const style = StyleSheet.create({
    cardContainer:{
        marginHorizontal: 10,
        backgroundColor: 'red',
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor:'#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity : 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    name:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebola:{
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: -25,
        right: -25,
        opacity:0.5
    },
    pokemonImage:{
        width: 120,
        height: 120,
        position: 'absolute',
        right:-8,
        bottom:-5
    },
    pokebolaContainer:{
        width: 100,
        height: 100,
        //backgroundColor:'blue',
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow:'hidden'
    }
});