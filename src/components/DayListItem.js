import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  
 const classNameList = classNames("day-list__item", {
   "day-list__item--selected": props.selected,
   "day-list__item--full": !props.spots
 })
  
  return (
    <li className={classNameList} onClick={() => props.setDay(props.name)} selected={props.selected} data-testid={props.name}>
      <h2 className="text--regular">{props.name} </h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

const formatSpots = (num) => {
  if (num === 0) {
    return "no spots remaining"
  } else if (num === 1) {
    return "1 spot remaining"
  } else {
    return`${num} spots remaining`
  }
}