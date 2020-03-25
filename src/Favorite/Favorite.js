import React, {Component} from 'react';
import './Favorite.scss';
import { Container } from 'react-bootstrap';
import { Card } from '../Card/Card';
import { favoriteStore } from '../Config/Store';

export class Favorite extends Component {
	constructor(props) {
		super(props);

		this.state = {
			photos: {},
			isFavoriteLoaded: false,
		}
	}

	componentDidMount() {
		this.updatePhotos();
	}

	updatePhotos() {
		let favoritePhotos = favoriteStore.getState().photos;

		this.setState({
			photos: {...favoritePhotos}
		}, () => {
			this.setState({isFavoriteLoaded: true});
		})
	}

	getSavedPhoto(photoID) {
		if (this.state.getStorePhotos) {
			photoID = parseInt(photoID, 10);

			for (const index in this.state.getStorePhotos) {
				if (this.state.photos[index].id === photoID) {
					return true;
				}
				else {
					continue;
				}
			}
		}
	}

	render() {
		return (
			<>{this.state.isFavoriteLoaded &&
				<>
					<h2>Favorite Photos</h2>

					<Container className="container-photos">
						{this.state.photos && Object.keys(this.state.photos).map((photoID, key) =>
							<Card
								key={key}
								photo={this.state.photos[photoID]}
								isSaved={true}
								albumType={'favorite'}
								updateState={this.updatePhotos.bind(this)}
							/>
						)}
					</Container>
				</>
			}</>
		)
	}
}
