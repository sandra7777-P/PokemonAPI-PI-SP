import { useEffect, useMemo, useState } from 'react';
import { useForm } from '../hook/useForm';
import { PokemonContext } from './PokemonContext';

export const PokemonProvider = ({ children }) => {
	const [globalPokemons, setGlobalPokemons] = useState([]);
	const [offset, setOffset] = useState(0);
	const [filteredPokemons, setfilteredPokemons] = useState([]);

	// Utilizar CustomHook - useForm
	const { valueSearch, onInputChange, onResetForm } = useForm({
		valueSearch: '',
	});

	// Estados para la aplicación simples
	const [loading, setLoading] = useState(true);
	const [active, setActive] = useState(false);

	// Llamar todos los pokemones
	const getGlobalPokemons = async () => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(
			`${baseURL}pokemon?limit=200&offset=0`
		);
		const data = await res.json();
		
		const promises = data.results.map(async pokemon => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		});
		const results = await Promise.all(promises);
		setGlobalPokemons(results);
		setLoading(false);
	};

	// Llamar a un pokemon por ID
	const getPokemonByID = async id => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(`${baseURL}pokemon/${id}`);
		const data = await res.json();
		return data;
	};

	useEffect(() => {
		getGlobalPokemons();
	}, []);

	// BTN CARGAR MÁS
	const onClickLoadMore = () => {
		setOffset(offset + 12);
	};

	// Filter Function + State
	const [typeSelected, setTypeSelected] = useState({
		grass: false,
		normal: false,
		fighting: false,
		flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
		fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false,
	});

	
	// filtra setea los pokemones en filterpokemons
	const handleCheckbox = e => {
		setTypeSelected({
			...typeSelected,
			[e.target.name]: e.target.checked,
		});
		setPagineSelected(1)
	};

	//Este setea la pagina en 1 al inicio de la aplicacion
	const [pagineSelected, setPagineSelected] = useState(1)

	
	const {pokemonsFilter, size} = useMemo(() => {
		const checkBoxSelected = Object.values(typeSelected).find((value) => value)
		const data = globalPokemons.filter((pokemon) => !checkBoxSelected || pokemon.types.find((type) => typeSelected[type.type.name]))
		const totalPokemonPage = 12; 
		let initialData = (pagineSelected -1) *  totalPokemonPage;
		let finalData = pagineSelected * totalPokemonPage;

		return {pokemonsFilter: data.slice(initialData, finalData), size: data.length};
	}, [globalPokemons, typeSelected, pagineSelected])

	// Logica de ordenamiento
	const sortData = (typeOrder = true) => {
		let sortPokemon = globalPokemons?.sort(function (a, b) {
			const nameA = a.name.toLowerCase();
    		const nameB = b.name.toLowerCase();
			
			if (typeOrder) {
				if (nameA < nameB) return -1;
				if (nameA > nameB) return 1;
			} else {
				if (nameA > nameB) return -1;
				if (nameA < nameB) return 1
			}
			 
			return 0;
		  });
		  
		  setfilteredPokemons([...sortPokemon]);
		  setLoading(false);
	}
	
	return (
		<PokemonContext.Provider
			value={{
				valueSearch,
				onInputChange,
				onResetForm,
				globalPokemons,
				getPokemonByID,
				onClickLoadMore,
				sortData,
				// Loader
				loading,
				setLoading,
				// Btn Filter
				active,
				setActive,
				// Filter Container Checkbox
				handleCheckbox,
				filteredPokemons,
				setfilteredPokemons,
				pokemonsFilter,
				size,
				setPagineSelected
			}}
		>
			{children}
		</PokemonContext.Provider>
	);
};