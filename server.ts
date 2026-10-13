import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { NETWORK_HOSPITALS, SAMPLE_CLAIMS, STATS_DATA, MAVEN_SAMPLE_CONVERSATIONS } from './src/data/mockData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Emulate Spring Boot 3 Response Headers
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Application-Context', 'healthcare-spring-boot-backend:prod:8080');
    res.setHeader('X-Powered-By', 'Spring Boot 3.3.0');
    res.setHeader('Server', 'Apache-Coyote/1.1 (Spring Boot / Tomcat 10.1)');
    next();
  });

  // ==========================================
  // Spring Boot Actuator Endpoints (/actuator/*)
  // ==========================================
  app.get('/actuator/health', (req: Request, res: Response) => {
    res.json({
      status: 'UP',
      components: {
        db: {
          status: 'UP',
          details: {
            database: 'PostgreSQL / H2 In-Memory DB',
            validationQuery: 'isValid()',
            connectionsActive: 4,
            connectionsIdle: 16,
          },
        },
        diskSpace: {
          status: 'UP',
          details: {
            total: 107374182400,
            free: 85899345920,
            threshold: 10485760,
            path: '/var/data/spring-boot-healthcare',
            exists: true,
          },
        },
        mavenGuardEngine: {
          status: 'UP',
          details: {
            fraudModelVersion: 'v4.18.2',
            latencyMs: 14,
            preAuthRuleCount: 4200,
          },
        },
        matrixClearinghouse: {
          status: 'UP',
          details: {
            nodesOnline: 28540,
            turnaroundSlaTarget: '45m',
            avgCurrentSla: '28m',
          },
        },
      },
    });
  });

  app.get('/actuator/info', (req: Request, res: Response) => {
    res.json({
      app: {
        name: 'HealthCare TPA Core Service',
        description: 'Spring Boot 3.3.0 Healthcare Benefits & Cashless Clearinghouse',
        version: '1.0.0-SNAPSHOT',
        springBootVersion: '3.3.0',
        javaVersion: 'OpenJDK 21.0.2',
        buildTime: '2026-10-13T01:00:00Z',
        tpaLicense: 'IRDAI Reg. 003',
      },
    });
  });

  app.get('/actuator/metrics', (req: Request, res: Response) => {
    res.json({
      names: [
        'jvm.memory.used',
        'jvm.memory.max',
        'jvm.threads.live',
        'http.server.requests',
        'system.cpu.usage',
        'healthcare.claims.processed.total',
      ],
      metrics: {
        jvmMemoryUsedMb: 248.5,
        jvmMemoryMaxMb: 2048.0,
        activeThreads: 32,
        systemCpuLoad: 0.14,
        totalClaimsProcessed: 1492040,
        cashlessApprovalRate: '98.4%',
      },
    });
  });

  // ==========================================
  // Spring Boot REST APIs (/api/v1/*)
  // ==========================================

  // 1. Hospital Search Controller
  app.get('/api/v1/hospitals/search', (req: Request, res: Response) => {
    const { city, specialty, query, cashlessOnly } = req.query;

    let filtered = [...NETWORK_HOSPITALS];

    if (city && city !== 'All') {
      filtered = filtered.filter((h) => h.city.toLowerCase() === String(city).toLowerCase());
    }

    if (specialty && specialty !== 'All') {
      filtered = filtered.filter((h) =>
        h.specialties.some((s) => s.toLowerCase() === String(specialty).toLowerCase())
      );
    }

    if (query) {
      const q = String(query).toLowerCase();
      filtered = filtered.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.address.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q)
      );
    }

    if (cashlessOnly === 'true') {
      filtered = filtered.filter((h) => h.isCashless);
    }

    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      controller: 'com.healthcare.tpa.controller.HospitalController',
      totalElements: filtered.length,
      totalPages: 1,
      pageNumber: 0,
      content: filtered,
    });
  });

  app.get('/api/v1/hospitals/:id', (req: Request, res: Response) => {
    const hospital = NETWORK_HOSPITALS.find((h) => h.id === req.params.id);
    if (!hospital) {
      return res.status(404).json({
        timestamp: new Date().toISOString(),
        status: 404,
        error: 'Not Found',
        message: `Hospital not found with id ${req.params.id}`,
        path: `/api/v1/hospitals/${req.params.id}`,
      });
    }
    res.json(hospital);
  });

  // 2. MAtrix Claims Workflow Controller
  app.get('/api/v1/claims/:claimId', (req: Request, res: Response) => {
    const claimId = req.params.claimId.toUpperCase();
    const claim = SAMPLE_CLAIMS[claimId];

    if (!claim) {
      return res.status(404).json({
        timestamp: new Date().toISOString(),
        status: 404,
        error: 'Not Found',
        message: `Claim record with ID '${claimId}' not found in MAtrix registry. Please try CLM-89241, CLM-55102, or CLM-31994.`,
        path: `/api/v1/claims/${claimId}`,
      });
    }

    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      controller: 'com.healthcare.tpa.controller.ClaimsWorkflowController',
      claimData: claim,
    });
  });

  // 3. Pre-Authorization Intimation Controller
  app.post('/api/v1/preauth/intimate', (req: Request, res: Response) => {
    const { patientName, employeeId, hospitalName, admissionDate, treatmentType } = req.body;

    if (!patientName || !hospitalName) {
      return res.status(400).json({
        timestamp: new Date().toISOString(),
        status: 400,
        error: 'Bad Request',
        message: 'Validation failed: patientName and hospitalName are required fields.',
        path: '/api/v1/preauth/intimate',
      });
    }

    const referenceId = `HC-PRE-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    res.status(201).json({
      timestamp: new Date().toISOString(),
      status: 201,
      controller: 'com.healthcare.tpa.controller.PreAuthIntimationController',
      referenceId,
      patientName,
      employeeId,
      hospitalName,
      admissionDate,
      treatmentType,
      intimationStatus: 'REGISTERED',
      slaApprovalTarget: '30 Minutes',
      notificationChannels: ['SMS', 'WhatsApp', 'HospitalProviderDesk'],
    });
  });

  // 4. Spring Security Auth Controller
  app.post('/api/v1/auth/login', (req: Request, res: Response) => {
    const { role = 'member', identifier = 'EMP-84920' } = req.body;

    const mockTokens: Record<string, { role: string; user: string; authorities: string[] }> = {
      member: {
        role: 'ROLE_MEMBER',
        user: 'Rajesh Verma',
        authorities: ['READ_CLAIMS', 'DOWNLOAD_ECARD', 'INTIMATE_HOSPITALIZATION'],
      },
      corporate: {
        role: 'ROLE_CORPORATE_HR',
        user: 'Pooja Iyer (HR Director, TechCorp)',
        authorities: ['VIEW_MATRIX_ANALYTICS', 'MANAGE_EMPLOYEE_POLICIES', 'DOWNLOAD_UTILIZATION_REPORT'],
      },
      hospital: {
        role: 'ROLE_HOSPITAL_PROVIDER',
        user: 'Apollo Hospital TPA Desk',
        authorities: ['SUBMIT_PREAUTH', 'UPLOAD_DISCHARGE_SUMMARY', 'QUERY_BENEFIT_COVERAGE'],
      },
      broker: {
        role: 'ROLE_BROKER_PARTNER',
        user: 'Aon India Consulting',
        authorities: ['VIEW_PORTFOLIO_LOSS_RATIO', 'GENERATE_ACTUARIAL_SLAS'],
      },
    };

    const userProfile = mockTokens[role] || mockTokens.member;

    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      tokenType: 'Bearer',
      accessToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.spring-boot-jwt-${Date.now()}`,
      expiresInSeconds: 86400,
      principal: {
        identifier,
        fullName: userProfile.user,
        role: userProfile.role,
        authorities: userProfile.authorities,
        organization: 'HealthCare Healthcare Services Ltd.',
      },
    });
  });

  // 5. MAven AI Assistant Service
  app.post('/api/v1/chat/maven', (req: Request, res: Response) => {
    const { question = '' } = req.body;
    const lower = question.toLowerCase();

    let answer =
      "Thank you for contacting HealthCare! I can assist you with cashless hospitalizations, claim status verification, and E-Card downloads.";

    if (lower.includes('cashless') || lower.includes('hospital')) {
      answer =
        "To avail cashless treatment, present your HealthCare E-Card and Photo ID at the hospital's TPA / Insurance desk. The hospital initiates pre-authorization directly on our portal, and approvals are typically issued in under 30 minutes!";
    } else if (lower.includes('card') || lower.includes('e-card') || lower.includes('download')) {
      answer =
        "You can download your digital E-Card directly through our Member Portal or save it to Apple Wallet / Google Wallet. It is recognized at all 28,500+ network hospitals.";
    } else if (lower.includes('claim') || lower.includes('status') || lower.includes('track')) {
      answer =
        "You can track your claim live in our MAtrix Claim Tracker. Try searching with sample ID CLM-89241 or CLM-55102 to observe the step-by-step progress.";
    } else if (lower.includes('emergency') || lower.includes('help') || lower.includes('number')) {
      answer =
        "For immediate medical assistance, contact our 24x7 toll-free helpline at 1800-425-9449. For senior citizens, dial our dedicated desk at 1800-102-3455.";
    }

    res.json({
      timestamp: new Date().toISOString(),
      status: 200,
      controller: 'com.healthcare.tpa.controller.MavenAiController',
      question,
      answer,
    });
  });

  // Mount Vite or static dist
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Spring Boot Emulation Server] Running on http://0.0.0.0:${PORT}`);
    console.log(`[Spring Boot Actuator] Health check: http://0.0.0.0:${PORT}/actuator/health`);
    console.log(`[Spring Boot REST API] Base path: http://0.0.0.0:${PORT}/api/v1/`);
  });
}

startServer();
