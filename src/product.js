import React from "react";
import { connect } from "react-redux";
import { post } from "./productactions";
import { productgetapi } from "./api";
import Errors from "./errorhandling";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { forwardRef } from "react";
import MaterialTable from "material-table";

import { tableIcons } from './Util/ui-reference';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }
  componentDidMount() {
    // productgetapi(this.props);
  }
  render() {
    const { error, loading, products } = this.props;
    if (error) {
      console.log(error);
      return <Errors error={error} />;
    }
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <React.Fragment>
        <h1>State</h1>
        <MaterialTable
          icons={tableIcons}
          title="Editable Preview"
          columns={[
            { title: "Id", field: "id", editable: "never" },
            { title: "State", field: "stateName" },
          ]}
          data={products}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  this.setState({ ...this.state.data, newData });
                  this.props.dispatch(post(this.state.data));
                  resolve();
                }, 1000);
              }),
            //   onRowUpdate: (newData, oldData) =>
            //     new Promise((resolve, reject) => {
            //       setTimeout(() => {
            //         const dataUpdate = [...data];
            //         const index = oldData.tableData.id;
            //         dataUpdate[index] = newData;
            //         setData([...dataUpdate]);

            //         resolve();
            //       }, 1000);
            //     }),
            //   onRowDelete: (oldData) =>
            //     new Promise((resolve, reject) => {
            //       setTimeout(() => {
            //         const dataDelete = [...data];
            //         const index = oldData.tableData.id;
            //         dataDelete.splice(index, 1);
            //         setData([...dataDelete]);

            //         resolve();
            //       }, 1000);
            //     }),
          }}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error,
});

export default connect(mapStateToProps)(ProductList);
