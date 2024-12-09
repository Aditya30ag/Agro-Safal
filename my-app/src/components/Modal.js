import React from "react";

export default function Modal(props) {
  
  return (
    <div className="mb-3">
      <img name="img"src={props.notes.img} height="200px" width="100%" style={{borderRadius:"8px",marginBottom:"20px"}} className="card-img-top" alt="..."/>
      <div name="name" style={{fontSize:"20px",fontWeight:"500"}} onChange={props.onchange}>{props.notes.name}</div>
      <div name="title" onChange={props.onchange}>Description:  {props.notes.title}</div>        
      <div name="seller" onChange={props.onchange}>Seller-Name: {props.notes.seller}</div>
      <div name="price" onChange={props.onchange}>Price: {props.notes.price}</div>
    </div>
  );
}
