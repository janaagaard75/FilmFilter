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
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  render: function() {
    var oldContact = this.props.value
    var onChange = this.props.onChange

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
                onChange: function (event) {
                  onChange(Object.assign({}, oldContact, { name: event.target.value }))
                },
                placeholder: "Required",
                type: "text",
                value: this.props.value.name
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
                onChange: function (event) {
                  onChange(Object.assign({}, oldContact, { email: event.target.value }))
                },
                type: "email",
                value: this.props.value.email
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
                onChange: function (event) {
                  onChange(Object.assign({}, oldContact, { description: event.target.value }))
                },
                rows: 2,
                value: this.props.value.description
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
    React.createElement(ContactForm,
    {
      value: newContact,
      onChange: function(contact) {
        console.log(contact)
      }
    })
  )

ReactDOM.render(rootElement, document.getElementById("root-element"))
