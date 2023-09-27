import React from 'react'
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { style } from '../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePokemonPaginated } from '../hooks/usePokemonPaginated'
import { FlatList } from 'react-native-gesture-handler'
import { PokemonCard } from '../components/PokemonCard'

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {simplePokemonList, loadPokemons} = usePokemonPaginated();

  return (
    <>
      <Image 
        source={ require('../../assets/img/pokebola.png')}
        style={ style.pokebolaBackgroug }
      />

      
      <View style={{
          alignItems: 'center'
      }}>
        <FlatList 
          ListHeaderComponent={(
            <Text style={{
              ... style.title,
              ... style.globalMargin,
              marginTop: top + 20,
              marginBottom: 20
            }}>
              Pokedex
            </Text>
          )}
          data = { simplePokemonList}
          keyExtractor={(pokemon) => pokemon.id}
          numColumns={2}
          renderItem={ ({item}) => (
            <PokemonCard pokemon={item}/>
          )}
          onEndReached={ loadPokemons } // infinite scroll
          onEndReachedThreshold={0.4}

          ListFooterComponent={
            <ActivityIndicator
              style={{height: 20}}
              size={20}
              color='grey'
            />
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  )
}
