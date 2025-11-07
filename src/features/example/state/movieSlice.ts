import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
    id: string;
    title: string;
    imgUrl?: string;
    releaseDate: string
    userByUserCreatorId: {
        id: string;
        name: string
    }
}

interface Review {
    id: string;
    title: string;
    body: string;
    rating: number;
    movieId: string;
    userReviewerId?: string;
    movieByMovieId?: {
        id: string;
        title: string;
        imgUrl?: string;
        releaseDate: string;
    };
    userByUserReviewerId?: {
        id: string;
        name: string;
    };
}

interface MovieState {
    movies: Movie[];
    loading: boolean;
    error: string | null;

    reviews: Review[],
    reviewsLoading: boolean,
    reviewsError: string | null,

}

const initialState: MovieState = {
    movies: [],
    loading: false,
    error: null,


    reviews: [],
    reviewsLoading: false,
    reviewsError: null,
};


const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        fetchMovies: (state) => {
            state.loading = true;
            state.error = null
        },
        fetchMoviesSuccess: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload;
            state.loading = false

        },
        fetchMoviesFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false
        }
        ,
        fetchReviews: (state) => {
            state.reviewsLoading = true;
            state.reviewsError = null;
        },
        fetchReviewsSuccess: (state, action: PayloadAction<Review[]>) => {
            state.reviews = action.payload;
            state.reviewsLoading = false;
        },
        fetchReviewsFailure: (state, action: PayloadAction<string>) => {
            state.reviewsError = action.payload;
            state.reviewsLoading = false;
        },
        createReview: (state, action: PayloadAction<{
            movieId: string;
            title: string;
            body: string;
            rating: number;
        }>) => {
            state.reviewsLoading = true;
            state.reviewsError = null
        },
        createReviewSucces: (state, action: PayloadAction<Review>) => {
            state.reviews.push(action.payload);
            state.reviewsLoading = false;
        },
        createReviewFailure: (state, action: PayloadAction<string>) => {
            state.reviewsError = action.payload;
            state.reviewsLoading = false
        }


    },



})


export const { fetchMovies, fetchMoviesSuccess, fetchMoviesFailure, fetchReviews, fetchReviewsFailure, fetchReviewsSuccess, createReview, createReviewFailure, createReviewSucces } = movieSlice.actions;
export default movieSlice.reducer;

