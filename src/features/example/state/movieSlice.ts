import { createSlice , PayloadAction } from "@reduxjs/toolkit";

interface Movie{
    id: string; 
    title: string;
    imgUrl?:string;
    releaseDate:string
    userByUserCreatorId:{
        id: string;
        name:string
    }
}

interface MovieState {
    movies: Movie[];
    loading: boolean;
    error: string | null;  

}

const initialState: MovieState = {
    movies: [],
    loading: false,
    error: null,
};


const movieSlice = createSlice ({
    name: 'movies',
    initialState,
    reducers: {
        fetchMovies: (state) => {
            state.loading = true;
            state.error = null
        },
        fetchMoviesSuccess: (state,action:PayloadAction<Movie[]>) =>{
            state.movies = action.payload;
            state.loading = false 

        },
        fetchMoviesFailure:(state,action:PayloadAction<string>) =>{
            state.error = action.payload;
            state.loading = false
        }

    }

})


export const { fetchMovies, fetchMoviesSuccess,fetchMoviesFailure} = movieSlice.actions;
export default movieSlice.reducer;

