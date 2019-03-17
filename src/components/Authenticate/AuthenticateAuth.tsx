import React, { PureComponent } from 'react';
import { getAuth } from '../../apis/auth';

interface Props {
  accessToken: string;
}

export default class AuthenticateAuth extends PureComponent<Props> {
  public state = {
    error: false,
    hello: '',
    loading: true,
  };

  public async componentDidMount() {
    const { accessToken } = this.props;
    try {
      const hello = await getAuth(accessToken);
      this.setState({
        hello,
        loading: false,
      });
    } catch (err) {
      this.setState({
        error: true,
        loading: false,
      });
    }
  }

  public render() {
    const { error, hello, loading } = this.state;
    if (loading) {
      return <div>Loading</div>;
    }
    if (error) {
      return <div>Error</div>;
    }
    return <div>{hello}</div>;
  }
}
