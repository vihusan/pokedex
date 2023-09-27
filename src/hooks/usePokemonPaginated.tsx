import { useEffect, useRef, useState } from "react";
import { pokemonApi } from "../api/pokemonApi";
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

    const [isLoading, setIsLoading] = useState(true);
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);

    const loadPokemons = async () => {
        try {

            const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
            nextPageUrl.current = resp.data.next;
            
            mapPokemon(resp.data.results);
        } catch ( error ){
            console.log("Error al consumir pokemon api: " + error);
        }
    }

    const mapPokemon = ( pokemonList : Result []) => {
        const newPokemonList : SimplePokemon [] = pokemonList.map( ({name, url} : Result) =>{
             const urlParts = url.split('/');
             const id = urlParts[ urlParts.length - 2];
             const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

             return {id, name, picture};
        });

        setIsLoading(false);
        setSimplePokemonList([...simplePokemonList,...newPokemonList]);
    }

    useEffect( ()=> {
        loadPokemons();
    },[]);

    return {
        isLoading,
        simplePokemonList,
        loadPokemons 
    }
}
