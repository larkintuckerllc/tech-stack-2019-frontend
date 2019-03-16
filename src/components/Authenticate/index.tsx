import auth0JS, { Auth0DecodedHash, Auth0ParseHashError, Auth0UserProfile } from 'auth0-js';
import React, { PureComponent } from 'react';

interface State {
  authenticated: boolean;
  accessToken: string | null;
  error: boolean;
}

const auth0 = new auth0JS.WebAuth({
  audience: 'http://your-api-endpoint',
  clientID: 'PLoyappMGSqnhT6dKMPYmjpW3EpOSwiw',
  domain: 'larkintuckerllc.auth0.com',
  redirectUri: 'http://localhost:3001',
  responseType: 'token id_token',
  scope: 'openid profile',
});

export default class Authenticated extends PureComponent<{}, State> {
  public state = {
    accessToken: null,
    authenticated: false,
    error: false,
  };

  public componentDidMount() {
    const hash = window.location.hash;
    if (hash === '') {
      return;
    }
    auth0.parseHash(this.handleParseHash);
  }

  public render() {
    const { authenticated, accessToken, error } = this.state;
    if (error) {
      return <div>Error</div>;
    }
    if (!authenticated || accessToken === null) {
      return <button onClick={this.handleLoginClick}>Login</button>;
    }
    return <button onClick={this.handleLogoutClick}>Logout</button>;
  }

  private handleLoginClick = () => {
    auth0.authorize();
  };

  private handleLogoutClick = () => {
    auth0.logout({
      returnTo: 'http://localhost:3001',
    });
  };

  private handleParseHash = (
    error: Auth0ParseHashError | null,
    decodedHash: Auth0DecodedHash | null
  ) => {
    window.location.hash = '';
    if (error !== null) {
      this.setState({ error: true });
      return;
    }
    if (decodedHash !== null && decodedHash.accessToken !== undefined) {
      const { accessToken } = decodedHash;
      auth0.client.userInfo(accessToken, this.handleUserInfo);
      this.setState({ accessToken });
    } else {
      this.setState({ error: true });
    }
  };

  private handleUserInfo = (
    error: Auth0ParseHashError | null,
    userProfile: Auth0UserProfile | null
  ) => {
    if (error !== null) {
      this.setState({ error: true });
      return;
    }
    window.console.log(userProfile);
    this.setState({ authenticated: true });
  };
}
