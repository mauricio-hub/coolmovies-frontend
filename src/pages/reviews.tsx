import { Alert, CircularProgress, Container, Typography } from "@mui/material";
import ReviewCard from "../features/example/components/ReviewCard";
import { useAppDispatch, useAppSelector } from "../state/store"
import { fetchMovies } from "../features/example/state/movieSlice"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ReviewForm from "../features/example/components/ReviwForm";

const ReviewsPage: React.FC = () => {

    const { movies, loading, error } = useAppSelector((state) => state.movies)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMovies())
    }, [dispatch])


    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>

                <CircularProgress aria-label="Loading" />
                <Typography sx={{ mt: 2 }} variant="body1">Loading reviews...</Typography>

            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error" role="alert">Error loading reviews: {error}</Alert>
            </Container>
        );
    }

    const handleReviewSubmit =()=>{
        console.log('submit')
    }

    return (
        <Container>
            <Typography variant="h3" component="h1" >
                Movie Reviews
            </Typography>
            
            <ReviewForm 
                onSubmit={handleReviewSubmit}
                movies={movies}
                loading={false}
            />
            <p>Here are some reviews from our users:</p>

            {
                movies.length === 0 ? (
                    <Typography>No reviews yet.</Typography>
                ) : (
                    <>
                        {
                            movies.map((movie) => (
                                <ReviewCard
                                    key={movie.id}
                                    title={movie.title}
                                    movieImage={movie.imgUrl}
                                    userName={movie.userByUserCreatorId?.name || "Anonymous"}
                                    releaseDate={movie.releaseDate}
                                    
                                />
                            )
                            )}
                    </>
                )
            }

        </Container>
    );
};

export default ReviewsPage;