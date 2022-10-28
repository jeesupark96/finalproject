import React from 'react';
import Catalog from './pages/home';
import { parseRoute } from './lib';
import Header from './pages/navbar';
import SpotFinder from './pages/spot-finder';
import SpotDetails from './pages/spot-details';
import NotFound from './pages/not-found';
import NewSpotForm from './pages/new-spot';
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
      return <NewSpotForm/>;
    }
    if (route.path === 'spots') {
      const spotId = route.params.get('spotId');
      return <SpotDetails spotId={+spotId} />;
    }
    return <NotFound />;
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
