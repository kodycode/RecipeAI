import cors from 'cors';
import express from 'express';
import { Configuration, OpenAIApi } from 'openai';

import { generateRecipe } from './api/openai';
import { insertRecipe } from './database/recipes';
import { startDatabase } from './database/mongo';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const app = express();
const port = process.env.DOCKER_SERVER_PORT_FORWARD !== undefined
  ? process.env.DOCKER_SERVER_PORT_FORWARD
  : 8080;

app.use(express.json());
app.use(cors());

startDatabase().then(async () => {
  app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
  });

  /* Generates a recipe given the recipe prompt */
  app.post('/generate-recipe', (req, res) => {
    const data = req.body;
    const ingredientPrompt = data.ingredientPrompt;

    // After receiving recipe prompt, we request to generate a recipe
    generateRecipe(openai, ingredientPrompt).then(result => {
      const recipeResponse: string | undefined = result.data.choices[0].text;
      if (recipeResponse != null) {
        insertRecipe({ recipe: recipeResponse, ingredientPrompt }).catch((reason) => {
          console.log(reason);
        });
      }
      res.send({ data: recipeResponse });
    }).catch(err => {
      console.log(err);
    });
  });
}).catch(() => {});
