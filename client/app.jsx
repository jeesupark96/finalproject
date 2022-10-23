import React from 'react';
import Catalog from './pages/home';
import PostCard from './pages/card';
import { parseRoute } from './lib';
import Map from './pages/map';
import NewEntry from './pages/new-entry';
import Header from './pages/navbar';
import SpotFinder from './pages/spot-finder';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(location.hash)
      });
    });
  }

  renderPage() {
    const { route } = this.state;

    if (route.path === 'home') {
      return <Catalog />;
    }
    if (route.path === 'map') {
      return <SpotFinder />;
    }
    if (route.path === 'newentry') {
      return <NewEntry/>;
    }
  }

  render() {
    return (
    <>
        <Header />
    {this.renderPage()}
    </>
    );
  }
}
