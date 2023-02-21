import React from 'react';
import GroceryItem from './GroceryItem.jsx';

const GroceryList = (props) => {
  return (
    <div className="groceries">
      {props.groceryList.map(item =>
        <GroceryItem key={item.id} groceryItem={item.description} groceryAmount={item.quantity}
          done={item.done} moveItem={props.moveItem} addItemsToList={props.addItemsToList}
          topBottom={props.topBottom}
        />
      )}
    </div>
  )
}

export default GroceryList;