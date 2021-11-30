const router = require('express').Router({mergeParams:true});

const wineProfileRouter = require('./wineProfiles.js');

router.use('/', wineProfileRouter);

module.exports = router;