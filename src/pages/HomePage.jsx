import * as React from "react";
import './HomePage.scss'
import axios from "axios";
import { useState, useEffect } from "react";


const HomePage =  () => {
  let [breed, setBreed] = useState('')
  let [randomImage, setRandomImage] = useState({}) 

  // API call for dog images
  async function randomData(breed) {
    await axios.get(`https://dog.ceo/api/breed/${breed}/images/random/1`).then(response => {
      let data = {
        message: response.data.message,
        breed
      }
      setRandomImage(data)
    })
  }

  // input value event handler 
  function handleBreed(event) {
    setBreed(event.target.value)
  }
  // search button event handler
  async function handleSubmit() {
    if(breed) {
        breed = breed.toLocaleLowerCase()
        await axios.get(`https://dog.ceo/api/breed/${breed}/images/random/1`).then(response => {
        const data = {
          message: response.data.message[0],
          breed: breed
        }
        setRandomImage(data)
        setBreed('')
      })
    }
  }
  
  // Tells React that your component needs to do something after render
  useEffect(() => {
    randomData('husky')
  }, [])
  return (
    <div className="main">
      <h2 className="main-heading">Dog API</h2>
      <a href="https://dog.ceo/dog-api/documentation/">Dog API</a>
      <div className="main__search">
        <input  className="main__search--input" placeholder="Search By Breed" value={breed} type="text" onChange={e => handleBreed(e)}></input>
      </div>
      <button  className="main__search--button" onClick={handleSubmit}>Search</button>
      <div className="main__image">
        <img className="main__image--img" src={randomImage.message} alt={randomImage.breed}/>
        <p className="main__image--desc" >{randomImage.breed}</p>
      </div>
    </div>
  );
};

export default HomePage;
