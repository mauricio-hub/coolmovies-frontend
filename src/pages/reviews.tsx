import { Alert, CircularProgress, Container, Paper, Typography } from "@mui/material";
import ReviewCard from "../features/example/components/ReviewCard";
import { useAppSelector } from "../state/store"
import { createReview, fetchMovies, fetchReviews } from "../features/example/state/movieSlice"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ReviewForm from "../features/example/components/ReviwForm";


const ReviewsPage: React.FC = () => {

    const { movies, loading, error, reviews } = useAppSelector((state) => state.movies)


    const dispatch = useDispatch()

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
        console.log('submit')
        dispatch(createReview(reviewData))
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
                reviews.length === 0 ? (
                    <Typography>No reviews yet.</Typography>
                ) : (
                    <>
                        {
                            reviews.map((item) => (
                                <ReviewCard
                                    key={item.id}
                                    title={item.title}
                                    body={item.body}
                                    movieImage={item.movieByMovieId?.imgUrl}
                                    movieTitle={item.movieByMovieId?.title}
                                    userName={item.userByUserReviewerId?.name || "Anonymous"}
                                    rating={item.rating}
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



