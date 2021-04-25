class User {
  firstName: string
  lastName: string
  email: string
  constructor({ firstName = "", lastName = "", email = "a@a.ru" }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

export default User;
