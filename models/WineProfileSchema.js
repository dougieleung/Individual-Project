const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const grapeVarietySubSchema = new Schema({
    merlot: { type: Boolean, default: false },
    "cabernet sauvignon": { type: Boolean, default: false },
    "shiraz syrah": { type: Boolean, default: false },
    "pinot noir": { type: Boolean, default: false },
    zinfandel: { type: Boolean, default: false },
    malbec: { type: Boolean, default: false },
    sangiovese: { type: Boolean, default: false },
    tempranillo: { type: Boolean, default: false }
});

const wineTasteSubSchema = new Schema({
    "full-bodied": { type: Boolean, default: false },
    "low acidity": { type: Boolean, default: false },
    tannin: { type: Boolean, default: false },
    spicy: { type: Boolean, default: false },
    "licorice-tobacco": { type: Boolean, default: false },
    fruity: { type: Boolean, default: false },
    flinty: { type: Boolean, default: false },
    leathery: { type: Boolean, default: false }
});

const wineSubSchema = new Schema(
    {
        description: { type: String },
        price: { type: String },
        title: { type: String }
    }
);

const WineProfileSchema = new Schema({
    name:{ type: String, required:true, maxLength: 30 },
    emailAddress: { type: String, required: true, maxLength: 30 },
    type: { type: String, required: true },
    frequency: { type: String, required: true },
    grapeVariety: grapeVarietySubSchema,
    wineTaste: wineTasteSubSchema,
    addWineToProfile: [wineSubSchema]
});

const WineProfile = mongoose.model('WineProfile', WineProfileSchema);

module.exports = WineProfile;