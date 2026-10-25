
package com.healthcare.backend.service;

import java.util.List;

import com.healthcare.backend.dto.DoctorDTO;

public interface DoctorService {

    DoctorDTO saveOrUpdateDoctor(DoctorDTO doctorDTO);

    List<DoctorDTO> getAllDoctors();

    DoctorDTO getDoctorById(Long id);

    void deleteDoctor(Long id);
}
