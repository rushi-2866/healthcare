
package com.healthcare.backend.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcare.backend.dto.DoctorDTO;
import com.healthcare.backend.entity.Doctor;
import com.healthcare.backend.repository.DoctorRepository;
import com.healthcare.backend.service.DoctorService;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    private DoctorDTO convertToDTO(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();

        dto.setId(doctor.getId());
        dto.setFirstName(doctor.getFirstName());
        dto.setLastName(doctor.getLastName());
        dto.setSpecialization(doctor.getSpecialization());
        dto.setEmail(doctor.getEmail());
        dto.setPhone(doctor.getPhone());

        return dto;
    }

    private Doctor convertToEntity(DoctorDTO dto) {
        Doctor doctor = new Doctor();

        doctor.setId(dto.getId());
        doctor.setFirstName(dto.getFirstName());
        doctor.setLastName(dto.getLastName());
        doctor.setSpecialization(dto.getSpecialization());
        doctor.setEmail(dto.getEmail());
        doctor.setPhone(dto.getPhone());

        return doctor;
    }

    @Override
    public DoctorDTO saveOrUpdateDoctor(DoctorDTO doctorDTO) {
        Doctor doctor = convertToEntity(doctorDTO);

        return convertToDTO(doctorRepository.save(doctor));
    }

    @Override
    public List<DoctorDTO> getAllDoctors() {
        List<Doctor> doctors = doctorRepository.findAll();
        List<DoctorDTO> dtoList = new ArrayList<>();

        for (Doctor doctor : doctors) {
            DoctorDTO dto = convertToDTO(doctor);
            dtoList.add(dto);
        }

        return dtoList;
    }

    @Override
    public DoctorDTO getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Doctor not found with ID: " + id));

        return convertToDTO(doctor);
    }

    @Override
    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}
