import './Hero.css';
import { Box, ImageList, ImageListItem } from "@mui/material";

const WatchList = ({ movies }) => {
	return (
		<Box>
			<ImageList variant="masonry" cols={5} gap={8}>
				{movies.map((movie) => (
					<ImageListItem key={movie.imdbId}>
						<img
							src={`${movie.poster}?w=164&h=164&fit=crop&auto=format`}
							srcSet={`${movie.poster}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
							alt={movie.title}
							loading="lazy"
						/>
					</ImageListItem>
				))}
			</ImageList>
		</Box>
	);
}

export default WatchList;