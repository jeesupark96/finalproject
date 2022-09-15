import React from 'react';
import Home from './pages/home';
import { parseRoute } from './lib';
import Map from './pages/map';
import NewEntry from './pages/new-entry';
import Header from './pages/navbar';
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
      return <Home />;
    }
    if (route.path === 'map') {
      return <Map />;
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
