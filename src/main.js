var contacts = [
  { key: 1, name: "James K Nelson", email: "james@jamesknelson.com", description: "Front-end Unicorn" },
  { key: 2, name: "Jim", email: "jim@example.com" },
  { key: 3, name: "Joe" },
  { key: 4, name: "Jan", email: "jan@aagaard.net", description: "CPNHGN" }
]

var newContact = {
  name: "",
  email: "",
  description: ""
}

var ContactForm = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      React.createElement("form", { className: "form-horizontal" },
        React.createElement("div", { className: "form-group" },
          React.createElement(
            "label",
            {
              className: "control-label col-sm-3",
              htmlFor: "name"
            },
            "Name"
          ),
          React.createElement("div", { className: "col-sm-9" },
            React.createElement(
              "input",
              {
                className: "form-control",
                id: "name",
                placeholder: "Required",
                type: "text",
                value: this.props.contact.name
              }
            )
          )
        ),
        React.createElement("div", { className: "form-group" },
          React.createElement(
            "label",
            {
              className: "control-label col-sm-3",
              htmlForm: "emailAddress"
            },
            "Email address"
          ),
          React.createElement("div", { className: "col-sm-9" },
            React.createElement("input",
              {
                className: "form-control",
                id: "emailAddress",
                type: "email",
                value: this.props.contact.email
              }
            )
          )
        ),
        React.createElement("div", { className: "form-group" },
          React.createElement(
            "label",
            {
              className: "control-label col-sm-3",
              htmlFor: "description"
            },
            "Description"
          ),
          React.createElement("div", { className: "col-sm-9" },
            React.createElement(
              "textarea",
              {
                className: "form-control",
                id: "description",
                rows: 2,
                value: this.props.contact.description
              }
            )
          )
        ),
        React.createElement("div", { className: "form-group" },
          React.createElement("div", { className: "col-sm-offset-3 col-sm-9" },
            React.createElement(
              "button",
              {
                className: "btn btn-primary",
                type: "submit",
              },
              "Add contact"
            )
          )
        )
      )
    )
  }
})

var ContactItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    description: React.PropTypes.string
  },

  render: function() {
    return (
      React.createElement("tr", {},
        React.createElement("td", {}, this.props.name),
        React.createElement("td", {},
          React.createElement("a", { href: "mailto:" + this.props.email }, this.props.email)
          ),
        React.createElement("td", {}, this.props.description)
      )
    )
  },
})

var listElements = contacts
  .filter(function(contact) { return contact.email })
  .map(function(contact) {
    return React.createElement(ContactItem, contact)
  })

const rootElement =
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
      React.createElement("tbody", {}, listElements)
    ),
    React.createElement(ContactForm, { contact: newContact })
  )

ReactDOM.render(rootElement, document.getElementById("root-element"))
