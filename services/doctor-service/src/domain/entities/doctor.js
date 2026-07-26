class Doctor {
  constructor({ id, email, firstName, lastName, speciality, officeId, createdAt, updatedAt }) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.speciality = speciality;
    this.officeId = officeId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Doctor;
