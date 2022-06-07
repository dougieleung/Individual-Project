# Sommelier's Corner

Every programmer needs a moment to just take their mind off the screen, lean back, relax and enjoy a nice glass of wine.

My simple application is to help you create a wine drinking profile and search recommended wines based on the grape variety you like.  Users can add the wines to their cellar and save them to their profile.  As a subsequent iteration, I would display the profile with the saved wine list and add many more functionalities, like modifying, adding and removing the wine list; searching recommendations based on criteria (rather than just outputing 4 names); and pairing wines with different cuisines.

Every application needs to be the whole package.  Design and functionality go hand-in-hand.  That being said, I believe I have not only achieved the technical requirements set out for the project, but also produced a program that reflects everything I have learned since January this year.  The form demonstrates most of the elements that typically show up on public websites (text fields, radio buttons, checkboxes).  I demonstrated a good understanding of using React hooks, which are newer features introduced in 2016.  I also called an external API, Spoonacular, which is available on RapidAPI.

The application is very straightforward and requires no tutorial as it's basically self-explanatory.  Just fill out the form, submit it, and your profile will be displayed.  Then, you can select a grape variety from the dropdown menu and the application will list 4 recommended wines.  You can add the wines to your cellar and once you've decided on your wine list, you can save it to your profile.

API Documentation

* postWineProfile, getWineProfiles, and getWineProfileByEmail endpoints are programmed to link the React App to the MongoDB database.

* postWineProfile includes String and Boolean value data types (the checklist items are all initiated as false until they are checked off).

* Once a profile is created, the email provided by the user will be passed as an argument to a GET request to retrieve the profile.

* validation middleware is created in a separate file to validate and sanitize the data to be stored in MongoDB.  I implemented the Joi API along with all the error codes for the respective fields.

* I created subSchemas for the nested objects in Grape Varieties and Wine Taste Profile

* I set content-location for the response to be conformant with HTTP protocol and indicate the location of the newly-created resource.

*********************************************
This is the POST body:

    let newWineProfile = new wineProfile({
        name: req.body.name,
        emailAddress: req.body.emailAddress, 
        type: req.body.type,
        frequency: req.body.frequency,
        grapeVariety: req.body.grapeVariety,
        wineTaste: req.body.wineTaste
    }); 
*********************************************


