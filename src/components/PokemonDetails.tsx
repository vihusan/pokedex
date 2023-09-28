import React from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { FlatList } from 'react-native-gesture-handler';
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon : PokemonFull
}

export const PokemonDetails = ({pokemon} : Props) => {
    
    return (
    <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{ ...StyleSheet.absoluteFillObject}} >
        {/* types */}
        <View style={{...style.container}}>
            <Text style={style.title}>Type</Text>
            <View style={{flexDirection: 'row', marginTop:5}}>
                {
                    pokemon.types.map(({type})=>{
                        return (
                            <Text style={{...style.regularText, marginRight: 10}} key={type.name}>  
                                {type.name}
                            </Text>
                        )
                    })
                }
            </View>
        </View>
        
        {/* Peso */}
        <View style={{...style.container}}>
            <Text style={style.title}>Peso</Text>
            <Text style={style.regularText}>{pokemon.weight} kg</Text>
        </View>

        {/* sprites */}
        <View style={{...style.container}}>
            <Text style={{...style.title}}> Sprites </Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <FadeInImage
                    uri={pokemon.sprites.front_default}
                    style={style.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.back_default}
                    style={style.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.front_shiny}
                    style={style.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.back_shiny}
                    style={style.basicSprite}
                />
            </ScrollView>
        </View>

         {/* Habilidades */}
         <View style={{...style.container}}>
            <Text style={style.title}>Habilidades Base</Text>
            <View style={{flexDirection: 'row', marginTop:5}}>
                {
                    pokemon.abilities.map(({ability})=>{
                        return (
                            <Text style={{...style.regularText, marginRight: 10}} 
                                key={ability.name}>  
                                {ability.name}
                            </Text>
                        )
                    })
                }
            </View>
        </View>

        {/* Movimiento */}
        <View style={{...style.container}}>
            <Text style={style.title}>Movimientos</Text>
            <View style={{flexWrap: 'wrap', flexDirection: 'row', marginTop:5}}>
                {
                    pokemon.moves.map(({move})=>{
                        return (
                            <Text style={{...style.regularText, marginRight: 10}} 
                                key={move.name}>  
                                {move.name}
                            </Text>
                        )
                    })
                }
            </View>
        </View>

        {/* Stats */}
        <View style={{...style.container}}>
            <Text style={style.title}>Stast</Text>
            <View style={{flexWrap: 'wrap', marginTop:5}}>
                <View>
                {
                    pokemon.stats.map((statFull, i)=>{
                        const {stat, base_stat} = statFull;
                        return (
                            <View
                                style={{
                                    flexDirection: 'row'
                                }}
                            >
                                <Text style={{...style.regularText, marginRight: 10, width: 180}} 
                                    key={stat.name}>  
                                    {stat.name} 
                                </Text>

                                <Text style={{...style.regularText, marginRight: 10, fontWeight: 'bold'}} 
                                    key={base_stat}>  
                                    {base_stat} 
                                </Text>
                            </View>
                        )
                    })
                }
                </View>
            </View>
        </View>

        {/* Sprite Final */}
        <View style={{
            marginBottom: 20,
            alignItems:'center'
        }}>
            <FadeInImage
                uri={pokemon.sprites.front_default}
                style={style.basicSprite}
            />
        </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
    container:{
        marginHorizontal:20,
        marginTop: 15
    },
    title:{
        fontSize:22,
        fontWeight:'bold'
    },
    regularText:{
        fontSize: 19,
    },
    basicSprite:{
        width:100,
        height:100
    }
});