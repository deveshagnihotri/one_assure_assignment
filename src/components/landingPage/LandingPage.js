import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import {
  landingActions,
  handleSearchInput,
  handleClearSearchField,
} from "../../actions/LandingActions";
import NavBar from "../nav/NavBar";

const SearchView = React.lazy(() => import("./searchBox"));
const GridView = React.lazy(() => import("./gridView"));

class LandingPage extends Component {
  componentDidMount() {
    this.props.landingActions(this.props.page);
  }

  getApiData = (index) => {
    this.props.landingActions(index);
  };

  handleInputTextValue = (value) => {
    this.props.handleSearchInput(value);
  };

  render() {
    return (
      <div>
        {/* <NavBar /> */}
        <Suspense fallback={<div>Loading...</div>}>
          <div style={styles.searchContainer}>
            <SearchView
              value={this.props.input}
              handleInputValue={(value) => this.handleInputTextValue(value)}
            />
            {this.props.input !== "" ? (
              <div
                onClick={() => this.props.handleClearSearchField()}
                style={styles.clearBtn}
              >
                clear
              </div>
            ) : null}
          </div>
          {this.props.initialData.length !== 0 ? (
            <GridView
              data={this.props.initialData}
              totalPage={this.props.data.total_pages}
              handlePagination={(index) => this.getApiData(index)}
              page={this.props.page}
            />
          ) : (
            <h1>No result found!</h1>
          )}
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = ({ LandingReducer }) => {
  const { name, isLoading, data, page, input, initialData } = LandingReducer;
  return {
    name,
    isLoading,
    data,
    page,
    initialData,
    input,
  };
};
export default connect(mapStateToProps, {
  landingActions,
  handleSearchInput,
  handleClearSearchField,
})(LandingPage);

const styles = {
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5px",
  },
  clearBtn: {
    backgroundColor: "#E88075",
    padding: 5,
    borderRadius: 5,
  },
};
