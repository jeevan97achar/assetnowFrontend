import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "./productactions";
import Errors from "./errorhandling";

class ProductList1 extends React.Component {
  componentDidMount() {
    // this.props.dispatch(fetchProducts());
  }

  render() {
    const { error, loading, products } = this.props;

    if (error) {
      console.log(error);
      return (
       <Errors error={error}/>
      );
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <React.Fragment>
        <h1>product1</h1>
        <ul>
          {products.map((product) => (
            <li>{product.stateName}</li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error,
});

export default connect(mapStateToProps)(ProductList1);
