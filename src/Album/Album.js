import React, {Component} from 'react';
import './Album.scss';
import { Container } from 'react-bootstrap';
import { Card } from '../Card/Card';
import { favoriteStore } from '../Config/Store';

export class Album extends Component {
	constructor(props) {
		super(props);

		this.state = {
			getStorePhotos: {},
			albumPhotos: {},
			isContentLoaded: false
		}
	}

	componentDidMount() {
		// Get all data from Store:
		let favoritePhotos = favoriteStore.getState().photos;

		// Save in state all photos in Store:
		this.setState({
			getStorePhotos: {...favoritePhotos}
		});

		// Save in state all photos needed for album:
		this.setState({
			albumPhotos: {...this.props.photos}
		}, () => {
			// After that display content:
			this.setState({
				isContentLoaded: true
			});
		});
	}

	getSavedPhoto(photoID) {
		if (this.state.getStorePhotos) {
			photoID = parseInt(photoID, 10);

			for (const index in this.state.getStorePhotos) {
				if (this.state.getStorePhotos[index].id === photoID) {
					return true;
				}
				else {
					continue;
				}
			}
		}
	}

	updatePhotos() {
		let favoritePhotos = favoriteStore.getState().photos;

		this.setState({
			getStorePhotos: {...favoritePhotos}
		})
	}

	render() {
		return (
			<>
				{this.state.isContentLoaded &&
					<>
						<h2>Album {this.props.id}</h2>

						<Container className="container-photos">
							{Object.keys(this.state.albumPhotos).map((photoID, key) =>
								<Card
									key={key}
									photo={this.state.albumPhotos[photoID]}
									isSaved={this.getSavedPhoto(photoID)}
									albumType={'stock'}
									updateState={this.updatePhotos.bind(this)}
								/>
							)}
						</Container>
					</>
				}
			</>
		)
	}
}
