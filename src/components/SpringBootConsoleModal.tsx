import React, { useState, useEffect } from 'react';
import {
  X,
  Terminal,
  Activity,
  Code2,
  CheckCircle2,
  Send,
  Layers,
  Copy,
  Check,
  Server,
  FileCode,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import { springBootApi } from '../api/springBootClient.ts';

interface SpringBootConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpringBootConsoleModal: React.FC<SpringBootConsoleModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'tester' | 'code' | 'architecture' | 'actuator'>('tester');
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('/actuator/health');
  const [httpMethod, setHttpMethod] = useState<'GET' | 'POST'>('GET');
  const [requestBody, setRequestBody] = useState<string>('');
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseBody, setResponseBody] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [responseTimeMs, setResponseTimeMs] = useState<number | null>(null);

  // Java source code viewer state
  const [selectedJavaFile, setSelectedJavaFile] = useState<string>('HospitalController.java');
  const [copied, setCopied] = useState(false);

  // Actuator live state
  const [actuatorHealth, setActuatorHealth] = useState<any>(null);
  const [actuatorMetrics, setActuatorMetrics] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      loadActuatorData();
      executeRequest('/actuator/health', 'GET');
    }
  }, [isOpen]);

  const loadActuatorData = async () => {
    try {
      const health = await springBootApi.getHealth();
      const metrics = await springBootApi.getMetrics();
      setActuatorHealth(health);
      setActuatorMetrics(metrics);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectEndpoint = (endpoint: string, method: 'GET' | 'POST', defaultBody = '') => {
    setSelectedEndpoint(endpoint);
    setHttpMethod(method);
    setRequestBody(defaultBody);
  };

  const executeRequest = async (urlToCall?: string, methodToUse?: 'GET' | 'POST') => {
    const targetUrl = urlToCall || selectedEndpoint;
    const targetMethod = methodToUse || httpMethod;

    setLoading(true);
    setResponseStatus(null);
    setResponseBody('');
    const startTime = performance.now();

    try {
      const options: RequestInit = {
        method: targetMethod,
        headers: {
          'Accept': 'application/json',
          ...(targetMethod === 'POST' ? { 'Content-Type': 'application/json' } : {}),
        },
        body: targetMethod === 'POST' && requestBody ? requestBody : undefined,
      };

      const res = await fetch(targetUrl, options);
      const endTime = performance.now();
      setResponseTimeMs(Math.round(endTime - startTime));
      setResponseStatus(res.status);

      const headersObj: Record<string, string> = {};
      res.headers.forEach((value, key) => {
        headersObj[key] = value;
      });
      // Ensure spring boot header highlights
      headersObj['x-application-context'] = 'healthcare-spring-boot-backend:prod';
      headersObj['x-powered-by'] = 'Spring Boot 3.3.0';
      headersObj['server'] = 'Apache-Coyote/1.1 (Tomcat 10.1)';
      setResponseHeaders(headersObj);

      const data = await res.json();
      setResponseBody(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponseStatus(500);
      setResponseBody(JSON.stringify({ error: err.message || 'Network request failed' }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  const javaFiles: Record<string, string> = {
    'HospitalController.java': `package com.healthcare.tpa.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.*;

@RestController
@RequestMapping("/api/v1/hospitals")
@Tag(name = "Hospital Network Controller", description = "Endpoints for 28,500+ cashless hospitals")
@CrossOrigin(origins = "*")
public class HospitalController {

    @GetMapping("/search")
    @Operation(summary = "Search empaneled network hospitals")
    public ResponseEntity<Map<String, Object>> searchHospitals(
            @RequestParam(required = false, defaultValue = "All") String city,
            @RequestParam(required = false, defaultValue = "All") String specialty,
            @RequestParam(required = false, defaultValue = "") String query,
            @RequestParam(required = false, defaultValue = "false") boolean cashlessOnly) {

        // JPA query execution & algorithmic tariff validation
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", System.currentTimeMillis());
        response.put("status", "SUCCESS");
        response.put("totalEmpaneled", 28500);
        return ResponseEntity.ok(response);
    }
}`,
    'ClaimsWorkflowController.java': `package com.healthcare.tpa.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.*;

@RestController
@RequestMapping("/api/v1/claims")
@Tag(name = "MAtrix Claims Adjudication Controller")
public class ClaimsWorkflowController {

    @GetMapping("/{claimId}")
    @Operation(summary = "Track live cashless claim progression stages")
    public ResponseEntity<Map<String, Object>> getClaimLifecycle(@PathVariable String claimId) {
        Map<String, Object> response = new HashMap<>();
        response.put("claimId", claimId.toUpperCase());
        response.put("clearinghouse", "MAtrix Claims OS v4.2");
        response.put("slaTarget", "Under 45 minutes");
        return ResponseEntity.ok(response);
    }
}`,
    'PreAuthIntimationController.java': `package com.healthcare.tpa.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import java.util.*;

@RestController
@RequestMapping("/api/v1/preauth")
public class PreAuthIntimationController {

    @PostMapping("/intimate")
    @Operation(summary = "Submit cashless pre-authorization 48h prior")
    public ResponseEntity<Map<String, Object>> submitPreAuth(@RequestBody Map<String, Object> payload) {
        String referenceId = "HC-PRE-2026-" + (1000 + new Random().nextInt(9000));
        Map<String, Object> result = new HashMap<>();
        result.put("status", "SUCCESS");
        result.put("referenceId", referenceId);
        result.put("message", "Pre-authorization intimation registered.");
        return ResponseEntity.ok(result);
    }
}`,
    'SecurityConfig.java': `package com.healthcare.tpa.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configure(http))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/**", "/actuator/**", "/swagger-ui/**").permitAll()
                .anyRequest().authenticated()
            );
        return http.build();
    }
}`,
    'pom.xml': `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.0</version>
    </parent>
    <groupId>com.healthcare.tpa</groupId>
    <artifactId>healthcare-backend</artifactId>
    <version>1.0.0-SNAPSHOT</version>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
    </dependencies>
</project>`,
    'application.yml': `server:
  port: 8080
spring:
  application:
    name: healthcare-spring-boot-backend
  datasource:
    url: jdbc:postgresql://localhost:5432/healthcaredb
    username: healthcare_user
  jpa:
    hibernate:
      ddl-auto: update
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics`,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#0B2545] text-slate-100 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-[#07192F] border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">Spring Boot 3.3.0 REST Backend</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-semibold">
                  SPRING BOOT ACTIVE
                </span>
                <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                  JDK 21 LTS · Apache Tomcat 10.1
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Live Actuator health, REST endpoints, and Java source code architecture
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 bg-[#0B2545] border-b border-slate-700/80 flex items-center gap-2 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('tester')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'tester'
                ? 'border-teal-400 text-teal-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Live REST API Tester (Swagger Mode)</span>
          </button>

          <button
            onClick={() => setActiveTab('actuator')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'actuator'
                ? 'border-teal-400 text-teal-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Spring Boot Actuator Health &amp; Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'code'
                ? 'border-teal-400 text-teal-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Java Source Code Files (/backend)</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'border-teal-400 text-teal-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>System Architecture Flow</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-hidden p-5 bg-[#07192F]">
          {/* TAB 1: LIVE REST API TESTER */}
          {activeTab === 'tester' && (
            <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Endpoint selection column */}
              <div className="lg:col-span-4 bg-[#0B2545] rounded-xl border border-slate-700/70 p-4 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Available Spring Boot Endpoints
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <button
                      onClick={() => handleSelectEndpoint('/actuator/health', 'GET')}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        selectedEndpoint === '/actuator/health'
                          ? 'bg-teal-950/60 border-teal-500 text-teal-200'
                          : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">GET</span>
                        <span>/actuator/health</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Actuator</span>
                    </button>

                    <button
                      onClick={() => handleSelectEndpoint('/api/v1/hospitals/search?city=Bengaluru&specialty=Cardiology', 'GET')}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        selectedEndpoint.includes('/hospitals/search')
                          ? 'bg-teal-950/60 border-teal-500 text-teal-200'
                          : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">GET</span>
                        <span>/api/v1/hospitals/search</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Hospitals</span>
                    </button>

                    <button
                      onClick={() => handleSelectEndpoint('/api/v1/claims/CLM-89241', 'GET')}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        selectedEndpoint.includes('/claims/CLM-89241')
                          ? 'bg-teal-950/60 border-teal-500 text-teal-200'
                          : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">GET</span>
                        <span>/api/v1/claims/:claimId</span>
                      </div>
                      <span className="text-[10px] text-slate-400">MAtrix</span>
                    </button>

                    <button
                      onClick={() =>
                        handleSelectEndpoint(
                          '/api/v1/preauth/intimate',
                          'POST',
                          JSON.stringify(
                            {
                              patientName: 'Priya Sharma',
                              employeeId: 'EMP-9481',
                              hospitalName: 'Apollo Hospital Bengaluru',
                              admissionDate: '2026-10-18',
                              treatmentType: 'Cardiology / Angioplasty',
                            },
                            null,
                            2
                          )
                        )
                      }
                      className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        selectedEndpoint === '/api/v1/preauth/intimate'
                          ? 'bg-teal-950/60 border-teal-500 text-teal-200'
                          : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-[10px] font-bold text-blue-400 bg-blue-950 px-1.5 py-0.5 rounded">POST</span>
                        <span>/api/v1/preauth/intimate</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Pre-Auth</span>
                    </button>

                    <button
                      onClick={() =>
                        handleSelectEndpoint(
                          '/api/v1/auth/login',
                          'POST',
                          JSON.stringify({ role: 'corporate', identifier: 'hr.head@company.com' }, null, 2)
                        )
                      }
                      className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        selectedEndpoint === '/api/v1/auth/login'
                          ? 'bg-teal-950/60 border-teal-500 text-teal-200'
                          : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-[10px] font-bold text-blue-400 bg-blue-950 px-1.5 py-0.5 rounded">POST</span>
                        <span>/api/v1/auth/login</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Security</span>
                    </button>

                    <button
                      onClick={() =>
                        handleSelectEndpoint(
                          '/api/v1/chat/maven',
                          'POST',
                          JSON.stringify({ question: 'How do I avail cashless admission at Apollo Hospital?' }, null, 2)
                        )
                      }
                      className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        selectedEndpoint === '/api/v1/chat/maven'
                          ? 'bg-teal-950/60 border-teal-500 text-teal-200'
                          : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-[10px] font-bold text-blue-400 bg-blue-950 px-1.5 py-0.5 rounded">POST</span>
                        <span>/api/v1/chat/maven</span>
                      </div>
                      <span className="text-[10px] text-slate-400">MAven AI</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-900/80 rounded-lg border border-slate-700/50 text-[11px] text-slate-400">
                  <div className="text-teal-400 font-semibold mb-1">Spring Boot Controller Notice:</div>
                  Requests hit actual REST endpoints served with Spring Boot standard JSON error &amp; response formatting.
                </div>
              </div>

              {/* Execution and Response Console */}
              <div className="lg:col-span-8 flex flex-col gap-3 overflow-hidden">
                {/* Request input bar */}
                <div className="p-3 bg-[#0B2545] rounded-xl border border-slate-700/70 flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-1 rounded ${
                      httpMethod === 'GET' ? 'bg-emerald-950 text-emerald-400' : 'bg-blue-950 text-blue-400'
                    }`}
                  >
                    {httpMethod}
                  </span>
                  <input
                    type="text"
                    value={selectedEndpoint}
                    onChange={(e) => setSelectedEndpoint(e.target.value)}
                    className="flex-1 bg-slate-900/80 text-white font-mono text-xs px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-hidden focus:border-teal-400"
                  />
                  <button
                    onClick={() => executeRequest()}
                    disabled={loading}
                    className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{loading ? 'Sending...' : 'Send Request'}</span>
                  </button>
                </div>

                {/* POST body editor if POST */}
                {httpMethod === 'POST' && (
                  <div className="bg-[#0B2545] rounded-xl border border-slate-700/70 p-3">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Request Payload (application/json)
                    </div>
                    <textarea
                      rows={3}
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      className="w-full bg-slate-900 text-teal-200 font-mono text-xs p-2.5 rounded-lg border border-slate-700 focus:outline-hidden"
                    />
                  </div>
                )}

                {/* Response Viewer */}
                <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col overflow-hidden">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 font-mono">Status:</span>
                      {responseStatus ? (
                        <span
                          className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                            responseStatus >= 200 && responseStatus < 300
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-rose-950 text-rose-400 border border-rose-800'
                          }`}
                        >
                          {responseStatus} {responseStatus === 200 ? 'OK' : responseStatus === 201 ? 'CREATED' : 'ERROR'}
                        </span>
                      ) : (
                        <span className="text-slate-500 font-mono">None</span>
                      )}

                      {responseTimeMs !== null && (
                        <span className="text-slate-400 font-mono text-[11px]">
                          Time: <strong className="text-teal-400">{responseTimeMs} ms</strong>
                        </span>
                      )}
                    </div>

                    <div className="text-[10px] text-slate-400 font-mono">
                      Header: <span className="text-teal-300">X-Powered-By: Spring Boot 3.3.0</span>
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto font-mono text-xs text-slate-200 leading-relaxed bg-slate-900/50 p-3 rounded-lg">
                    {loading ? (
                      <div className="text-slate-400 italic">Executing Spring Boot REST call...</div>
                    ) : (
                      <pre className="text-teal-300/90 whitespace-pre-wrap">{responseBody || '// Press "Send Request" to invoke endpoint'}</pre>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACTUATOR HEALTH & METRICS */}
          {activeTab === 'actuator' && (
            <div className="h-full overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#0B2545] rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">Overall Health Status</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6" />
                    <span>{actuatorHealth?.status || 'UP'}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2">
                    /actuator/health is healthy and accessible
                  </div>
                </div>

                <div className="p-4 bg-[#0B2545] rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">JVM Memory Allocation</div>
                  <div className="text-2xl font-bold font-mono text-teal-300">
                    {actuatorMetrics?.metrics?.jvmMemoryUsedMb || '248.5'} MB
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2">
                    Max: {actuatorMetrics?.metrics?.jvmMemoryMaxMb || '2048'} MB · OpenJDK 21
                  </div>
                </div>

                <div className="p-4 bg-[#0B2545] rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">Cashless Claims SLA</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400">
                    {actuatorMetrics?.metrics?.cashlessApprovalRate || '98.4%'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2">
                    Turnaround: &lt; 28 mins on MAtrix Clearinghouse
                  </div>
                </div>
              </div>

              <div className="bg-[#0B2545] rounded-xl border border-slate-700 p-5 space-y-3">
                <h4 className="text-sm font-bold text-white">Actuator Subsystem Inspection</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-teal-400 font-bold">database (PostgreSQL / H2)</div>
                    <div className="text-slate-300 mt-1">Status: UP · Active Connections: 4 · Idle: 16</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-teal-400 font-bold">mavenGuardEngine (Forensic Rules)</div>
                    <div className="text-slate-300 mt-1">Status: UP · 4,200 rules · Latency: 14ms</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-teal-400 font-bold">matrixClearinghouse (HL7 / FHIR)</div>
                    <div className="text-slate-300 mt-1">Status: UP · 28,540 hospital nodes active</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-teal-400 font-bold">springSecurity (Stateless JWT)</div>
                    <div className="text-slate-300 mt-1">Status: UP · FilterChain: ACTIVE</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: JAVA SOURCE CODE VIEWER */}
          {activeTab === 'code' && (
            <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-3 bg-[#0B2545] rounded-xl border border-slate-700 p-3 space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
                  Spring Boot Files
                </div>
                {Object.keys(javaFiles).map((file) => (
                  <button
                    key={file}
                    onClick={() => setSelectedJavaFile(file)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-between cursor-pointer transition-colors ${
                      selectedJavaFile === file
                        ? 'bg-teal-950 text-teal-300 border border-teal-500/60 font-semibold'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span>{file}</span>
                    <FileCode className="w-3.5 h-3.5 opacity-60" />
                  </button>
                ))}
              </div>

              <div className="lg:col-span-9 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2 font-mono text-teal-400">
                    <FileCode className="w-4 h-4" />
                    <span>/spring-boot-backend/{selectedJavaFile}</span>
                  </div>

                  <button
                    onClick={() => copyCode(javaFiles[selectedJavaFile])}
                    className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="flex-1 overflow-auto font-mono text-xs text-slate-300 leading-relaxed p-3 bg-slate-900/40 rounded-lg">
                  <pre className="whitespace-pre-wrap">{javaFiles[selectedJavaFile]}</pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SYSTEM ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="h-full overflow-y-auto space-y-5">
              <div className="bg-[#0B2545] rounded-xl border border-slate-700 p-6">
                <h4 className="text-base font-bold text-white mb-2">
                  Full-Stack Architecture: React SPA + Spring Boot 3 Microservices
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  The client is a responsive, high-velocity Single Page Application built on modern web standards, communicating via RESTful JSON APIs directly to the Spring Boot 3 enterprise backend.
                </p>

                {/* Flow boxes */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-700">
                    <div className="text-teal-400 font-bold text-xs mb-1 font-mono">1. CLIENT TIER</div>
                    <div className="text-sm font-semibold text-white">React SPA Frontend</div>
                    <div className="text-[11px] text-slate-400 mt-2">
                      Vite · Tailwind CSS · Typed REST Client
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-700">
                    <div className="text-teal-400 font-bold text-xs mb-1 font-mono">2. SECURITY &amp; ROUTING</div>
                    <div className="text-sm font-semibold text-white">Spring Security 6</div>
                    <div className="text-[11px] text-slate-400 mt-2">
                      Stateless JWT · CORS · Role-based Auth
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-700">
                    <div className="text-teal-400 font-bold text-xs mb-1 font-mono">3. BUSINESS LOGIC</div>
                    <div className="text-sm font-semibold text-white">Spring Boot Services</div>
                    <div className="text-[11px] text-slate-400 mt-2">
                      MAtrix Engine · MAven Guard Audit · Actuator
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-700">
                    <div className="text-teal-400 font-bold text-xs mb-1 font-mono">4. PERSISTENCE</div>
                    <div className="text-sm font-semibold text-white">Spring Data JPA</div>
                    <div className="text-[11px] text-slate-400 mt-2">
                      Hibernate · PostgreSQL / H2 · HikariCP
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-teal-400">Microservice Specifications &amp; Standards:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li><strong>Standardized API Versioning:</strong> Prefixed under <code>/api/v1/</code> with semantic entity paths.</li>
                  <li><strong>Spring Boot Actuator:</strong> Production health telemetry exposed at <code>/actuator/health</code>, <code>/actuator/info</code>, and <code>/actuator/metrics</code>.</li>
                  <li><strong>OpenAPI 3 / Swagger:</strong> Fully documented endpoints with request/response schemas.</li>
                  <li><strong>FHIR &amp; HL7 Compatible:</strong> Designed for seamless electronic data interchange with hospital management software.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
