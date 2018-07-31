import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      uploadedFile: null,
      image: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      uploadedFile: this.state.uploadedFile,
      image: this.state.image
    };

    this.props.registerUser(newUser, this.props.history);
  };

  fileUploadHandler = e => {
    this.setState({
      uploadedFile: e.target.files[0]
    });
  };

  onImageUpload = () => {
    const { uploadedFile } = this.state;
    const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
    const cloudName = process.env.REACT_APP_CLOUD_NAME;
    const url =
      "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("upload_preset", uploadPreset);

    axios
      .post(url, formData)
      .then(res => {
        // console.log(res);
        if (res.data.secure_url !== "") {
          this.setState({
            image: res.data.secure_url
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { errors } = this.state;
    return (
      <div style={{ marginTop: "150px", minHeight: "100vh" }}>
        <div className="register mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-8 mx-auto w-75 formy">
                <h1 className="text-center">Sign Up</h1>
                <div className="mb-2">
                  <input type="file" onChange={this.fileUploadHandler} />
                  <button
                    className="btn btn-info btn-sm mt-1"
                    onClick={this.onImageUpload}
                  >
                    upload avatar
                  </button>
                </div>
                {this.state.image && (
                  <alert className="alert-success alert-md p-1 m-5">
                    Image uploaded successfuly{" "}
                  </alert>
                )}

                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextFieldGroup
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />

                  <TextFieldGroup
                    placeholder="Confirm Password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />

                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
