import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { loginUser as loginUserImp, getUserState } from "../../actions";
import { LoginWrapper, Input, Button } from "./LoginPageStyles";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: ""
    };
  }

  onSubmit = async () => {
    const { loginUser } = this.props;
    const { login, password } = this.state;
    await loginUser(login, password);
  };

  onChangeIdentifier = e => {
    this.setState({
      login: e.target.value
    });
  };

  onChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  render() {
    const { login, value } = this.state;

    return (
      <LoginWrapper>
        <Input
          placeholder="Write login"
          value={login}
          onChange={this.onChangeIdentifier}
        />
        <Input
          placeholder="Write password"
          value={value}
          onChange={this.onChangePassword}
        />
        <Button onClick={this.onSubmit}>check</Button>
      </LoginWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUserState(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: bindActionCreators(loginUserImp, dispatch)
  };
};

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
