import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";

import { getProfiles } from "../../actions/profileActions";
import ProfileFeed from "./ProfileFeed";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profilesContent;
    if (profiles === null || loading) {
      profilesContent = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profilesContent = <ProfileFeed profiles={profiles} />;
      } else {
        profilesContent = <h4>No Profiles Found ....</h4>;
      }
    }
    return (
      <div>
        <div className="profiles">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mx-auto">
                <h1 className="display-4 text-center">Developers' Profiles</h1>
                <p className="lead text-center">
                  Browse and Connect with Developers
                </p>
                {profilesContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
