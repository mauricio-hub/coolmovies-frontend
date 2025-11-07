import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Rating,
    Typography,
    Paper,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import { css } from '@emotion/react';



interface ReviewFormProps {
    onSubmit: (reviewData: ReviewFormData) => void;
    movies: { id: string; title: string }[];
    loading?: boolean;
}

export interface ReviewFormData {
    movieId: string;
    title: string;
    body: string;
    rating: number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, movies, loading = false }) => {
    const [movieId, setMovieId] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [rating, setRating] = useState<number | null>(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!movieId || !title || !body || !rating) {
            alert("error")
            return
        }
        onSubmit({
            movieId,
            title,
            body,
            rating
        })

        setMovieId('')
        setTitle('')
        setBody('')
        setRating(0)
    }


    return (
        <>
            <Typography variant="h5" component="h2" gutterBottom>
                Add a Review
            </Typography>

            <form onSubmit={handleSubmit}>

                <FormControl fullWidth>
                    <InputLabel id="movie-select-label">Select Movie</InputLabel>
                    <Select
                        labelId="movie-select-label"
                        value={movieId}
                        label="Select Movie"
                        onChange={(e) => setMovieId(e.target.value)}
                        disabled={loading}
                    >
                        {movies.map((movie) => (
                            <MenuItem key={movie.id} value={movie.id}>
                                {movie.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>



                <TextField
                    fullWidth
                    label="Review Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                    placeholder="e.g., Amazing movie!"
                />



                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Review"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    disabled={loading}
                    placeholder="Write your review here..."
                />



                <Typography component="legend">Rating</Typography>
                <Rating
                    name="rating"
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                    disabled={loading}
                    size="medium"
                />


                <Button
                    type="submit"
                    variant="contained"
             
                    fullWidth
                    disabled={loading}
                    color="primary"
                >
                    {loading ? 'Submitting...' : 'Submit Review'}
                </Button>
            </form>

        </>
    )

}

const styles = {
    container: css({
        padding: '24px',
        marginBottom: '32px',
        maxWidth: '600px',
    }),
    formGroup: css({
        marginBottom: '20px',
    }),
    submitButton: css({
        marginTop: '8px',
    }),
};

export default ReviewForm;