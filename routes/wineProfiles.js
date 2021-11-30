const validator = require('./validation.js')
const express = require("express");
const router = express.Router({mergeParams:true});

const {getWineProfileByEmail, getWineProfiles, postWineProfile, putAddWinesToProfile} = require('../controllers/wineProfileControllers.js')

router
    .get('/wineprofiles/:id', getWineProfileByEmail)
    .get('/wineprofiles/', getWineProfiles)
    .put('/addWineListToProfile/:id', putAddWinesToProfile)
    .post('/wineprofiles/', validator.registration, postWineProfile);

module.exports = router;   