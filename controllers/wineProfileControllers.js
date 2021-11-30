const wineProfile = require('../models/WineProfileSchema.js');

const postWineProfile = (req,res) => {
    
    let newWineProfile = new wineProfile({
        name: req.body.name,
        emailAddress: req.body.emailAddress, 
        type: req.body.type,
        frequency: req.body.frequency,
        grapeVariety: req.body.grapeVariety,
        wineTaste: req.body.wineTaste
    }); 
    
    newWineProfile.save()
    .then(result=>{
        
        res.set('content-location',`/api/v1/wineprofiles/${newWineProfile._id}`);
        
        res.status(201).json({
            url: `/api/v1/wineprofiles/${newWineProfile._id}`,
            id: `${newWineProfile._id}`,
            data: newWineProfile
            
        });
    }) .catch(error=>res.status(500).json(error));
}

const getWineProfiles = (req,res) => {
    
    wineProfile.find({}).exec()
    .then(results=>{
        res.status(200).json(results);
    })
    .catch(error=>res.status(500).json(error));
}

const getWineProfileByEmail = (req,res) => {
    
    wineProfile.findOne({'emailAddress': String(req.params.id).toLowerCase()}).exec()
    .then(results=>{
        res.status(200).json(results);
    })
    .catch(error=>res.status(500).json(error));
}

const putAddWinesToProfile = (req,res) => {

    // console.log(req.body);
    
    let updateWineProfile = new wineProfile({ 
        emailAddress: req.body.emailAddress,
        addWineToProfile: req.body.wineList,
    }); 

    wineProfile.findOneAndUpdate({ emailAddress: updateWineProfile.emailAddress },
    {$addToSet: { addWineToProfile: {$each: updateWineProfile.addWineToProfile} } })
    .then(result=>{
        
        res.set('content-location',`/api/v1/addWineListToProfile/${updateWineProfile._id}`);
        
        res.status(201).json({
            url: `/api/v1/addWineListToProfile/${updateWineProfile._id}`,
            id: `${updateWineProfile._id}`,
            data: updateWineProfile
            
        });
    }) .catch(error=>res.status(500).json(error));
}

module.exports = {
    postWineProfile, 
    getWineProfiles,
    getWineProfileByEmail,
    putAddWinesToProfile
}