import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import GroceryList from './components/GroceryList.jsx';
import AddGrocery from './components/AddGrocery.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }

  getList() {
    $.ajax({
      url: '/groceries',
      type: 'GET',
      success: (result) => {
        this.setState({
          list: [...result]
        });
      },
      error: function() {
        console.log('Error ajax get')
      }
    });
  }

  addItemsToList(quantity, description) {
    description = description.toLowerCase();
    if (quantity > 0 && description != '') {
      $.ajax({
        url: '/groceries',
        type: 'POST',
        data: {data: {quantity: quantity, description: description, done: false}},
        success: () => {
          this.getList();
        },
        error: function() {
          console.log('Error ajax post')
        }
      });
    }
  }

  moveItem(quantity, description) {
    // poorly labeled, should be deleteItem. I only named it move because it moves item to historical
    $.ajax({
      url: '/move',
      type: 'POST',
      data: {data: {quantity: quantity, description: description}},
      success: () => {
        this.getList();
      },
      error: function() {
        console.log('Error ajax post')
      }
    });
  }

  deleteEverything() {
    $.ajax({
      url: '/empty',
      type: 'PUT',
      success: () => {
        this.getList();
      },
      error: function() {
        console.log('Error ajax post')
      }
    });
  }

  topBottom(location, description) {
    $.ajax({
      url: '/groceries',
      type: 'PUT',
      data: {data: {location: location, description: description}},
      success: () => {
        this.getList();
      },
      error: function() {
        console.log('Error ajax post')
      }
    });
  }

  componentDidMount(){
    this.getList();
  }

  render () {
    return (
      <div>
        <h1>GROCERY LIST</h1>
        <button onClick={() => this.deleteEverything()}>EMPTY</button>
        <AddGrocery addItemsToList={this.addItemsToList.bind(this)}/>
        <br></br>
        <b>ITEM</b> <b>AMOUNT</b>
        <GroceryList groceryList={this.state.list} moveItem={this.moveItem.bind(this)}
        addItemsToList={this.addItemsToList.bind(this)}
        topBottom={this.topBottom.bind(this)}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));