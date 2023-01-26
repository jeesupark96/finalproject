import React from 'react';
import Catalog from './pages/home';
import { parseRoute } from './lib';
import Header from './pages/navbar';
import SpotFinder from './pages/spot-finder';
import SpotDetails from './pages/spot-details';
import NotFound from './pages/not-found';
import NewSpotForm from './pages/new-spot';
import decodeToken from './lib/decode-token';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(location.hash),
      user: null,
      isAuthorizing: true

    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(location.hash)
      });
    });
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
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
