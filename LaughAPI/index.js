// “Get a hilarious joke instantly, personalized with your name using JokeAPI.”

import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {content : ""});
});

app.post('/', async(req,res) => {
    console.log(req.body);
    const name = req.body.name?.trim() || "Friend";;
    try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/Any?safe-mode", {
            params : {
                safeMode : true,
                type : "single",
            }
        });
        let joke = response.data.joke;

         // Smart personalization
        const personalizedJoke = `😂 Hey ${name}! Here's your joke:\n\n${joke}`;

        res.render("index.ejs", {content: personalizedJoke});

    } catch(error) {
        console.error("Not found!", error.message);
        res.sendStatus(404);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});