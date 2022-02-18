import React, { useState, useEffect } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { PlanetsCard } from "../component/planetscard";
import { CharactersCard } from "../component/characterscard";
import { PlanetDetails } from "./planetdetails";

export const Home = () => {
  const [planetsArray, setPlanetsArray] = useState([]);
  const [charactersArray, setCharactersArray] = useState([]);

  //I joined both fetches in one fetch template since they are very similar in how they work, we just need to pass a url and a setter method to use it for any endpoint
  const getData = (url, setArray) => {
    fetch(url)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
        //there was a variable called data that was being returned here, but normally we just return the jsonification because we want the next .then to wait on the result if it takes longer
      })
      .then((responseAsJson) => {
        console.log(responseAsJson.results);
        setArray(responseAsJson.results);
      })
      .catch((error) => {
        console.log("Looks like there was a problem: \n", error);
      });
  };

  useEffect(() => {
    //I get both characters and planets by passing the respective url and the setter method for the appropriate array
    getData("https://swapi.dev/api/people/", setCharactersArray);
    getData("https://swapi.dev/api/planets/", setPlanetsArray);
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>Star Wars</h1>
      <h3>Planets</h3>
      <div className="container">
        <div className="row">
          {planetsArray.map((item, index) => {
            return <PlanetsCard key={index} planet={item} />;
          })}
        </div>
      </div>
      <h3>Characters</h3>
      <div className="container flex-wrap">
        <div className="row">
          {charactersArray.map((item, index) => {
            return <CharactersCard key={index} character={item} />;
          })}
        </div>
      </div>
    </div>
  );
};
