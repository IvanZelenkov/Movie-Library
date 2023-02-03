import React from 'react';
import { Box } from "@mui/material";
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

const Trailer = () => {
	let params = useParams();
	let key = params.youTubeTrailerId;

	return (
		<Box style={{ height: "90vh" }}>
			{key != null ?
				(
					<ReactPlayer
						controls="true"
						playing={true}
						url ={`https://www.youtube.com/watch?v=${key}`}
						width = '100%'
						height='100%'/>
				) :
				null
			}
		</Box>
	);
}

export default Trailer;