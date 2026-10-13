package com.healthcare.tpa.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.*;

@RestController
@RequestMapping("/api/v1/preauth")
@Tag(name = "Pre-Authorization & Cashless Controller", description = "Planned surgery and cashless admission intimation")
@CrossOrigin(origins = "*")
public class PreAuthIntimationController {

    @PostMapping("/intimate")
    @Operation(summary = "Submit cashless admission intimation 48h prior")
    public ResponseEntity<Map<String, Object>> submitPreAuthIntimation(@RequestBody Map<String, Object> payload) {
        String referenceId = "HC-PRE-2026-" + (1000 + new Random().nextInt(9000));
        
        Map<String, Object> result = new HashMap<>();
        result.put("status", "SUCCESS");
        result.put("referenceId", referenceId);
        result.put("patientName", payload.get("patientName"));
        result.put("hospitalName", payload.get("hospitalName"));
        result.put("message", "Pre-authorization intimation registered. Notification dispatched to hospital insurance desk.");
        result.put("estimatedVerificationMinutes", 30);
        result.put("timestamp", new Date());

        return ResponseEntity.ok(result);
    }
}
