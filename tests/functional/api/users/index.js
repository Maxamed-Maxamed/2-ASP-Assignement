import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import User from "../../../../api/users/userModel";
import api from "../../../../index";
import {
  getUpcomingMovies,
  getTrendingMovies,
  getMovie,
  getPopularMovies,
  getGenres,
} from '../tmdb/tmdb-api';

const expect = chai.expect;
let db;
let user1token;

describe("Users endpoint", () => {
  before(() => {
    mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });

  beforeEach(async () => {
    try {
      await User.deleteMany();
      // Register two users
      await request(api).post("/api/users?action=register").send({
        username: "user1",
        password: "test1",
      });
      await request(api).post("/api/users?action=register").send({
        username: "user2",
        password: "test2",
      });
    } catch (err) {
      console.error(`failed to Load user test Data: ${err}`);
    }
  });

  afterEach(() => {
    api.close();
  });

  describe("GET /api/users", () => {
    it("should return the 2 users and a status 200", (done) => {
      request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2"]);
          done();
        });
    });
  });

  describe("POST /api/users", () => {
    describe("For a register action", () => {
      describe("when the payload is correct", () => {
        it("should return a 201 status and the confirmation message", () => {
          return request(api)
            .post("/api/users?action=register")
            .send({
              username: "user3",
              password: "test3",
            })
            .expect(201)
            .expect({ msg: "Successful created new user.", code: 201 });
        });

        after(() => {
          return request(api)
            .get("/api/users")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
              expect(res.body.length).to.equal(3);
              const result = res.body.map((user) => user.username);
              expect(result).to.have.members(["user1", "user2", "user3"]);
            });
        });
      });
    });

    describe("For an authenticate action", () => {
      describe("when the payload is correct", () => {
        it("should return a 200 status and a generated token", () => {
          return request(api)
            .post("/api/users?action=authenticate")
            .send({
              username: "user1",
              password: "test1",
            })
            .expect(200)
            .then((res) => {
              expect(res.body.success).to.be.true;
              expect(res.body.token).to.not.be.undefined;
              user1token = res.body.token.substring(7);
            });
        });
      });
    });
  });

  describe("Movies endpoint", () => {
    describe("GET /api/movies", () => {
      it("should return all movies and a status 200", (done) => {
        request(api)
          .get("/api/movies")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.be.greaterThan(0);
            expect(res.body[0]).to.have.property("title");
            expect(res.body[0]).to.have.property("release_date");
            done();
          });
      });
    });

    describe("GET /api/movies/:id", () => {
      it("should return details for a specific movie and a status 200", (done) => {
        // Add assertions for movie details
        done();
      });

      it("should return a 404 status for an invalid movie ID", (done) => {
        // Add assertions for a 404 response
        done();
      });
    });

    describe("GET /api/movies/:id/reviews", () => {
      it("should return reviews for a specific movie and a status 200", (done) => {
        // Add assertions for movie reviews
        done();
      });

      it("should return a 404 status for an invalid movie ID", (done) => {
        // Add assertions for a 404 response
        done();
      });
    });

    describe("POST /api/movies/:id/reviews", () => {
      it("should add a new review for a specific movie and return a 201 status", (done) => {
        // Add assertions for adding a new review
        done();
      });

      it("should return a 404 status for an invalid movie ID", (done) => {
        // Add assertions for a 404 response
        done();
      });
    });

    describe("GET /api/movies/upcoming", () => {
      it("should return upcoming movies and a status 200", async () => {
        const upcomingMovies = await getUpcomingMovies();
        expect(upcomingMovies).to.be.an("array");
        expect(upcomingMovies.length).to.be.greaterThan(0);
        expect(upcomingMovies[0]).to.have.property("title");
        expect(upcomingMovies[0]).to.have.property("release_date");
      });
    });

    describe("GET /api/movies/trending", () => {
      it("should return trending movies and a status 200", async () => {
        const trendingMovies = await getTrendingMovies();
        expect(trendingMovies).to.be.an("array");
        expect(trendingMovies.length).to.be.greaterThan(0);
        expect(trendingMovies[0]).to.have.property("title");
        expect(trendingMovies[0]).to.have.property("release_date");
      });
    });

    describe("GET /api/movies/tmdb/:id", () => {
      it("should return details for a specific movie by TMDB ID and a status 200", async () => {
        const tmdbId = 123; // Replace with an actual TMDB ID
        const movieDetails = await getMovie(tmdbId);
        expect(movieDetails).to.be.an("object");
        expect(movieDetails).to.have.property("title");
        expect(movieDetails).to.have.property("release_date");
      });

      it("should return a 404 status for an invalid TMDB ID", async () => {
        const invalidTmdbId = 999999; // Replace with an invalid TMDB ID
        const invalidTmdbIdResponse = await getMovie(invalidTmdbId);
        expect(invalidTmdbIdResponse.status).to.equal(404);
        expect(invalidTmdbIdResponse.body).to.have.property("message", "The resource you requested could not be found.");
        expect(invalidTmdbIdResponse.body).to.have.property("status_code", 404);
      });
    });

    describe("GET /api/movies/popular", () => {
      it("should return popular movies and a status 200", async () => {
        const popularMovies = await getPopularMovies();
        expect(popularMovies).to.be.an("array");
        expect(popularMovies.length).to.be.greaterThan(0);
        expect(popularMovies[0]).to.have.property("title");
        expect(popularMovies[0]).to.have.property("release_date");
        
      });
    });

    describe("GET /api/movies/genres", () => {
      it("should return movie genres and a status 200", async () => {
        const genres = await getGenres();
        expect(genres).to.be.an("array");
        expect(genres.length).to.be.greaterThan(0);
        expect(genres[0]).to.have.property("id");
        expect(genres[0]).to.have.property("name");
    
      });
    });
  });
});
