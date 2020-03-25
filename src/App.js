import React, {Component} from 'react';
import './App.scss';
import { Main } from './Main';
import { Loading } from './Loading/Loading';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isDataLoaded: false,
			isThereAnError: false,
			wantedAlbums: [1, 2, 3, 4, 5],
			albums: {}
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/photos')
		.then((response) => {
			if (!response.ok) {
				// Handle error and show proper screen on the user:
				this.setState({
					isThereAnError: true
				});

				throw new Error('[fetch data] Something went wrong on api server!');
			}
			else {
				return response.json();
			}
		})
		.then((data) => {
			for(let index = 0; index < data.length; index++) {
				if (data[index].albumId > 5) {
					// Show Main Component and break the loop:
					this.setState({
						isDataLoaded: true
					});
					break;
				}

				if (this.state.wantedAlbums.indexOf(data[index].albumId) > -1) {
					this.setState({
						albums: {
							...this.state.albums,
							[data[index].albumId]: {
								...this.state.albums[data[index].albumId],
								[data[index].id]: data[index]
							}
						}
					})
				}
			}
		})
		.catch((error) => {
			throw(error);
		})
	}

	render() {
		return (
			<>{
				this.state.isDataLoaded ?
				<Main albums={this.state.albums}/>
				:
				<Loading issueInConnection={this.state.isThereAnError} />
			}</>
		)
	}
}

export default App;
