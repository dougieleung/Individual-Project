import React, {useState, useEffect} from "react";
import axios from 'axios';

const profile = props => {

    const [wineprofile, setWineProfile ] = useState();
    const [loading, setLoading] = useState();

    useEffect(function displayProfile(){

        axios.get(`https://wmdd4936-dleung46.herokuapp.com/api/v1/wineprofiles/${props.email}`)
        .then(setLoading(true))
        .then(result=>{
            setWineProfile(result.data);
            setLoading(false);
        })
        .catch(error=>console.log(error)); 

    },[props.create])

  return <>
        <div className="profileSection">
            {loading
                ?
            "...loading"
                :
            (<>
                <h2 className="profileTitle">VIP (Very Intoxicated Programmer)</h2>
                {wineprofile !== undefined
                ? 
                (<div>
                  <h2>{wineprofile.name}</h2>
                  <p>{wineprofile.type}</p>
                  <p>For-The-Record: {wineprofile.frequency}</p>
                  <p>Grape Variety Preferences: </p>
                  {wineprofile.grapeVariety ?
                  <ul>
                  {((Object.entries(wineprofile.grapeVariety)).filter(item=> item[1]===true)).map((grape, index) =>
                    <li key={index}>{grape}</li>)}
                  </ul> : ""}
                  <p>Taste Profile: </p>
                  {wineprofile.wineTaste ?
                  <ul>
                  {((Object.entries(wineprofile.wineTaste)).filter(item=> item[1]===true)).map((taste, index) =>
                    <li key={index}>{taste}</li>)}
                  </ul> : ""}
                </div>)
                : ""} 
            </>)}
        </div>
        </>;
}

export default profile;