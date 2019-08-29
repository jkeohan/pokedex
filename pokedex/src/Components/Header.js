import React from 'react'
import { Link } from 'react-router-dom'

function Header() {

  return (
    <div className='navbar'>
    <img className='pikachu'
      src={require("../pikachu.gif")} />
      <Link to ='/Main'>Pokédex</Link>
      <img
        className="logo"
        src={require("../pokemon-logo.png")} />
      <Link to ='/About'>The TCG</Link>
    </div>
  )
}

export default Header
