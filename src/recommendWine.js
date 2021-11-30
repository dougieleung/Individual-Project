import React, {useState, useEffect} from "react";
import axios from 'axios';

const RecommendWine = props => {

  const [recommendations, setRecommendations] = useState();

  const specificGrape = "'" + props.grape + "'";

  useEffect(function displayRecommendations(){

      const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/recommendation',
        params: {wine: specificGrape, number: '4'},
        headers: {
          'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
          'x-rapidapi-key': 'e2db6c2630msh1ecfed303fd1acfp1b1d28jsn4bb1e7714451'
        }
      };
      
      axios.request(options).then(function (response) {
        console.log(response.data);
        setRecommendations(response.data);
      }).catch(function (error) {
        console.error(error);
      });

    },[props.grape])
  
  return <>
  <div className="recommendationContainer">
    <ul className="wineUnorderedList">
    {recommendations !== undefined ? recommendations.recommendedWines.map((item, index) => <li key={index}>
      <div className="wineCard">
        <img src={item.imageUrl} alt="label image"/>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <p>{item.price}</p>
        <button className="AddToCellarButton" onClick={event=>props.handleAddToCellar(event,item)}>Add to Cellar</button>
      </div>
    </li>):""}
    </ul>
  </div>
  </>;

}

export default RecommendWine;