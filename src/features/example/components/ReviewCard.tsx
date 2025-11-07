import React from "react";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Rating, Typography } from "@mui/material";



interface ReviewCardProps {
  title: string;
  body?: string;
  rating?: number;
  movieImage?: string;
  movieTitle?: string;
  userName: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  title, body, rating, movieImage, movieTitle, userName
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={movieImage}
          alt={`${movieTitle || title} poster`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {body}
          </Typography>
         {/*  <Typography variant="body2" color="text.secondary" gutterBottom>
            Release Date: {releaseDate}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Rating
          name="rating"
          value={rating || 0}
          readOnly
          size="small"
          aria-label={`Rating: ${rating} out of 5 stars`}
        />
        <Typography variant="body2" sx={{ ml: 1 }} color="text.secondary">
          {rating}/5
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Movie: {movieTitle || 'Unknown'} | By: {userName}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default ReviewCard;