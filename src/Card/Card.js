import React, {Component} from 'react';
import './Card.scss';
import { favoriteStore } from '../Config/Store';


export class Card extends Component {
	handleSavingToFavorite(event) {
		let clickedElement = event.target;

		// Prepare proper class if photo is saved in favorite or not:
		if (this.props.isSaved) {
			if (this.props.albumType !== 'favorite') {
				clickedElement.classList.remove('saved');
			}

			this.buildActionToStore(false);
			return;
		}
		else {
			clickedElement.classList.add('saved');
			this.buildActionToStore(true);
			return;
		}
	}

	// Build action object which we send to store:
	buildActionToStore(isSaved) {
		let action = {};
		if (isSaved) {
			action = {
				type: 'ADD',
				photo: {...this.props.photo}
			};
		}
		else {
			action = {
				type: 'REMOVE',
				photo: {...this.props.photo}
			};
		}

		favoriteStore.dispatch(action);

		this.props.updateState();
	}

	properClassOnload() {
		return this.props.isSaved ? 'saved' : '';
	}

	render() {
		return (
			<div className="card">
				<img src={this.props.photo.thumbnailUrl} className="card-img-top" alt={this.props.photo.title}/>

				<div className="card-body">
					<p className="card-text">{this.props.photo.title}</p>
				</div>

				<span className={`mark-fav ${this.properClassOnload()}`} onClick={(event) => {this.handleSavingToFavorite(event)}}>
					<i className="far fa-star unmarked"/>
					<i className="fas fa-star marked"/>
				</span>
			</div>
		)
	}
}
