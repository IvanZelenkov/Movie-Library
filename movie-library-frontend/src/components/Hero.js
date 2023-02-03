import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import {ImageList, ImageListItem, Paper} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Box } from "@mui/material";

const Hero = ({ movies }) => {
	const navigate = useNavigate();

	return (
		<Box className ='movie-carousel-container'>
			<Carousel>
				{
					movies?.map((movie) =>{
						return(
							<Paper key={movie.imdbId}>
								<Box className="movie-card-container">
									<Box className="movie-card" sx={{ "--img": `url(${movie.backdrops[0]})` }}>
										<Box className="movie-detail">
											<Box className="movie-poster">
												<img src={movie.poster} alt=""/>
											</Box>
											<Box className="movie-title">
												<h4>{movie.title}</h4>
											</Box>
											<Box className="movie-buttons-container">
												<Link to={`/trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
													<Box className="play-button-icon-container">
														<FontAwesomeIcon className="play-button-icon" icon={faCirclePlay}/>
													</Box>
												</Link>
												<Box className="movie-review-button-container">
													<Button variant ="info" onClick={() => navigate(`/reviews/${movie.imdbId}`)}>Reviews</Button>
												</Box>
											</Box>
										</Box>
									</Box>
								</Box>
							</Paper>
						)
					})
				}
			</Carousel>
			<Box style={{ marginTop: "5vh"}}>
				<Box>
					<ImageList variant="masonry" cols={5} gap={8}>
						{movies?.map((movie) => (
							<ImageListItem key={movie.imdbId}>
								<img
									src={`${movie.poster}?w=164&h=164&fit=crop&auto=format`}
									alt={movie.title}
									loading="lazy"
									style={{ borderRadius: "3%"}}
								/>
							</ImageListItem>
						))}
					</ImageList>
				</Box>
			</Box>
		</Box>
	);
}

export default Hero;