import React, {useState} from 'react';
import axios from 'axios';

const Order = props => {

    const [saveWineList, setSaveWineList] = useState();

    function handleClick() {

        const updateProfile = {
            emailAddress: props.email,
            wineList: props.cellar
        }

        axios.put(`https://wmdd4936-dleung46.herokuapp.com/api/v1/addWineListToProfile/${props.email}`, updateProfile)
        .then(result=>{
            console.log(result.data);
            setSaveWineList("Your wines are saved to your profile!");
        })
        .catch(error=>console.log(error)); 
    }
    
    
    return <>
    
        <div className="cellarContainer">
            <div className="cellarWineList">
                <h2 className="cellarTitle">Wine Cellar</h2>
                {props.cellar ? (
                    <ul> {props.cellar.map((item, index) =>
                    <li key={index}>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <p>{item.price}</p>
                        <button className="removeButton" onClick={event => props.handleRemoveFromCellar(event, item.title)}>Remove Item</button>
                    </li>
                    )} 
                    </ul> ) : ""}
            </div>
            <div className="bottomCellarContainer">
                {saveWineList ? <em>{saveWineList}</em> : ""}
                <button className="CellarButton" onClick={handleClick}>Save To Profile</button>
        
            </div>   
        </div>;
     
    </>
}

export default Order;