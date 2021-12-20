# Around the U.S. Back End

Back End server for Around-React.

### Latest update:

- MongoDB database.
- API end-points for editing user information and liking cards.
- Validation.
- Mock authentication.

### Coming soon

- Authentication.

## Directories

`/routes` — routing files.

`/models` — models for MongoDB documents.

`/utils` — modules for validation and authentication.

## Running the Project

`npm run start` — to launch the server.

`npm run dev` — to launch the server with the hot reload feature.

`npm run lint` — to run Eslint.

## Api

### Users

- GET `http://localhost:3000/users` - JSON list of all users.

- GET `http://localhost:3000/users/:id` - Get a user by ID.

- PATCH `http://localhost:3000/users/me` - Update user information.

- PATCH `http://localhost:3000/users/me/avatar` - Update user avatar.

- POST `http://localhost:3000/users` - Create a new user.

- GET `http://localhost:3000/cards` - JSON list of all cards.

### Cards

- POST `http://localhost:3000/cards` - Create a card.

- DELETE `http://localhost:3000/cards/:id` - Delete a card.

- PUT `http://localhost:3000/cards/:id/likes` - Like a card.

- DELETE `http://localhost:3000/cards/:id/likes` - Unlike a card.

### 404

- Non-existent address or localhost:3000 - { "message": "Requested resource not found" }
