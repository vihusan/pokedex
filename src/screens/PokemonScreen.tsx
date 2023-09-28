import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootStackParamas } from '../navigation/MainNavigator'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParamas,'PokemonScreen'>{};

export const PokemonScreen = ( {route, navigation}: Props) => {
    const { simplePokemon } = route.params;
    const {id, name, picture} = simplePokemon;
    const {top} = useSafeAreaInsets();
    const {pokemonFull, isLoading} =  usePokemon(id);

    return (
      <View style={{flex: 1}}>

        {/* Header container */}
        <View style={{...style.headerContainer}}>

          {/* back button */}
          <TouchableOpacity
            style={{
              ...style.backButton,
              top: top + 5
            }}
            onPress={()=> navigation.pop()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back-outline" color="white" size={30}/>
          </TouchableOpacity>

          {/* Nombre del pokemon */}
          <Text 
            style={{
              ...style.pokemonName,
              top: top + 35
            }}
          > 
            {name + '\n'} #{id} 
          </Text>
          
          <Image 
            source={require('../../assets/img/pokebola-blanca.png')}
            style={{...style.pokeball}}
          />

          <FadeInImage
            uri={picture}
            style={{...style.pokemonImage}}
          />
        </View>

        {/* Detalles y loading */}
        <View style={{
          ...style.activityIndicator
        }}>
          {
            (isLoading) 
              ? <ActivityIndicator color={'#DA7766'} size={50} /> 
              : <PokemonDetails pokemon={pokemonFull!}/>
          }
        </View>
      </View>
    )
}

const style = StyleSheet.create({
  headerContainer:{
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: '#DA7766'
  },
  backButton: {
    position: 'absolute',
    left: 30
  },
  pokemonName:{
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 30
  },
  pokeball : {
    width:220,
    height: 220,
    bottom: -50,
    opacity: 0.7
  },
  pokemonImage:{
    width:250,
    height:250,
    position:'absolute',
    bottom:-15
  },
  activityIndicator:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
