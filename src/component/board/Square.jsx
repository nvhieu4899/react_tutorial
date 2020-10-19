import React from 'react';

const Style = {
  width: "50px",
  height: "50px",
};

function Square({value, onClick, highlight}) {
  return (
    <button
            className={"btn btn-outline-secondary " + (value === 'X' ? " text-danger " : " text-primary ")}
            style={Style} onClick={() => onClick()}>
            <span className={highlight === true ? " badge badge-success " : undefined}>
                {value}
            </span>
    </button>
  );

}

export default Square;
