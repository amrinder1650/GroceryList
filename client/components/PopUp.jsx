import React from 'react';

const PopUp = (props) => {

  var styles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'black',
    padding: '50px',
    zIndex: 1000,
    color: 'white'
  }


  return (
    <div style={styles}>
      Item: {props.popUpDescription}
      <br></br>
      Amount: <input onChange={(event) => {props.changeAmount(event.target.value)}}></input>
      <br></br>
      <br></br>
      <button onClick={() => props.submit()}>Submit</button>
    </div>
  )
}

export default PopUp;