import React, {Component} from 'react';
import './Loading.scss';

export class Loading extends Component {
	render() {
		return this.props.issueInConnection ? <p className="error">Something went wrong on api server!</p> : <p className="loading">LOADING...</p>
	}
}

