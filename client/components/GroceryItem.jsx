import React from 'react';
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { AiFillDownCircle } from "react-icons/Ai";
import { AiFillUpCircle } from "react-icons/Ai";
import PopUp from './PopUp.jsx';

class GroceryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popUpDescription: '',
      popUpAmount: 0
    }
  }

  editItem(description) {
    this.setState({
      popUpDescription: description
    })
  }

  changeAmount(amount) {
    this.setState({
      popUpAmount: amount
    });
  }

  submit() {
    this.props.addItemsToList(this.state.popUpAmount, this.state.popUpDescription);
    this.setState({
      popUpDescription: ''
    })
  }

  render() {
    return (
      <div>
        {this.props.groceryItem} {this.props.groceryAmount} <AiFillUpCircle onClick={() => this.props.topBottom('top', this.props.groceryItem)}/> <AiFillDownCircle onClick={() => this.props.topBottom('bottom', this.props.groceryItem)}/>
        <FiEdit onClick={() => this.editItem(this.props.groceryItem)}/> <MdDeleteForever onClick={() => this.props.moveItem(this.props.groceryAmount, this.props.groceryItem)}/>
        {this.state.popUpDescription != '' ? <PopUp popUpDescription={this.state.popUpDescription} changeAmount={this.changeAmount.bind(this)}
        submit={this.submit.bind(this)}/> : null}
      </div>
    )
  }
}

export default GroceryItem;