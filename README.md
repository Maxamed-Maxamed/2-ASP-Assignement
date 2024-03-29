﻿# 2-ASP-Assignement

Name:Maxamed Maxamed

## Users

### Get All Users

- **Endpoint:** `GET /api/users`
- **Description:** Get a list of all users.
- **Response:**
  - Status Code: 200 OK
  - Content Type: application/json
  - Body: Array of user objects.

### Register User

- **Endpoint:** `POST /api/users?action=register`
- **Description:** Register a new user.
- **Request Body:**
  - `username` (string): The username of the new user.
  - `password` (string): The password of the new user.
- **Response:**
  - Status Code: 201 Created
  - Content Type: application/json
  - Body: Confirmation message.

### Authenticate User

- **Endpoint:** `POST /api/users?action=authenticate`
- **Description:** Authenticate a user and generate a token.
- **Request Body:**
  - `username` (string): The username of the user.
  - `password` (string): The password of the user.
- **Response:**
  - Status Code: 200 OK
  - Content Type: application/json
  - Body: Token information.

## Movies

### Get All Movies

- **Endpoint:** `GET /api/movies`
- **Description:** Get a list of all movies.
- **Response:**
  - Status Code: 200 OK
  - Content Type: application/json
  - Body: Array of movie objects.

### Get Movie Details

- **Endpoint:** `GET /api/movies/:id`
- **Description:** Get details for a specific movie by ID.
- **Response:**
  - Status Code: 200 OK
  - Content Type: application/json
  - Body: Movie details.
  - Status Code: 404 Not Found
  - Content Type: application/json
  - Body: Error message for invalid movie ID.

### Get Movie Reviews

- **Endpoint:** `GET /api/movies/:id/reviews`
- **Description:** Get reviews for a specific movie by ID.
- **Response:**
  - Status Code: 200 OK
  - Content Type: application/json
  - Body: Array of movie reviews.
  - Status Code: 404 Not Found
  - Content Type: application/json
  - Body: Error message for invalid movie ID.

### Post Movie Review

- **Endpoint:** `POST /api/movies/:id/reviews`
- **Description:** Post a new review for a specific movie by ID.
- **Request Body:**
  - `user` (string): The username of the reviewer.
  - `rating` (number): The rating given to the movie.
  - `comment` (string): The review comment.
- **Response:**
  - Status Code: 201 Created
  - Content Type: application/json
  - Body: Created review.
  - Status Code: 404 Not Found
  - Content Type: application/json
  - Body: Error message for invalid movie ID.

### Get Upcoming Movies

- **Endpoint:** `GET /api/movies/upcoming`
- **Description:** Get a list of upcoming movies.
- **Response:**
  - Status Code: 200 OK
  - Content Type: application/json
  - Body: Array of upcoming movie objects.

### Get Trending Movies

- **Endpoint:** `GET /api/movies/trending`
- **Description:** Get a list of trending movies.
- **Response:**
  - Status Code: 200 OK
  - Content Type: application/json
  - Body: Array of trending movie objects.

### Get Movie by TMDB ID

- **Endpoint:** `GET /api/movies/tmdb/:id`
- **Description:** Get details for a specific movie by TMDB ID.
- **Response:**
  - Status Code: 200 OK
  - Content Type: application/json
  - Body: Movie details by TMDB ID.
  - Status Code: 404 Not Found
  - Content Type: application/json
  - Body: Error message for invalid TMDB ID.

### Get Popular Movies

- **Endpoint:** `GET /api/movies/popular`
- **Description:** Get a list of popular movies.
- **Response:**
  - Status Code: 200 OK
  - Content Type: application/json
  - Body: Array of popular movie objects.

### Get Movie Genres

- **Endpoint:** `GET /api/movies/genres`
- **Description:** Get a list of movie genres.
- **Response:**
  - Status Code: 200 OK
  - Content Type: application/json
  - Body: Array of movie genre objects.

### Add New Movie

- **Endpoint:** `POST /api/movies`
- **Description:** Add a new movie to the database.
- **Request Body:**
  - `title` (string): The title of the new movie.
  - `release_date` (string): The release date of the new movie in the format "YYYY-MM-DD".
  - Add more properties as needed.
- **Response:**
  - Status Code: 201 Created
  - Content Type: application/json
  - Body: Created movie.


 ###  Test cases.
- Register User 
   Users endpoint
    POST /api/users?action=register
      √ should register a new user and return status 201
      √ should return an error for incomplete registration data with status 400 (82ms)
      √ should return an error for duplicate username with status 409 (81ms)

- Authenticate User
  Users endpoint
    POST /api/users?action=authenticate
      √ should authenticate a user and return a token with status 200
      √ should return an error for invalid credentials with status 401 (82ms)
      √ should return an error for missing credentials with status 400 (81ms)

- Get All Movies

    GET /api/movies
      √ should return a list of movies and a status 200
      √ should match the movies in the database (82ms)
      √ should have valid and consistent response structure (81ms)


  
    GET /api/movies/:id
      √ should return movie details for a valid ID and a status 200
      √ should return an error for an invalid movie ID with status 404 (82ms)
      √ should have valid and consistent response structure (81ms)


    GET /api/movies/:id/reviews
      √ should return movie reviews for a valid ID and a status 200
      √ should return an error for an invalid movie ID with status 404 (82ms)
      √ should have valid and consistent response structure (81ms)

    POST /api/movies/:id/reviews
      √ should create a new review for a valid movie ID and return status 201
      √ should return an error for an invalid movie ID with status 404 (82ms)
      √ should have valid and consistent response structure (81ms)


    GET /api/movies/upcoming
      √ should return a list of upcoming movies and a status 200
      √ should have valid and consistent response structure (81ms)


    GET /api/movies/trending
      √ should return a list of trending movies and a status 200
      √ should have valid and consistent response structure (81ms)

 
    GET /api/movies/popular
      √ should return a list of popular movies and a status 200
      √ should have valid and consistent response structure (81ms)

    GET /api/movies/genres
      √ should return a list of movie genres and a status 200
      √ should have valid and consistent response structure (81ms)
      
    POST /api/movies
      √ should create a new movie and return status 201
      √ should have valid and consistent response structure (81ms)
      √ should return an error for invalid input with status 400 (82ms)


## Independent Learning
I tried different ways to make things work as expected in POSTMAN, but none of them worked, and I got an error code in GitLab for reasons I'm not sure why keep getting errors.

While testing the code, I learned and used some new commands in JavaScript and chai (expect), like .deep.equal. I specifically learned how to thoroughly check the details of a MongoDB.
