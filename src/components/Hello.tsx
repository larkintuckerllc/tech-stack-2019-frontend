import React, { PureComponent } from 'react';
import { getHello } from '../apis/hello';

export default class Hello extends PureComponent {
  public state = {
    error: false,
    hello: '',
    loading: true,
  };

  public async componentDidMount() {
    try {
      const hello = await getHello();
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
