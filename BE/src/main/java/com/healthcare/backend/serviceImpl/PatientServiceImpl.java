package com.healthcare.backend.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcare.backend.dto.PatientDTO;
import com.healthcare.backend.entity.Patient;
import com.healthcare.backend.repository.PatientRepository;
import com.healthcare.backend.service.PatientService;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    private PatientDTO convertToDTO(Patient patient) {
        PatientDTO dto = new PatientDTO();

        dto.setId(patient.getId());
        dto.setFirstName(patient.getFirstName());
        dto.setLastName(patient.getLastName());
        dto.setEmail(patient.getEmail());
        dto.setPhone(patient.getPhone());

        return dto;
    }

    private Patient convertToEntity(PatientDTO dto) {
        Patient patient = new Patient();

        patient.setId(dto.getId());
        patient.setFirstName(dto.getFirstName());
        patient.setLastName(dto.getLastName());
        patient.setEmail(dto.getEmail());
        patient.setPhone(dto.getPhone());

        return patient;
    }

    @Override
    public PatientDTO saveOrUpdatePatient(PatientDTO patientDTO) {
        Patient patient = convertToEntity(patientDTO);

        return convertToDTO(patientRepository.save(patient));
    }

    @Override
    public List<PatientDTO> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        List<PatientDTO> dtoList = new ArrayList<>();

        for (Patient patient : patients) {
            PatientDTO dto = convertToDTO(patient);
            dtoList.add(dto);
        }

        return dtoList;
    }

    @Override
    public PatientDTO getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Patient not found with ID: " + id));

        return convertToDTO(patient);
    }

    @Override
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}