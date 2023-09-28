import React, { useEffect, useState } from 'react'
import { pokemonApi } from '../api/pokemonApi';
import { PokemonFull } from '../interfaces/pokemonInterfaces';

export const usePokemon = ( id : string) => {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonFull, setPokemonFull] = useState<PokemonFull>();


    const getPokemonFull = async () => {
        try{
            const resp = await pokemonApi.get<PokemonFull>(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemonFull( resp.data );
            setIsLoading(false);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=> {
        getPokemonFull();
    }, []);

    return {
        pokemonFull,
        isLoading
    }
}
