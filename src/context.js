import React, { Component } from "react";
import axios from "axios";
import { constants } from "fs";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case "UPDATE_CONTACT":
      const test = action.payload;
      console.log(test);
      return {
        ...state,
        contacts: state.contacts.map(
          contact =>
            contact.id === action.payload.id
              ? (contact = action.payload)
              : contact
        )
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [
      // {
      //   id: 1,
      //   name: "John Doe",
      //   email: "johndoe@gmail.com",
      //   phone: "555-555"
      // },
      // {
      //   id: 2,
      //   name: "Karen Williams",
      //   email: "Karen@gmail.com",
      //   phone: "222-222"
      // },
      // {
      //   id: 3,
      //   name: "Benry Johnson",
      //   email: "benryjohnson@gmail.com",
      //   phone: "333-333"
      // }
    ],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  async componentDidMount() {
    console.log("Provider did mount");
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");

    this.setState({ contacts: res.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
