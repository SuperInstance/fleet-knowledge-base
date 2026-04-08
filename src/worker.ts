export interface Env {
  FLEET_KB: KVNamespace;
}

interface Document {
  id: string;
  title: string;
  content: string;
  category: string;
  version: string;
  contributor: string;
  timestamp: number;
  tags: string[];
}

interface Contribution {
  id: string;
  docId: string;
  contributor: string;
  changes: string;
  timestamp: number;
}

const HTML_HEADER = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fleet Knowledge Base</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --dark: #0a0a0f;
      --accent: #3b82f6;
      --light: #f8fafc;
      --gray: #64748b;
      --border: #1e293b;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--dark);
      color: var(--light);
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      width: 100%;
    }
    
    header {
      background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
      border-bottom: 1px solid var(--border);
      padding: 2rem 0;
    }
    
    .hero {
      text-align: center;
      padding: 3rem 0;
    }
    
    .hero h1 {
      font-size: 3.5rem;
      font-weight: 700;
      background: linear-gradient(90deg, var(--accent), #60a5fa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1rem;
    }
    
    .hero p {
      font-size: 1.25rem;
      color: var(--gray);
      max-width: 600px;
      margin: 0 auto 2rem;
    }
    
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin: 3rem 0;
    }
    
    .feature-card {
      background: rgba(30, 41, 59, 0.3);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem;
      transition: transform 0.2s, border-color 0.2s;
    }
    
    .feature-card:hover {
      transform: translateY(-2px);
      border-color: var(--accent);
    }
    
    .feature-card h3 {
      color: var(--accent);
      margin-bottom: 0.5rem;
      font-size: 1.25rem;
    }
    
    .api-endpoints {
      background: rgba(30, 41, 59, 0.2);
      border-radius: 12px;
      padding: 2rem;
      margin: 3rem 0;
      border: 1px solid var(--border);
    }
    
    .endpoint {
      background: rgba(15, 23, 42, 0.5);
      border-radius: 8px;
      padding: 1rem;
      margin: 1rem 0;
      border-left: 4px solid var(--accent);
    }
    
    .method {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: var(--accent);
      color: white;
      border-radius: 4px;
      font-weight: 600;
      font-size: 0.875rem;
      margin-right: 0.5rem;
    }
    
    .path {
      font-family: monospace;
      color: #cbd5e1;
    }
    
    footer {
      margin-top: auto;
      background: rgba(15, 23, 42, 0.5);
      border-top: 1px solid var(--border);
      padding: 2rem 0;
      text-align: center;
    }
    
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .footer-logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--accent);
    }
    
    .footer-links a {
      color: var(--gray);
      text-decoration: none;
      margin: 0 0.5rem;
      transition: color 0.2s;
    }
    
    .footer-links a:hover {
      color: var(--accent);
    }
    
    @media (max-width: 768px) {
      .hero h1 {
        font-size: 2.5rem;
      }
      
      .footer-content {
        flex-direction: column;
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <div class="hero">
        <h1>Fleet Knowledge Base</h1>
        <p>Centralized documentation and guides for fleet management, maintenance, and operations</p>
      </div>
    </div>
  </header>
  
  <main class="container">
    <section class="features">
      <div class="feature-card">
        <h3>Structured Docs</h3>
        <p>Organized documentation with clear hierarchy and formatting</p>
      </div>
      <div class="feature-card">
        <h3>Smart Search</h3>
        <p>Full-text search across all documentation and guides</p>
      </div>
      <div class="feature-card">
        <h3>Categories</h3>
        <p>Logical grouping by fleet type, maintenance, and operations</p>
      </div>
      <div class="feature-card">
        <h3>Versioning</h3>
        <p>Track changes and maintain documentation history</p>
      </div>
      <div class="feature-card">
        <h3>Contribution Tracking</h3>
        <p>Monitor updates and contributor activity</p>
      </div>
      <div class="feature-card">
        <h3>Auto-Indexing</h3>
        <p>Automatic organization and categorization</p>
      </div>
    </section>
    
    <section class="api-endpoints">
      <h2 style="color: var(--accent); margin-bottom: 1.5rem;">API Endpoints</h2>
      <div class="endpoint">
        <span class="method">GET</span>
        <span class="path">/api/docs</span>
        <p style="margin-top: 0.5rem; color: var(--gray);">Retrieve all documentation</p>
      </div>
      <div class="endpoint">
        <span class="method">GET</span>
        <span class="path">/api/search?q=query</span>
        <p style="margin-top: 0.5rem; color: var(--gray);">Search documentation</p>
      </div>
      <div class="endpoint">
        <span class="method">POST</span>
        <span class="path">/api/contribute</span>
        <p style="margin-top: 0.5rem; color: var(--gray);">Submit contributions</p>
      </div>
      <div class="endpoint">
        <span class="method">GET</span>
        <span class="path">/health</span>
        <p style="margin-top: 0.5rem; color: var(--gray);">Health check endpoint</p>
      </div>
    </section>
  </main>
  
  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">Fleet Knowledge Base</div>
        <div class="footer-links">
          <a href="/api/docs">Documentation</a>
          <a href="/api/search">Search</a>
          <a href="/api/contribute">Contribute</a>
        </div>
        <div style="color: var(--gray); font-size: 0.875rem;">
          © 2024 Fleet Operations. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</body>
</html>`;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Set security headers
    const securityHeaders = {
      'Content-Security-Policy': "default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;",
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    };
    
    // Health check endpoint
    if (path === '/health') {
      return new Response(JSON.stringify({ status: 'ok', timestamp: Date.now() }), {
        headers: { 'Content-Type': 'application/json', ...securityHeaders },
      });
    }
    
    // API endpoints
    if (path === '/api/docs') {
      return this.handleGetDocs(request, env);
    }
    
    if (path === '/api/search') {
      return this.handleSearch(request, env, url);
    }
    
    if (path === '/api/contribute') {
      return this.handleContribute(request, env);
    }
    
    // Serve HTML for root path
    if (path === '/') {
      return new Response(HTML_HEADER, {
        headers: { 
          'Content-Type': 'text/html; charset=utf-8',
          ...securityHeaders 
        },
      });
    }
    
    // 404 for unknown routes
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', ...securityHeaders },
    });
  },
  
  async handleGetDocs(request: Request, env: Env): Promise<Response> {
    try {
      const docs = await env.FLEET_KB.get('docs', { type: 'json' }) as Document[] || [];
      const categories = await env.FLEET_KB.get('categories', { type: 'json' }) || [];
      
      return new Response(JSON.stringify({
        success: true,
        count: docs.length,
        categories,
        documents: docs,
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Failed to fetch documents' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
  
  async handleSearch(request: Request, env: Env, url: URL): Promise<Response> {
    const query = url.searchParams.get('q');
    
    if (!query) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Search query required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    try {
      const docs = await env.FLEET_KB.get('docs', { type: 'json' }) as Document[] || [];
      const searchTerm = query.toLowerCase();
      
      const results = docs.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm) ||
        doc.content.toLowerCase().includes(searchTerm) ||
        doc.category.toLowerCase().includes(searchTerm) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
      
      return new Response(JSON.stringify({
        success: true,
        query: searchTerm,
        count: results.length,
        results: results.map(doc => ({
          id: doc.id,
          title: doc.title,
          category: doc.category,
          version: doc.version,
          excerpt: doc.content.substring(0, 150) + '...',
        })),
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Search failed' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
  
  async handleContribute(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Method not allowed' 
      }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    try {
      const contribution = await request.json() as Partial<Contribution>;
      
      if (!contribution.docId || !contribution.contributor || !contribution.changes) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Missing required fields' 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      const contributionId = `contrib_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const fullContribution: Contribution = {
        id: contributionId,
        docId: contribution.docId,
        contributor: contribution.contributor,
        changes: contribution.changes,
        timestamp: Date.now(),
      };
      
      // Get existing contributions
      const contributions = await env.FLEET_KB.get('contributions', { type: 'json' }) as Contribution[] || [];
      contributions.push(fullContribution);
      
      // Store updated contributions
      await env.FLEET_KB.put('contributions', JSON.stringify(contributions));
      
      // Auto-index: Update document if docId exists
      const docs = await env.FLEET_KB.get('docs', { type: 'json' }) as Document[] || [];
      const docIndex = docs.findIndex(doc => doc.id === contribution.docId);
      
      if (docIndex !== -1) {
        docs[docIndex].timestamp = Date.now();
        docs[docIndex].contributor = contribution.contributor;
        await env.FLEET_KB.put('docs', JSON.stringify(docs));
      }
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Contribution recorded',
        contributionId: contributionId,
        timestamp: fullContribution.timestamp,
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid contribution data' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};