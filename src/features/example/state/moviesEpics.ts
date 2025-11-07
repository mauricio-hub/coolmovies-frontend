import { Epic } from 'redux-observable';
import { filter, switchMap } from 'rxjs/operators';
import { AllMoviesDocument, AllMovieReviewsDocument, CreateMovieReviewDocument } from '../../../generated/graphql';
import { fetchMovies, fetchMoviesSuccess, fetchMoviesFailure, fetchReviews, fetchReviewsFailure, fetchReviewsSuccess, createReview,createReviewFailure,createReviewSuccess } from './movieSlice';
import { RootState } from '../../../state/store';
import { EpicDependencies } from '../../../state/types';


export const fetchMoviesEpic: Epic<
  any,
  any,
  RootState,
  EpicDependencies
> = (action$, state$, { client }) =>
    action$.pipe(
      filter(fetchMovies.match),
      switchMap(async () => {
        try {
          const result = await client.query({ query: AllMoviesDocument });
          console.log('movies :', result.data.allMovies.nodes);
          return fetchMoviesSuccess(result.data.allMovies.nodes);
        } catch (err) {
          return fetchMoviesFailure((err as Error).message);
        }
      })
    );


export const fetchReviewsEpic: Epic<
  any,
  any,
  RootState,
  EpicDependencies
> = (action$, state$, { client }) =>
    action$.pipe(
      filter(fetchReviews.match),
      switchMap(async () => {
        try {
          const result = await client.query({ query: AllMovieReviewsDocument });
          console.log('reviews:', result.data.allMovieReviews.nodes);
          return fetchReviewsSuccess(result.data.allMovieReviews.nodes);
        } catch (err) {
          return fetchReviewsFailure((err as Error).message);
        }
      })
    );



export const createReviewEpic: Epic<
  any,
  any,
  RootState,
  EpicDependencies
> = (action$, state$, { client }) =>
  action$.pipe(
    filter(createReview.match),
    switchMap(async (action) => {
      try {
        const result = await client.mutate({
          mutation: CreateMovieReviewDocument,
          variables: {
            input: {
              movieReview: {
                title: action.payload.title,
                body: action.payload.body,
                rating: action.payload.rating,
                movieId: action.payload.movieId,
                userReviewerId: "5f1e6707-7c3a-4acd-b11f-fd96096abd5a", 
              }
            }
          }
        });

        console.log('Review....', result.data.createMovieReview.movieReview);
        return createReviewSuccess(result.data.createMovieReview.movieReview);
      } catch (err) {
        console.error('Error creating review:', err);
        return createReviewFailure((err as Error).message);
      }
    })
  );
