package com.healthcare.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.healthcare.backend.dto.PatientDTO;
import com.healthcare.backend.service.PatientService;

@RestController
@RequestMapping("/api/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/save-update")
    public PatientDTO saveOrUpdatePatient(@RequestBody PatientDTO patientDTO) {
        return patientService.saveOrUpdatePatient(patientDTO);
    }

    @GetMapping("/getall")
    public List<PatientDTO> getAllPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/get-by-id/{id}")
    public PatientDTO getPatientById(@PathVariable("id") Long id) {
        return patientService.getPatientById(id);
    }

    @DeleteMapping("/delete/{id}")
    public String deletePatient(@PathVariable("id") Long id) {
        patientService.deletePatient(id);
        return "Patient Deleted Successfully";
    }
}