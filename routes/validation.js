const Joi = require('joi');

exports.registration = (req,res,next) => {

    const wineProfileSchema = Joi.object({

        name: Joi.string().trim().allow(' ').min(2).max(30).empty('').required().messages({
            'string.min':'Name must have at least 2 characters',
            'string.max':'Name mustn\'t have more than 30 characters',
            'any.required':'Please enter your full name.'
        }),
        
        emailAddress: Joi.string().lowercase().trim().email({ minDomainSegments: 2, tlds: { allow: ['com','net','ca','org'] }}).empty('').required().messages({
            'string.email':'Please enter a valid email address.',
            'any.required':'Please enter an email address.',
            'string.lowercase':'Please enter your email address in lowercase.'
        }),

        type: Joi.string().valid('Newbie','Social Drinker','Amateur Sommelier','Wine Connoisseur').empty('').required().messages({
            'any.required':'Please select 1 identity.',
            'any.only':'Please only choose from the listed identities.'
        }),

        frequency: Joi.string().valid('Once a week','Regular','Daily','Alcoholic').empty('').required().messages({
            'any.required':'Please select 1 frequency.',
            'any.only':'Please only choose from the listed frequencies.'
        }),

        grapeVariety: {
            merlot: Joi.boolean(),
            "cabernet sauvignon": Joi.boolean(),
            "pinot noir": Joi.boolean(),
            "shiraz syrah": Joi.boolean(),
            zinfandel: Joi.boolean(),
            malbec: Joi.boolean(),
            sangiovese: Joi.boolean(),
            tempranillo: Joi.boolean()
        },

        wineTaste: {
            "full-bodied": Joi.boolean(),
            "low acidity": Joi.boolean(),
            tannin: Joi.boolean(),
            spicy: Joi.boolean(),
            "licorice-tobacco": Joi.boolean(),
            fruity: Joi.boolean(),
            leathery: Joi.boolean(),
            flinty: Joi.boolean()
        }
    });

    const {value,error} = wineProfileSchema.validate(req.body, {abortEarly:false});
        
    req.body = value;

    if (error != undefined) {

        console.error(error);

        res.status(400).send(error.details);
    
    } else {
        
        next();
    }
}