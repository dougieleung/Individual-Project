import React, { useState, useReducer } from 'react';
import axios from 'axios';
import Profile from './profile.js';
import RecommendWine from './recommendWine.js';
import Cellar from './cellar.js';
require('dotenv').config();

// axios.defaults.baseURL = 'http://localhost:8080';

const winelist = [];

function cellarReducer(state, action) {
    
    let newState =[];
    
    switch(action.type) {
        case 'ADD_WINE': {
            if ((state.length === 0) || (!state.find(item => item.title === action.title))) {
                return newState = [...state, {title: action.title, description: action.description, price: action.price}];
            } else if (state.find(item => item.title === action.title)) {
                return newState = [...state];  
            }
        }  
        case 'REMOVE_WINE': {
            return newState = state.filter(item => item.title !== action.title);
        }
        default:
            return newState;
    }
};

const App = props => {

    // reducer to control state of cellar, and adding/removing wines

    const [cellar, dispatch] = useReducer(
        cellarReducer,
        winelist 
    )

    const handleAddToCellar = (event,item) =>{
        dispatch({type: 'ADD_WINE', title: item.title, description: item.description, price: item.price});
     }
 
     const handleRemoveFromCellar = (event, orderItemTitle)=>{
         dispatch({type: 'REMOVE_WINE', title: orderItemTitle});
     }


    // State for profile forms and validation error messages

    const [create, setCreate] = useState();
    const [errorMessages, setErrorMessages] = useState([]);

    const [input, setInput] = useState({
        name: "",
        emailAddress: "",
        type: "",
        frequency: "",
        grape: "",
        merlot: false,
        "cabernet sauvignon": false,
        "shiraz syrah": false,
        "pinot noir": false,
        zinfandel: false,
        malbec: false,
        sangiovese: false,
        tempranillo: false,
        "full-bodied": false,
        "low acidity": false,
        tannin: false,
        spicy: false,
        "licorice tobacco": false,
        fruity: false,
        leathery: false,
        flinty: false
    });

    function handleChange(event) {
        const isCheckbox = event.target.type === "checkbox";
        const isRadio = event.target.type === "radio";
        let {name, value} = event.target;
    
        if (isCheckbox) {
        setInput((prev) => {
          return {
            ...prev,
            [name]: event.target.checked,
          };
        });
        } else if (isRadio) {
            setInput((prev) => {
            return {
                ...prev,
                [name]: event.target.value,
            };
            });
        } else {
            setInput((prev) => {
              return {
                ...prev,
                [name]: value,
              };
            });
        }
    }

    function handleClick(event) {
        event.preventDefault();

        const newWineProfile = {
            name: input.name,
            emailAddress: input.emailAddress,
            type: input.type,
            frequency: input.frequency,
            grapeVariety: {
              merlot: input.merlot,
              "cabernet sauvignon": input["cabernet sauvignon"],
              "shiraz syrah": input["shiraz syrah"],
              "pinot noir": input["pinot noir"],
              zinfandel: input.zinfandel,
              malbec: input.malbec,
              sangiovese: input.sangiovese,
              tempranillo: input.tempranillo
            },
            wineTaste: {
                "full-bodied": input["full-bodied"],
                "low acidity": input["low acidity"],
                tannin: input.tannin,
                spicy: input.spicy,
                "licorice-tobacco": input["licorice-tobacco"],
                fruity: input.fruity,
                leathery: input.leathery,
                flinty: input.flinty
            }
          };
        
          axios.post('https://wmdd4936-dleung46.herokuapp.com/api/v1/wineprofiles', newWineProfile)
          .then(() => {
            setCreate(newWineProfile);
          }).catch((error) => {
            if (error.response) {
              console.log(error.response.data);
              setErrorMessages(error.response.data);
            }
          });   
    }

    return (
    <>
      
        <h1 className="appTitle">Sommelier's Corner</h1>
        
        <h2 className="motto">Programming At Its Finest</h2>
      
        <div className="app">
          
            <form 
                method="POST"
                className="profileForm">
                <h2 className="formTitle">Wine Profile Questionnaire</h2>
                <label
                    htmlFor="name">
                Name <br/>
                {errorMessages.length >= 1 && errorMessages.find(error => error.message.includes("full name")) ? <em style={{color:"red"}}> {errorMessages.find(error => error.message.includes("full name")).message} </em> : ""}
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder=" Enter your name"
                    pattern="[A-Za-z]+"
                    autoComplete="off"
                    value={input.name}
                    onChange={handleChange}
                    className="nameInput"
                    required 
                />
                <label 
                    htmlFor="email">
                Email <br/>
                {errorMessages.length >= 1 && errorMessages.find(error => error.message.includes("email")) ? <em style={{color:"red"}}> {errorMessages.find(error => error.message.includes("email")).message} </em> : ""}
                </label>
                    <input
                    type="email"
                    id="email"
                    name="emailAddress"
                    placeholder=" john.smith@freewine.com"
                    autoComplete="off"
                    value={input.emailAddress}
                    onChange={handleChange}
                    className="emailInput"
                    required
                />
                <fieldset>
                <legend>Experience: </legend>
                {errorMessages.length >= 1 && errorMessages.find(error => error.message.includes("identity", "identities")) ? <em style={{color:"red"}}> { errorMessages.find(error => error.message.includes("identity", "identities")).message} </em> : ""} 
                    <label> 
                        <input 
                            type="radio" 
                            value="Newbie" 
                            name="type"
                            onClick={handleChange}
                        />
                        Newbie (Asks mom for permission)
                    </label>
                    <label>
                       
                        <input 
                            type="radio" 
                            value="Social Drinker" 
                            name="type" 
                            onClick={handleChange} 
                        />
                        Social Drinker (Don't I know you?)
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            value="Amateur Sommelier" 
                            name="type" 
                            onClick={handleChange} 
                        />
                        Amateur Sommelier (Love the Roma Congee)
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            value="Wine Connoisseur" 
                            name="type"
                            onClick={handleChange} 
                        />
                        Wine Connoisseur (It's Romanée-Conti)
                    </label>
                </fieldset>

                <fieldset>
                <legend>How often do you have a glass? </legend>
                {errorMessages.length >= 1 && errorMessages.find(error => error.message.includes("frequency", "frequencies")) ? <em style={{color:"red"}}> { errorMessages.find(error => error.message.includes("frequency", "frequencies")).message} </em> : ""} 
                    <label>
                        <input 
                            type="radio" 
                            value="Once a week" 
                            name="frequency"
                            onClick={handleChange}
                        />
                        Once a week
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            value="Regular" 
                            name="frequency" 
                            onClick={handleChange} 
                        />
                        1-3 glasses a week
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            value="Daily" 
                            name="frequency" 
                            onClick={handleChange} 
                        />
                        3-7 glasses a week
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            value="Alcoholic" 
                            name="frequency"
                            onClick={handleChange} 
                        />
                        A 750ml bottle a day
                    </label>
                </fieldset>

                <fieldset>
                <legend>Favourite grape variety</legend>
                    <label>
                        <input 
                            type="checkbox" 
                            name="merlot"
                            value="merlot"
                            onChange={handleChange} 
                        />
                        Merlot
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="cabernet sauvignon"
                            onChange={handleChange} 
                        />
                        Cabernet Sauvignon
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="shiraz syrah"
                            onChange={handleChange} 
                        />
                        Shiraz/Syrah
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="pinot noir"
                            onChange={handleChange} 
                        />
                        Pinor Noir
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="zinfandel"
                            onChange={handleChange} 
                        />
                        Zinfandel
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="malbec"
                            onChange={handleChange} 
                        />
                        Malbec
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="sangiovese"
                            onChange={handleChange} 
                        />
                        Sangiovese
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="tempranillo"
                            onChange={handleChange} 
                        />
                        Tempranillo
                    </label>
                </fieldset>

                <fieldset>
                <legend>How do you like your wine?</legend>
                    <label>
                        <input 
                            type="checkbox" 
                            name="full-bodied"
                            onChange={handleChange} 
                        />
                        Full-bodied
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="low acidity"
                            onChange={handleChange} 
                        />
                        Little-to-no acidity
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="tannin"
                            onChange={handleChange} 
                        />
                        Tannin (Chewy)
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="spicy"
                            onChange={handleChange} 
                        />
                        Like 'em Spicy!
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="licorice-tobacco"
                            onChange={handleChange} 
                        />
                        Licorice and Tobacco
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="fruity"
                            onChange={handleChange} 
                        />
                        Fruity
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="leathery"
                            onChange={handleChange} 
                        />
                        Leathery
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="flinty"
                            onChange={handleChange} 
                        />
                        Flinty
                    </label>
                </fieldset>
               
                <button 
                    type="submit"
                    className="formSubmitButton"
                    onClick={handleClick}>
                Submit
                </button>

                <button 
                    type="reset"
                    className="formResetButton">
                Reset
                </button>  
            </form>

            <Profile email={input.emailAddress} create={create} />

            <form 
                className="recommendationForm">
                <h2 className="recommendationTitle">Recommendations</h2>
                <label>
                Select your choice:
                </label>
                <select
                    onChange={handleChange}
                    name="grape"
                    className="selectdropdown"
                    >
                    <option value=""> --Please Select-- </option>
                    <option value="merlot"> Merlot </option>
                    <option value="cabernet sauvignon"> Cabernet Sauvignon </option>
                    <option value="shiraz"> Shiraz/Syrah </option>
                    <option value="pinot noir"> Pinot Noir </option>
                    <option value="zinfandel"> Zinfandel </option>
                    <option value="malbec"> Malbec </option>
                    <option value="sangiovese"> Sangiovese </option>
                    <option value="tempranillo"> Tempranillo </option>
                </select>
            </form>
            <RecommendWine grape={input.grape} handleAddToCellar={handleAddToCellar}/>

            <Cellar className="cellar" cellar={cellar} handleRemoveFromCellar={handleRemoveFromCellar} email={input.emailAddress} />
        </div>
        <div className="music">
            <audio
                src="https://wmdd4936project.s3.ca-central-1.amazonaws.com/Clair-de-lune-piano.mp3"
                controls
                loop>
            </audio>
        </div>  
    </>
    );
}

export default App;