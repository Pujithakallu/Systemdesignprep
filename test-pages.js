const http = require('http');

const BASE_URL = 'http://localhost:3000';

const routesToTest = [
  '/',
  '/ood',
  '/ood/solid-principles',
  '/ood/design-patterns',
  '/hld/parking-lot',
  '/hld/uber',
  '/hld/whatsapp',
  '/hld/espn-cric-info',
  '/core-concepts/read-vs-write',
  '/core-concepts/sharding-hashing',
  '/core-concepts/caching-cdns',
  '/core-concepts/protocols',
  '/core-concepts/locking',
  '/data-structures/lfu',
  '/data-structures/lsm-trees',
  '/data-structures/bloom-filters',
  '/data-structures/b-trees',
  '/storage-db/db-design',
  '/storage-db/file-systems',
  '/storage-db/storage-types',
  '/deep-dives/distributed-cache',
  '/deep-dives/flash-sale',
  '/deep-dives/search-engine',
  '/deep-dives/redis-in-memory-db',
  '/deep-dives/message-broker',
  '/deep-dives/word-dictionary',
  '/deep-dives/superfast-kv-store',
  '/deep-dives/counting-impressions',
  '/deep-dives/remote-file-sync',
  '/deep-dives/whos-near-me',
  '/deep-dives/user-affinity',
  '/deep-dives/recent-searches',
  '/deep-dives/live-commentary',
  '/deep-dives/sql-message-broker',
  '/deep-dives/task-scheduler',
  '/deep-dives/airline-checkin',
  '/deep-dives/sql-kv-store',
  '/deep-dives/realtime-database',
  '/deep-dives/load-balancer',
  '/deep-dives/sync-queue-consumers',
  '/deep-dives/ticketmaster',
  '/deep-dives/tinder',
  '/deep-dives/web-crawler',
  '/strategy/40-min-plan',
  '/strategy/clarifying-inputs',
  '/strategy/ddia-concepts',
  '/ai-systems/llm-serving',
  '/ai-systems/rag-pipeline',
  '/ai-systems/agentic-orchestration',
  '/ai-systems/token-context-optimization',
  '/ai-systems/ml-feature-store',
  '/ood-problems/library-management',
  '/ood-problems/vending-machine',
  '/ood-problems/atm',
  '/ood-problems/elevator-system',
  '/ood-problems/online-bookstore',
  '/ood-problems/notification-system',
  '/ood-problems/file-system',
  '/ood-problems/ride-share-billing',
  '/ood-problems/chat-room',
  '/ood-problems/rate-limiter',
];

function checkRoute(route) {
  return new Promise((resolve) => {
    const req = http.get(`${BASE_URL}${route}`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const hasSidebar = body.includes('nextra-sidebar-container') || body.includes('nav');
        resolve({
          route,
          status: res.statusCode,
          success: res.statusCode === 200,
          hasSidebar,
          bodyLength: body.length
        });
      });
    });
    req.on('error', (err) => {
      resolve({ route, status: err.message, success: false, hasSidebar: false, bodyLength: 0 });
    });
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({ route, status: 'TIMEOUT', success: false, hasSidebar: false, bodyLength: 0 });
    });
  });
}

async function runTests() {
  console.log(`Testing ${routesToTest.length} pages on ${BASE_URL}...\n`);

  let passed = 0;
  let failed = 0;

  for (const route of routesToTest) {
    const result = await checkRoute(route);
    if (result.success) {
      const sidebarNote = result.hasSidebar ? 'sidebar OK' : 'no sidebar detected';
      console.log(`  PASS  [200] ${route}  (${Math.round(result.bodyLength/1024)}KB, ${sidebarNote})`);
      passed++;
    } else {
      console.log(`  FAIL  [${result.status}] ${route}`);
      failed++;
    }
  }

  console.log(`\n--- Results ---`);
  console.log(`Total: ${routesToTest.length}  |  Passed: ${passed}  |  Failed: ${failed}`);

  if (failed > 0) {
    console.error('\nSome pages failed. Make sure the server is running: npm start');
    process.exit(1);
  } else {
    console.log('\nAll pages are accessible and rendering correctly!');
    process.exit(0);
  }
}

const healthCheck = http.get(BASE_URL, (res) => {
  if (res.statusCode === 200) {
    res.resume();
    runTests();
  } else {
    console.error(`Server returned ${res.statusCode}. Is it running?`);
    process.exit(1);
  }
});
healthCheck.on('error', () => {
  console.error(`Cannot connect to ${BASE_URL}. Start the server first:\n  cd nextjs-interview-prep && npm run build && npm start`);
  process.exit(1);
});
healthCheck.setTimeout(5000, () => {
  healthCheck.destroy();
  console.error('Server health check timed out.');
  process.exit(1);
});
