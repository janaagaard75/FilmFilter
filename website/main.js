const contacts = [
  {
    key: 1,
    name: "James Nelson",
    email: "james@jamesknelson.com"
  },
  {
    key: 2,
    name: "Bob"
  }
]

const listElements = contacts
  .filter(contact => { return contact.email })
  .map(contact => {
    return React.createElement("li", { key: contact.key },
      React.createElement('h2', {}, contact.name),
      React.createElement('a', { href: `mailto:${contact.email}` }, contact.email)
    )
  })

const rootElement =
  React.createElement('div', {},
    React.createElement('h1', {}, "Contacts"),

    // If your children is an array, you'll need to give each one a unique key prop. I'll explain why a little later.
    React.createElement('ul', {}, listElements)
  )

ReactDOM.render(rootElement, document.getElementById('react-app'))
