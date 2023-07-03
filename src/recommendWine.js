import React, { useState, useEffect } from "react";
import axios from "axios";
import env from "react-dotenv";
import Fade from "react-reveal/Fade";

const RecommendWine = (props) => {
  const [recommendations, setRecommendations] = useState();

  useEffect(
    function displayRecommendations() {
      const options = {
        method: "GET",
        url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/recommendation",
        params: { wine: `${props.grape}`, number: "4" },
        headers: {
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "X-RapidAPI-Key": env.REACT_APP_RAPID_API_KEY,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setRecommendations(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    [props.grape]
  );

  return (
    <>
      <div className="recommendationContainer">
        <ul className="wineUnorderedList">
          {recommendations !== undefined
            ? recommendations.recommendedWines.map((item, index) => (
                <li key={index}>
                  <Fade down>
                    <div className="wineCard">
                      <img src={item.imageUrl} alt="label image" />
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>
                      <p>{item.price.slice(0, 6)}</p>
                      <button
                        className="AddToCellarButton"
                        onClick={(event) =>
                          props.handleAddToCellar(event, item)
                        }
                      >
                        Add to Cellar
                      </button>
                    </div>
                  </Fade>
                </li>
              ))
            : ""}
        </ul>
      </div>
    </>
  );
};

export default RecommendWine;
