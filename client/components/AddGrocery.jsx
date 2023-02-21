import React from 'react';

class AddGrocery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      quantity: 0
    }
  }

  descriptionText(input) {
    this.setState({description: input.target.value})
  }

  quantityCount(input) {
    this.setState({quantity: input.target.value})
  }

  render () {
    return (
      <div>
        <br></br>
        Description: <input type="text" onChange={(input) => this.descriptionText(input)}/>
        <br></br>
        Quantity: <input type="number" onChange={(input) => this.quantityCount(input)}/>
        <button onClick={() => {this.props.addItemsToList(this.state.quantity, this.state.description)}}>Add Item</button>
      </div>
    );
  }
}

export default AddGrocery;