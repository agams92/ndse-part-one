class User {
  constructor({ firstName = "", lastName = "", email = "a@a.ru" }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

module.exports = User;
