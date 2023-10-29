import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class DropdownComponent extends React.Component {
 constructor(props,options) {
    super(props);
    this.state = {
      selectedOption: this.props.options[0],
    };
 }

 render() {


    const onSelect = (option) => {
      this.setState({ selectedOption: option });
      console.log(option)
    };

    return (
      <div>
        <Dropdown options={this.props.options} onChange={onSelect} value={this.state.selectedOption} />
      </div>
    );
 }
}

export default DropdownComponent;