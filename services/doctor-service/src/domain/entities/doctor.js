class Doctor {
  constructor({ id, email, passwordHash, firstName, lastName, speciality, officeId, createdAt, updatedAt }) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.firstName = firstName;
    this.lastName = lastName;
    this.speciality = speciality;
    this.officeId = officeId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Doctor;
