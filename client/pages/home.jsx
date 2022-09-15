import React from 'react';

export default class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    fetch('/api/products')
      .then(res => res.json())
      .then(products => this.setState({ products }));
  }

  render() {
    return (
      <div className="container">
        <h1>Catalog</h1>
        <hr />
        <div className="row">
          {
            this.state.products.map(product => (
              <div key={product.productId} className="col-12 col-md-6 col-lg-4">

              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
