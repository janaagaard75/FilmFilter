var contacts = [
  { key: 1, name: "James K Nelson", email: "james@jamesknelson.com", description: "Front-end Unicorn" },
  { key: 2, name: "Jim", email: "jim@example.com" },
  { key: 3, name: "Joe" },
  { key: 4, name: "Jan", email: "jan@aagaard.net", description: "CPNHGN" }
]

var ContactForm = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      React.createElement("form", {},
        React.createElement("input", {type="text"}),
        React.createElement("input", {type="email"}),
        React.createElement("textarea", {}),
        React.createElement("input", {type="submit"}, "Add")
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
      React.createElement('li', { className: 'Contact' },
        React.createElement('h2', { className: 'Contact-name' }, this.props.name),
        React.createElement("a", { href: "mailto:" + this.props.email }, this.props.email),
        this.props.description
          ? React.createElement("p", {}, this.props.description)
          : null
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
  React.createElement('div', {},
    React.createElement('h1', {}, "Contacts"),

    // If your children is an array, you'll need to give each one a unique key prop. I'll explain why a little later.
    React.createElement('ul', {}, listElements)
  )

ReactDOM.render(rootElement, document.getElementById('react-app'))
