package com.healthcare.backend.service;

import java.util.List;

import com.healthcare.backend.dto.PatientDTO;

public interface PatientService {

    PatientDTO saveOrUpdatePatient(PatientDTO patientDTO);

    List<PatientDTO> getAllPatients();

    PatientDTO getPatientById(Long id);

    void deletePatient(Long id);
}