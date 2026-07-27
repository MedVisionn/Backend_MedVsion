class Patient {
  constructor({ id, doctor_id, first_name, last_name, gender,date_of_birth,phone,notes,created_at,updated_at }) {
    this.id = id;
    this.doctor_id = doctor_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.gender = gender;
    this.date_of_birth = date_of_birth;
    this.phone = phone;
    this.notes = notes;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export default Patient;
