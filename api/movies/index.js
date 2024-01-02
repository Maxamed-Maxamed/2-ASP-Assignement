import express from 'express';
import uniqid from 'uniqid';
import asyncHandler from 'express-async-handler';
import movieModel from './movieModel';
import {
  getUpcomingMovies,
  getTrendingMovies,
  getMovie,
  getPopularMovies,
  getGenres,
} from '../tmdb/tmdb-api';

const router = express.Router();

// Get all movies from the database
router.get('/', asyncHandler(async (req, res) => {
  const movies = await movieModel.find();
  res.status(200).json(movies);
}));

// Get movie details by MovieDB ID
router.get('/:id', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const movie = await movieModel.findByMovieDBId(id);
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).json({ message: 'The resource you requested could not be found.', status_code: 404 });
  }
}));

// Get reviews for a specific movie by ID
router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie.reviews);
    } else {
        res.status(404).json({ message: 'The resource you requested could not be found.', status_code: 404 });
    }
}));


// Post a review for a specific movie by ID
router.post('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);
    // Assuming movieReviews is an array of movies with reviews
    const movie = movieReviews.find(movie => movie.id === id);
    if (movie) {
      const newReview = {
        created_at: new Date(),
        updated_at: new Date(),
        id: uniqid(),  // Using uniqid here
        ...req.body,
      };
      movie.reviews.push(newReview);
      res.status(201).json(newReview);
    } else {
      res.status(404).json({ message: 'The resource you requested could not be found.', status_code: 404 });
    }
  });
  

// Route to get upcoming movies
router.get('/upcoming', asyncHandler(async (req, res) => {
  const upcomingMovies = await getUpcomingMovies();
  res.status(200).json(upcomingMovies);
}));

// Route to get trending movies
router.get('/trending', asyncHandler(async (req, res) => {
  const trendingMovies = await getTrendingMovies();
  res.status(200).json(trendingMovies);
}));

// Route to get details for a specific movie by TMDB ID
router.get('/tmdb/:id', asyncHandler(async (req, res) => {
  const tmdbId = parseInt(req.params.id);
  const movie = await getMovie(tmdbId);
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).json({ message: 'The resource you requested could not be found.', status_code: 404 });
  }
}));

// Route to get popular movies
router.get('/popular', asyncHandler(async (req, res) => {
  const popularMovies = await getPopularMovies();
  res.status(200).json(popularMovies);
}));

// Route to get movie genres
router.get('/genres', asyncHandler(async (req, res) => {
  const genres = await getGenres();
  res.status(200).json(genres);
}));

export default router;