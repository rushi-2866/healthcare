
package com.healthcare.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.healthcare.backend.dto.DoctorDTO;
import com.healthcare.backend.service.DoctorService;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @PostMapping("/save-update")
    public DoctorDTO saveOrUpdateDoctor(
            @RequestBody DoctorDTO doctorDTO) {

        return doctorService.saveOrUpdateDoctor(doctorDTO);
    }

    @GetMapping("/getall")
    public List<DoctorDTO> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/get-by-id/{id}")
    public DoctorDTO getDoctorById(@PathVariable("id") Long id) {
        return doctorService.getDoctorById(id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteDoctor(@PathVariable("id") Long id) {
        doctorService.deleteDoctor(id);

        return "Doctor Deleted Successfully";
    }
}
