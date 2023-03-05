# RecipeAI

Created a dockerized full-stack application to generate food recipes from using [OpenAI's Completions API](https://platform.openai.com/docs/api-reference/completions).

This app was created using:

* Typescript
* ReactJS - Frontend
* Node.js + Express - Backend
* MongoDB - Database (to store the recipes generated from OpenAI)
* Docker

<img width="1440" alt="Screenshot 2023-03-05 at 2 51 06 AM" src="https://user-images.githubusercontent.com/13345899/222948605-9f6c227e-8980-412e-abb3-eacb0f52626a.png">

# Installation instructions

    1. Have the latest npm, node, docker installed.

    2. In the root directory of this project, go into the .env file
       and enter your OpenAI API key for the env variable `OPENAI_API_KEY`.

       2a. If you don't have one, generate an OpenAI API key here:
           https://platform.openai.com/account/api-keys

    3. Once done with that and still in the root directory, in the terminal enter
       `docker-compose build` and once finished run `docker-compose up`.

    4. When that's done, you should see 3 containers running underneath the
       network stack `openai_recipe_app`. They should be named `mongo`,
       `frontend-1`, and `backend-1` as well.

    5. Once that's confirmed, you should be able to visit the frontend,
       http://localhost:3000/. Notably, the express server is running
       at http://localhost:8080/ and MongoDB running within the network
       on port 27017. If these ports conflict, you can change this in
       the .env.

    You should be all set with running the application now.

    Alternatively, you can run the frontend and backend locally if you
    go into services and visit their respective folders. Run an `npm install`
    in both directories and you can then run `npm run start` in each directory
    as well, and they should be able to go online with the exception of the
    the backend. The backend requires MongoDB to be actively running in the
    background. Otherwise, it'll hang up and quit. This method also requires an
    existing `OPENAI_API_KEY` environment variable on your host machine.
