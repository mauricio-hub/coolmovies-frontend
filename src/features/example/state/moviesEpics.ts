import { Epic } from 'redux-observable';
import { filter, switchMap } from 'rxjs/operators';
import { AllMoviesDocument } from '../../../generated/graphql';
import { fetchMovies, fetchMoviesSuccess, fetchMoviesFailure } from './movieSlice';
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