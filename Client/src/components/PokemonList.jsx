import React, { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import { CardPokemon } from './CardPokemon';
import { Loader } from './Loader';

export const PokemonList = () => {
	const { loading, pokemonsFilter } =
		useContext(PokemonContext);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className='card-list-pokemon container'>
							{pokemonsFilter.map(pokemon => (
								<CardPokemon pokemon={pokemon} key={pokemon.id} />
							))}
				</div>
			)}
		</>
	);
};