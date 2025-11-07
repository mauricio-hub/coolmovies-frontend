import { Alert, Box, CircularProgress, Container, Grid, Typography } from "@mui/material";
import ReviewCard from "../features/example/components/ReviewCard";
import { useAppDispatch, useAppSelector } from "../state/store"
import { createReview, fetchMovies, fetchReviews } from "../features/example/state/movieSlice"
import { useEffect } from "react";

import ReviewForm from "../features/example/components/ReviewForm";


const ReviewsPage: React.FC = () => {

    const { movies, loading, error, reviews } = useAppSelector((state) => state.movies)


    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchMovies())
        dispatch(fetchReviews())

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

    const handleReviewSubmit = (reviewData: any) => {
        dispatch(createReview(reviewData))
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" >
                    Movie Reviews
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Share your thoughts about your favorite movies
                </Typography>
            </Box>


            <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '100%', maxWidth: 600 }}>
                    <ReviewForm
                        onSubmit={handleReviewSubmit}
                        movies={movies}
                        loading={false}
                    />
                </Box>
            </Box>


            {
                reviews.length === 0 ? (
                    <Typography>No reviews yet.</Typography>
                ) : (

                    <Grid container spacing={3}>

                        {reviews.map((item) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                                <ReviewCard
                                    title={item.title}
                                    body={item.body}
                                    movieImage={item.movieByMovieId?.imgUrl}
                                    movieTitle={item.movieByMovieId?.title}
                                    userName={item.userByUserReviewerId?.name || "Anonymous"}
                                    rating={item.rating}
                                />
                            </Grid>
                        ))}
                    </Grid>

                )}

        </Container>
    );
};

export default ReviewsPage;



