import React from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

class PriceInputWidget extends React.Component {
  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      number: value.number || 0,
      currency: value.currency || 'rmb',
    };
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const { value } = nextProps;
      this.setState(value);
    }
  }

  handleNumberChange = e => {
    const number = parseInt(e.target.value || 0, 10);
    // @HACK
    /* eslint-disable no-restricted-globals */
    if (isNaN(number)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  };

  handleCurrencyChange = currency => {
    if (!('value' in this.props)) {
      this.setState({ currency });
    }
    this.triggerChange({ currency });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { size } = this.props;
    const { state } = this;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={state.number}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
          value={state.currency}
          size={size}
          style={{ width: '32%' }}
          onChange={this.handleCurrencyChange}
        >
          <Option value="rmb">RMB</Option>
          <Option value="dollar">Dollar</Option>
        </Select>
      </span>
    );
  }
}

export default PriceInputWidget;
