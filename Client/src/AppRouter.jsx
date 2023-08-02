import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage, PokemonPage, SearchPage } from './pages';
import CreatePokemonForm from './components/CreatePokemonForm';

export const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<HomePage />} />
				<Route path='/pokemon/:id' element={<PokemonPage />} />
				<Route path='/search' element={<SearchPage />} />
				<Route path='/create' element={<CreatePokemonForm />} />	
			</Route>

            <Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};
