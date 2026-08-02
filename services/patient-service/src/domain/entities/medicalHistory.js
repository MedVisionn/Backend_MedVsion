class MedicalHistory {
  constructor({
    history_id,
    id,
    patient_id,
    allergies,
    chronic_conditions,
    medications,
    surgeries,
    family_history,
    notes,
    updated_at
  }) {
    const resolvedHistoryId = history_id ?? id;

    this.history_id = resolvedHistoryId;
    this.id = resolvedHistoryId;
    this.patient_id = patient_id;
    this.allergies = allergies;
    this.chronic_conditions = chronic_conditions;
    this.medications = medications;
    this.surgeries = surgeries;
    this.family_history = family_history;
    this.notes = notes;
    this.updated_at = updated_at;
  }
}

export default MedicalHistory;
