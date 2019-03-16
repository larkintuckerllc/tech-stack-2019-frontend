import auth0JS, { Auth0DecodedHash, Auth0ParseHashError, Auth0UserProfile } from 'auth0-js';
import React, { PureComponent } from 'react';

interface State {
  authenticated: boolean;
  accessToken: string | null;
  error: boolean;
}

const auth0 = new auth0JS.WebAuth({
  audience: 'http://localhost:3000',
  clientID: 'PMIu1SF491eC4af1J2lYR2deZdEL8E8h',
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
      auth0.authorize();
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
      return null;
    }
    return <div>LOGGED IN</div>;
  }

  private handleClick = () => {
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
