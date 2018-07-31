import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import classes from "../../styles/Landing.css";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div
          className={`${classes.landing} row align-items-center text-center`}
        >
          <div className="col-md-12">
            <h1 className="display-2 mb-4">Dev-Place</h1>
            <p className="lead">
              {" "}
              Create a developer profile/portfolio and share your experiences
              with other developers
            </p>
            <hr />
            <Link to="/register" className="btn btn-lg btn-info mr-2">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-lg btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
