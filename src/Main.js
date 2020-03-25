import React, {Component} from 'react';
import './Main.scss';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { Album } from './Album/Album';
import { Favorite } from './Favorite/Favorite';


export class Main extends Component {
	render() {
		return (
			<Container>
				<Router>
					<Switch>
						<Route exact={true} path="/">
							<Tabs defaultIndex={0}>
								<TabList>
									<Tab><i className="fas fa-star"/> Favorite</Tab>

									{Object.keys(this.props.albums).map((albumID, key) =>
										<Tab key={key}><i className="fas fa-images"/> Album {albumID}</Tab>
									)}
								</TabList>

								<TabPanel>
									<Favorite />
								</TabPanel>

								{Object.keys(this.props.albums).map((albumID, key) =>
									<TabPanel key={key}>
										<Album
											id={albumID}
											photos={this.props.albums[albumID]}
										/>
									</TabPanel>
								)}
							</Tabs>
						</Route>
						<Route>
							<p>Oopps 404!</p>
						</Route>
					</Switch>
				</Router>
			</Container>
		)
	}
}
