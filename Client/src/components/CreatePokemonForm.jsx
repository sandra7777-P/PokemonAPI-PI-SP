import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext';
import  CreatePokemon from './CreatePokemon.css';

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

    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files[0], 
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
    console.log(formData);
    // Validaciones

    if (
      formData.name === '' ||
      formData.hp === '' ||
      formData.attack === '' ||
      formData.defense === '' ||
      formData.speed === '' ||
      formData.height === '' ||
      formData.weight === '' ||
      formData.types.length === 0
    ) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Llamar a la función para crear el nuevo pokemon con los datos de formData
    function createPokemon(formData) {
      fetch("http://localhost:3001", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log("New Pokemon created:", data);
      })
      .catch(error => {
        console.error("Error creating Pokemon:", error);
      });
    }
    CreatePokemon(formData);

    // Limpiar el formulario después de enviar
    setFormData({
      name: '',
      image: null,
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
          
          <div>
          <label>Imagen:</label>
          <input
            type="file" 
            name="image"
            accept="image/*" 
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

          <div>
            <label>Ataque:</label>
            <input
              type="number"
              name="attack"
              value={formData.attack}
              onChange={handleChange}
              required
           />
         </div>

          <div>
            <label>Defensa:</label>
            <input
              type="number"
              name="defense"
              value={formData.defense}
              onChange={handleChange}
              required
            />
         </div>

          <div>
            <label>Velocidad:</label>
            <input
              type="number"
              name="speed"
              value={formData.speed}
              onChange={handleChange}
              required
            />
           </div>

          <div>
            <label>Altura:</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Peso:</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
         </div>

         
          <div>
            <label>Tipos:</label>
            <div>
              <input
                type="checkbox"
                name="type"
                value="steel"
                checked={formData.types.includes('steel')}
                onChange={handleTypeChange}
              />
              <label>Acero</label>
            </div>

            <div>
              <input
                type="checkbox"
                name="type"
                value="water"
                checked={formData.types.includes('water')}
                onChange={handleTypeChange}
              />
              <label>Agua</label>
            </div>

            <div>
              <input
                type="checkbox"
                name="type"
                value="bug"
                checked={formData.types.includes('bug')}
                onChange={handleTypeChange}
              />
              <label>Bicho</label>
             </div>

            <div>
            <input
              type="checkbox"
              name="type"
              value="dragon"
              checked={formData.types.includes('dragon')}
              onChange={handleTypeChange}
            />
            <label>Dragon</label>
            </div>

            
            <div>
            <input
              type="checkbox"
              name="type"
              value="electric"
              checked={formData.types.includes('electric')}
              onChange={handleTypeChange}
            />
            <label>Electrico</label>
             </div>

          <div>
          <input
            type="checkbox"
            name="type"
            value="ghost"
            checked={formData.types.includes('ghost')}
            onChange={handleTypeChange}
          />
          <label>Fantasma</label>
        </div>

        <div>
        <input
          type="checkbox"
          name="type"
          value="fire"
          checked={formData.types.includes('fire')}
          onChange={handleTypeChange}
        />
        <label>Fuego</label>
        </div>

          <div>
          <input
            type="checkbox"
            name="type"
            value="Fair"
            checked={formData.types.includes('Fair')}
            onChange={handleTypeChange}
          />
          <label>Hada</label>
          </div>
                
          <div>
          <input
            type="checkbox"
            name="type"
            value="ice"
            checked={formData.types.includes('ice')}
            onChange={handleTypeChange}
          />
          <label>Hielo</label>
          </div>

          <div>
          <input
            type="checkbox"
            name="type"
            value="fighting"
            checked={formData.types.includes('fighting')}
            onChange={handleTypeChange}
          />
          <label>Lucha</label>
          </div>
          <div>
              <input
                type="checkbox"
                name="type"
                value="normal"
                checked={formData.types.includes('normal')}
                onChange={handleTypeChange}
              />
              <label>Normal</label>
          </div>

            <div>
            <input
              type="checkbox"
              name="type"
              value="psychic"
              checked={formData.types.includes('psychic')}
              onChange={handleTypeChange}
            />
            <label>Psiquico</label>
          </div>

          <div>
          <input
            type="checkbox"
            name="type"
            value="grass"
            checked={formData.types.includes('grass')}
            onChange={handleTypeChange}
          />
          <label>Planta</label>
          </div>

          <div>
          <input
            type="checkbox"
            name="type"
            value="rock"
            checked={formData.types.includes('rock')}
            onChange={handleTypeChange}
          />
          <label>Roca</label>
        </div>

        <div>
          <input
            type="checkbox"
            name="type"
            value="dark"
            checked={formData.types.includes('dark')}
            onChange={handleTypeChange}
          />
          <label>Siniestro</label>
        </div>

          </div>
          <button type="submit">Crear</button>
        </form>
      );
    };

    export default CreatePokemonForm;
