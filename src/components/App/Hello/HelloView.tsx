import React, { PureComponent } from 'react';
import { HelloData, Mutations } from '../Hello';

interface Props extends Mutations {
  data?: HelloData;
  error: boolean;
  loading: boolean;
}

class HelloView extends PureComponent<Props> {
  public render() {
    const { counterDecrement, counterIncrement, error, loading, data } = this.props;
    if (loading) {
      return <div>fetching</div>;
    }
    if (error || data === undefined) {
      return <div>errored</div>;
    }
    const { counter, hello } = data;
    return (
      <div>
        <div>hello {hello}</div>
        <div>{counter.toString()}</div>
        <div>
          <button type="button" onClick={counterDecrement}>
            -
          </button>
          <button type="button" onClick={counterIncrement}>
            +
          </button>
        </div>
      </div>
    );
  }
}

export default HelloView;
