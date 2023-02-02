import React from 'react';
import axios from "axios";
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from './ReviewForm';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
	const reviewText = useRef();
	let params = useParams();
	const movieId = params.movieId;

	useEffect(() => {
		getMovieData(movieId);
	},[])

	const addReview = async (event) =>{
		event.preventDefault();

		const review = reviewText.current;
		try {
			const response = await axios.post(
				"http://localhost:8080/api/v1/reviews",
				{
					reviewBody: review.value,
					imdbId: movieId
				}
			);
			const updatedReviews = [...reviews, { body: review.value }];
			review.value = "";
			setReviews(updatedReviews);
		} catch(error) {
			console.error(error);
		}
	}

	return (
		<Container>
			<Row>
				<Col><h3>Reviews</h3></Col>
			</Row>
			<Row className="mt-2">
				<Col>
					<img src={movie?.poster} alt=""/>
				</Col>
				<Col>
					{
						<>
							<Row>
								<Col>
									<ReviewForm handleSubmit={addReview} reviewText={reviewText} labelText="Write a Review?"/>
								</Col>
							</Row>
							<Row>
								<Col>
									<hr/>
								</Col>
							</Row>
						</>
					}
					{
						reviews?.map((review, id) => {
							return(
								<div key={id}>
									<Row>
										<Col>{review.body}</Col>
									</Row>
									<Row>
										<Col>
											<hr/>
										</Col>
									</Row>
								</div>
							)
						})
					}
				</Col>
			</Row>
			<Row>
				<Col>
					<hr/>
				</Col>
			</Row>
		</Container>
	);
}

export default Reviews;