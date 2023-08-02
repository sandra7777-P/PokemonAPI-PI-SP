import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext';

const CreatePokemonForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: null, // Usamos 'null' para representar el archivo seleccionado
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: [],
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Handle file input separately
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files[0], // Store the selected file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        types: [...formData.types, value],
      });
    } else {
      setFormData({
        ...formData,
        types: formData.types.filter((type) => type !== value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar las validaciones que necesitas
    if (formData.name === '' || formData.hp === '' || formData.attack === '' || formData.defense === '') {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Llamar a la función para crear el nuevo pokemon con los datos de formData
    createPokemon(formData);

    // Limpiar el formulario después de enviar
    setFormData({
      name: '',
      image: '',
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      height: '',
      weight: '',
      types: [],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear nuevo Pokémon</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      {/* Agrega los demás campos del formulario (Imagen, Vida, Ataque, Defensa, Velocidad, Altura, Peso, y tipos) */}
      <div>
      <label>Imagen:</label>
      <input
        type="file" // Usamos 'file' como tipo para cargar imágenes
        name="image"
        accept="image/*" // Aceptamos solo archivos de imagen
        onChange={handleChange}
        required
      />
      </div>
      <div>
        <label>Vida:</label>
        <input
          type="number"
          name="hp"
          value={formData.hp}
          onChange={handleChange}
          required
        />
      </div>
      {/* Agrega los demás campos del formulario (Ataque, Defensa, Velocidad, Altura, Peso, y tipos) */}
      {/* ... */}
      <div>
        <label>Tipos:</label>
        <div>
          <input
            type="checkbox"
            name="type"
            value="fire"
            checked={formData.types.includes('fire')}
            onChange={handleTypeChange}
          />
          <label>Fire</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="type"
            value="water"
            checked={formData.types.includes('water')}
            onChange={handleTypeChange}
          />
          <label>Water</label>
        </div>
        {/* Agrega el resto de los tipos */}
      </div>
      <button type="submit">Crear</button>
    </form>
  );
};

export default CreatePokemonForm;
