/// <reference path="../typings/tsd.d.ts" />

// TODO: Figure out how to import these in the browser. https://github.com/tomastrajan/react-typescript-webpack or simply RequireJS.
import * as React from "react"
import * as ReactDOM from "react-dom"

interface NewContact {
  description?: string,
  emailAddress?: string,
  name: string
}

interface SavedContact extends NewContact {
  key: number
}

interface State {
  contacts?: Array<SavedContact>
  newContact?: NewContact
}

interface ValueFormEvent extends React.FormEvent {
  target: ValueEventTarget
}

interface ValueEventTarget extends EventTarget {
  value: string
}

class Startup {
  public static main(): void {
    // TODO: Add some startup code in here.
  }
}

const ContactForm = React.createClass({
  displayName: "ContactForm",

  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    value: React.PropTypes.object.isRequired
  },

  onDescriptionChange: (event: ValueFormEvent) => {
    this.props.onChange(Object.assign({}, this.props.value, { description: event.target.value }))
  },

  onEmailAddressChange: (event: ValueFormEvent) => {
    this.props.onChange(Object.assign({}, this.props.value, { emailAddress: event.target.value }))
  },

  onFormSubmit: (event: React.FormEvent) => {
    event.preventDefault()
    this.props.onSubmit(this.props.value)
  },

  onNameChange: (event: ValueFormEvent) => {
    this.props.onChange(Object.assign({}, this.props.value, { name: event.target.value }))
  },

  render: () => {
    return (
      React.createElement("form", {
        className: "form-horizontal",
        onSubmit: this.onFormSubmit
      },
        React.createElement("div", { className: "form-group" },
          React.createElement(
            "label", {
              className: "control-label col-sm-3",
              htmlFor: "name"
            },
            "Name"
          ),
          React.createElement("div", { className: "col-sm-9" },
            React.createElement(
              "input", {
                className: "form-control",
                id: "name",
                onChange: this.onNameChange,
                placeholder: "Required",
                required: true,
                type: "text",
                value: this.props.value.name
              }
            )
          )
        ),
        React.createElement("div", { className: "form-group" },
          React.createElement(
            "label", {
              className: "control-label col-sm-3",
              htmlForm: "emailAddress"
            },
            "Email address"
          ),
          React.createElement("div", { className: "col-sm-9" },
            React.createElement("input", {
              className: "form-control",
              id: "emailAddress",
              onChange: this.onEmailAddressChange,
              type: "email",
              value: this.props.value.emailAddress
            })
          )
        ),
        React.createElement("div", { className: "form-group" },
          React.createElement(
            "label", {
              className: "control-label col-sm-3",
              htmlFor: "description"
            },
            "Description"
          ),
          React.createElement("div", { className: "col-sm-9" },
            React.createElement(
              "textarea", {
                className: "form-control",
                id: "description",
                onChange: this.onDescriptionChange,
                rows: 2,
                value: this.props.value.description
              }
            )
          )
        ),
        React.createElement("div", { className: "form-group" },
          React.createElement("div", { className: "col-sm-offset-3 col-sm-9" },
            React.createElement(
              "button", {
                className: "btn btn-primary",
                type: "submit"
              },
              "Add contact"
            )
          )
        )
      )
    )
  }
})

const ContactRow = React.createClass({
  displayName: "ContactRow",

  propTypes: {
    name: React.PropTypes.string.isRequired,
    emailAddress: React.PropTypes.string.isRequired,
    description: React.PropTypes.string
  },

  render: () => {
    return (
      React.createElement("tr", {},
        React.createElement("td", {}, this.props.name),
        React.createElement("td", {},
          React.createElement("a", { href: "mailto:" + this.props.emailAddress }, this.props.emailAddress)
        ),
        React.createElement("td", {}, this.props.description)
      )
    )
  }
})

const ContactsView = React.createClass({
  displayName: "ContactsView",

  propTypes: {
    contacts: React.PropTypes.array.isRequired,
    newContact: React.PropTypes.object.isRequired,
    onNewContactChange: React.PropTypes.func.isRequired,
    onNewContactSubmit: React.PropTypes.func.isRequired
  },

  render: () => {
    const contactRows = (<Array<SavedContact>>this.props.contacts)
      .filter(contact => {
        return contact.emailAddress == null
      })
      .sort((contactA, contactB) => {
        if (contactA.name > contactB.name) {
          return 1
        }

        if (contactA.name < contactB.name) {
          return -1
        }

        return 0
      })
      .map(contact => {
        return React.createElement(ContactRow, contact)
      })

    return (
      React.createElement("div", { className: "container" },
        React.createElement("h1", {}, "Contacts"),
        React.createElement("table", { className: "table" },
          React.createElement("thead", {},
            React.createElement("tr", {},
              React.createElement("th", {}, "Name"),
              React.createElement("th", {}, "Email address"),
              React.createElement("th", {}, "Description")
            )
          ),
          React.createElement("tbody", {}, contactRows)
        ),
        React.createElement(ContactForm, {
          value: this.props.newContact,
          onChange: this.props.onNewContactChange,
          onSubmit: this.props.onNewContactSubmit
        })
      )
    )
  }
})

const emptyContact = {
  description: "",
  emailAddress: "",
  name: ""
}

const newContactSubmitted = (contact: NewContact) => {
  const contactWithKey: SavedContact = Object.assign({}, contact, { key: state.contacts.length + 1 })
  const updatedContacts = state.contacts.concat(contactWithKey)

  const stateChanges = {
    contacts: updatedContacts,
    newContact: Object.assign({}, emptyContact)
  }

  setState(stateChanges)
}

const setState = (changes: State) => {
  Object.assign(state, changes);

  // Don't contaminate the state with the callback functions.
  const stateWithCallbacks = Object.assign({}, state, {
    onNewContactChange: setNewContact,
    onNewContactSubmit: newContactSubmitted
  })

  ReactDOM.render(
    React.createElement(ContactsView, stateWithCallbacks),
    document.getElementById("rootElement")
  )
}

const setNewContact = (contact: NewContact) => {
  setState({ newContact: contact })
}

const state: State = {}

setState({
  contacts: [
    { key: 1, name: "James K Nelson", emailAddress: "james@jamesknelson.com", description: "Front-end Unicorn" },
    { key: 2, name: "Jim", emailAddress: "jim@example.com" },
    { key: 3, name: "Joe" },
    { key: 4, name: "Jan", emailAddress: "jan@aagaard.net", description: "CPNHGN" }
  ],
  newContact: Object.assign({}, emptyContact)
})
