import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom'
import '../App.css'
import OnePokemon from './OnePokemon'
import MyTeam from './MyTeam'

 const Main = () => { 
  const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=151"

  const [state, setState] = useState({
    pokedex: [],
    myTeam: [],
    currentPokemon: null,
    isShowingMore: false,
    species: null,
  })


  const getAllPokes = async () => {
    let pokeUrl = baseUrl
    let data = await axios(pokeUrl)
    setState({
      ...state,
      pokedex: data.data.results
    })
  }

  useEffect( () => {
    getAllPokes()
  }, [])

  // API call to get Pokemon info on click
  const handleClick = async (pokeUrl) => {
    let pokeData = await axios(pokeUrl)
    let pokeSpecies = await axios (pokeData.data.species.url)
      setState({
        ...state,
        currentPokemon: pokeData.data,
        species: pokeSpecies.data
      })
  }

  // ADD to Team Component
   const  addToTeam = (pokemon) => {
      setState(prevState => ({
        ...state,
        myTeam: [...prevState.myTeam, pokemon]
      }))
    }

  // REMOVE from Team Component
  const  removeFromTeam = (removePokemon) => {
      setState({
        ...state,
        myTeam: state.myTeam.filter( (d) => d !== removePokemon)
    })
  }

  const pokemon = () => {
    return state.pokedex.map( (d,i) => {
      return (
        <div className='name'
        onClick={() => handleClick(d.url)}>
          <div key={i}>
            {d.name}
          </div>
          <img
            alt=""
            className="pokeball"
            src={require("../closed-pokeball-color.png")} />
        </div>
      )
    })
  }

    console.log('state', state)
   return (
    <>
      <Route exact path='/' render={() => (
        <div className='container'>
          <div className='leftScreen'>
            <h2
            className='pokemonNames'
            >{pokemon()}</h2>
          </div>
          <div>
            <OnePokemon
              addToTeam={addToTeam}
              currentPokemon={state.currentPokemon}
              species={state.species}
              />
          </div>
        </div>
      )}/>
      <Route path ='/MyTeam' render={() => (
        <MyTeam
        myTeam={state.myTeam}
        removeFromTeam={removeFromTeam}/>
      )}
      />
    </>
   )
}

export default Main
