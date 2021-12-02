# Run server

- cd into `/backend` and then run `npm install`

- Copy .env.example to .env

- Paste in the *GH_CLIENT_ID* and *GH_CLIENT_SECRET* variables your Oauth app data

- Run the following command to run startup migrations. The server is using SQLite
``` js
adonis migration:run
```

- Run `adonis serve --dev`

# Run frontend

- cd into `/frontend` and then run `npm install`

- Create a .env file

- Create the variables 
  - *REACT_APP_CLIENT_ID* with the client id from your Oauth app 
  - *REACT_APP_API_URL* with the backend url 

- Run `npm start`
