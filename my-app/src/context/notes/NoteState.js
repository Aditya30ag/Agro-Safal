import { useState } from "react";
import Cartcontext from "./CartContext";

const Carttate = (props) => {
  const host = "http://localhost:5000";
  

  const [cart, setcart] = useState([]);

  const getCart = async () => {
    //Add api
    const response = await fetch(
      "http://localhost:5000/api/cart/fetchallcart",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token:
            localStorage.getItem('token'),
        },
      }
    );
    const json = await response.json();
    setcart(json);
  };

  const addCart = async (title, discription, tags) => {
    //Add api
    let url = `${host}/api/cart/addcart`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3M2U4ZTBiZTE1OWU0YzEwM2FhMDBhIn0sImlhdCI6MTcxODg3MjMwMH0.McxaJWkJMVBh9IHOSBYIUguh4JyHTf08oYTEMLBPfog",
      },
      body: JSON.stringify({ title, discription, tags }),
    });
    const json=await response.json();
    setcart(cart.concat(json));
  };

  const deleteCart = async (id) => {
    //Add api
    let url = `${host}/api/cart/deletecart/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3M2U4ZTBiZTE1OWU0YzEwM2FhMDBhIn0sImlhdCI6MTcxODg3MjMwMH0.McxaJWkJMVBh9IHOSBYIUguh4JyHTf08oYTEMLBPfog",
      },
    });
    const json=await response.json();
    console.log(json)
    const newCart = cart.filter((cart) => {
      return cart._id !== id;
    });
    setcart(newCart);
  };

  const updateCart = async (id, title, discription, tags) => {
    let url = `${host}/api/cart/updatecart/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3M2U4ZTBiZTE1OWU0YzEwM2FhMDBhIn0sImlhdCI6MTcxODg3MjMwMH0.McxaJWkJMVBh9IHOSBYIUguh4JyHTf08oYTEMLBPfog",
      },
      body: JSON.stringify({ title, discription, tags }),
    });
    const json=await response.json();
    console.log(json)

    let newCart=JSON.parse(JSON.stringify(cart));
    for (let i = 0; i < cart.length; i++) {
      const element = cart[i];
      if (element._id === id) {
        newCart[i].title = title;
        newCart[i].discription = discription;
        newCart[i].tags = tags;
        break;
      }
    }
    setcart(newCart);
  };
  return (
    <Cartcontext.Provider
      value={{ cart, addCart, deleteCart, updateCart, getCart }}
    >
      {props.children}
    </Cartcontext.Provider>
  );
};

export default Carttate;
