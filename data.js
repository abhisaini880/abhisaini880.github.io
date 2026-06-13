/* =========================================================
   Portfolio — content data
   Edit copy, links, and lists here. The DOM is hydrated from
   this object at load time by script.js.
   ========================================================= */

window.SITE_DATA = {
  meta: {
    title: 'Abhishek Saini — Senior Software Engineer',
    description:
      'Abhishek Saini — Senior Software Engineer at McKinsey, building Aurora, a GenAI agent for internal admin operations.',
    ogDescription:
      'Senior Software Engineer at McKinsey, building Aurora — a GenAI agent for internal operations.',
    url: 'https://abhisaini.in',
    ogImage: 'assets/og_image.jpg',
    person: {
      name: 'Abhishek Saini',
      jobTitle: 'Senior Software Engineer',
      worksFor: 'McKinsey & Company',
      sameAs: ['https://github.com/', 'https://www.linkedin.com/'],
    },
  },

  brand: {
    mark: 'AS',
    ariaLabel: 'Abhishek Saini — home',
  },

  nav: [
    { href: '#work', label: 'Work' },
    { href: '#experience', label: 'Experience' },
    { href: '#about', label: 'About' },
    { href: '#writing', label: 'Writing' },
    { href: '#contact', label: 'Contact' },
  ],

  hero: {
    firstName: 'Abhishek',
    lastName: 'Saini.',
    lede:
      'Senior engineer building dependable systems and agentic products. Currently shipping GenAI tools at McKinsey.',
    ctas: [
      { label: 'Get in touch', href: '#contact', variant: 'primary' },
    ],
  },

  now: {
    label: 'Now',
    // Use {em} markers to italicize a phrase, e.g. "building {em}Aurora{/em}, a ..."
    text:
      'Senior Software Engineer at McKinsey — building {em}Aurora{/em}, a GenAI agent for internal admin operations.',
  },

  projects: {
    eyebrow: '01 — Projects',
    title: 'Projects.',
    items: [
      {
        period: '2025 — Present',
        org: 'McKinsey',
        title: 'Aurora',
        lede: 'Building a GenAI agent for internal admin operations, using LLM-powered workflows to resolve routine requests that previously required manual triage and consumed valuable user time.',
        tags: ['Python', 'LLM Agents', 'GenAI', 'AWS'],
      },
      {
        period: '2020 — 2024',
        org: 'Tyroo',
        title: 'Vidtech',
        lede: 'Built and scaled an ad- tech workflow platform that let marketers create product - led image / video ads and manage campaigns across Snap, Meta, and Google from one place.',
        tags: ['Python', 'AWS', 'Kubernetes', 'AdTech'],
      },
      {
        period: '2022 — 2024',
        org: 'Tyroo',
        title: 'Product Information Management',
        lede: 'Built the PIM system inside Vidtech to manage product data, templates, inventory sync, and dynamic ad updates at scale, syncing 5M–10M products per hour and keeping ads aligned with live product availability.',
        tags: ['Python', 'Distributed Systems', 'PIM', 'Data Pipelines'],
      },
      {
        period: '2021 — 2022',
        org: 'Reckitt',
        title: 'Udaan',
        lede: 'Built a freelance loyalty and rewards management platform for Reckitt wholesalers and distributors, helping approved partners track sales performance, participate in weekly reward events, and earn incentives based on sales data.',
        tags: ['Freelance', 'Python', 'Rewards Platform'],
      }
    ],
  },

  experience: {
    eyebrow: '02 — Experience',
    title: 'Eight years, five chapters.',
    items: [
      {
        year: 'Jun 2025 — Present',
        role: 'Senior Software Engineer',
        company: 'McKinsey & Company',
        bullets: [
          "Building Aurora, an agentic AI platform supporting productivity and administrative workflows across McKinsey's global workforce.",
          "Designed and implemented tools that enabled AI agents to interact with enterprise systems and execute business actions across administrative workflows.",
          "Designed backend services, agent workflows, tool orchestration, and Slack-based product experiences for enterprise-scale use cases.",
          "Contributed to the design and evolution of backend architecture supporting agent-driven workflows and enterprise integrations.",
          "Built A2A protocol server support, enabling other agents to connect, communicate, and interact with Aurora.",
          "Built and exposed MCP server capabilities while integrating external MCP servers for access to enterprise tools and business systems.",
          "Added streaming support for real-time agent responses and improved Slack UI flows for better usability.",
          "Collaborated with engineering teams across the US and Europe to ship reliable, production-grade systems.",
        ],
      },
      {
        year: 'Oct 2022 — May 2025',
        role: 'Lead Software Development Engineer',
        company: 'Tyroo',
        bullets: [
          'Led a team of 10 engineers building backend systems for large-scale ad automation and product feed platforms.',
          'Owned architecture and delivery for systems processing 10M–20M+ product records across distributed workflows.',
          'Improved media generation throughput from 1M to 10M images per day by optimizing backend processing pipelines.',
          'Reduced AWS infrastructure cost by 40% through resource optimization, monitoring improvements, and workload right-sizing.',
          'Improved system performance by reducing network bottlenecks and simplifying distributed producer-consumer workflows.',
          'Mentored engineers through code reviews, architecture discussions, production debugging, and delivery planning.',
        ],
      },
      {
        year: 'Mar 2020 — Sep 2022',
        role: 'Software Development Engineer I',
        company: 'Tyroo',
        bullets: [
          'Built backend APIs and services for product feed processing, campaign automation, and ad delivery workflows.',
          'Integrated Meta and Snapchat marketing APIs for campaign creation, management, and automation use cases.',
          'Worked on scaling backend systems for high-volume product feeds and media generation workloads.',
          'Investigated production issues, fixed performance bottlenecks, and improved reliability across backend services.',
          'Contributed to deployment stability and backend service improvements for ad-tech products.',
        ],
      },
      {
        year: 'Jun 2018 — Dec 2019',
        role: 'Operations Engineer',
        company: 'Triotech Solutions',
        bullets: [
          'Managed cloud and on-prem production deployments for bill-payment and recharge platforms.',
          'Debugged client production issues using application logs and coordinated fixes with development teams.',
          'Automated operational reports using Python and Bash, reducing manual reporting effort.',
          'Built a reconciliation automation system for transaction discrepancy detection and reporting.',
          'Managed production databases, deployment troubleshooting, and operational support workflows.',
        ],
      },
      {
        year: 'Jan 2018 - May 2018',
        role: 'Product Trainee',
        company: 'Drishti Soft Solutions',
        bullets: [
          'Worked on enterprise client onboarding for Ameyo, a contact-center automation product.',
          'Supported on-prem server setup, software installation, and technical rollout for enterprise clients.',
          'Provided product usage training and implementation support during client onboarding.',
          'Worked with project managers on enterprise rollout projects, including Royal Bank of Scotland.',
        ],
      },
    ],
  },

  education: {
    eyebrow: 'Background',
    title: 'Education.',
    items: [
      {
        year: '2014 — 2018',
        role: 'B.Tech, Computer Science',
        company: 'Dronacharya College of Engineering · MDU Rohtak',
      },
    ],
  },

  about: {
    eyebrow: '03 — About',
    title: 'How I\u00A0work.',
    paragraphs: [
      'I care about software that earns trust - systems that are honest about their limits, observable when they fail, and pleasant to operate. I’d rather ship a small thing that holds up than a big thing that almost works.',
      'I usually start from first principles, build a quick prototype, and let the system teach me what matters. Lately, I’ve been working on GenAI products and agent workflows, making LLMs useful through reliable tools, clean backend design, and a healthy suspicion of magic.',
      'I like working with people who have a growth mindset, are not afraid to make mistakes, and help others learn from theirs. The best teams I’ve been part of create space for honest feedback, empathy, and steady improvement - with just enough humour to survive production incidents.',
      'Outside of work, I read, lift, and tinker with side projects that rarely make it to production.',
    ],
  },

  skills: {
    eyebrow: '04 — Stack',
    title: 'Tools of the\u00A0trade.',
    rows: [
      { label: 'Languages', value: 'Python, SQL, Bash' },
      {
        label: 'AI & Agents',
        value: 'LLM agents, tool orchestration, RAG, Prompt design, A2A integrations',
      },
      {
        label: 'Backend Systems',
        value: 'FastAPI, Flask, REST APIs, Asyncio',
      },
      {
        label: 'Data & Search',
        value: 'Postgres, MySQL, Redis, Elasticsearch',
      },
      {
        label: 'Cloud & Infrastructure',
        value: 'AWS, Docker, Kubernetes, CI/CD, Linux',
      },
    ],
  },

  writing: {
    eyebrow: '05 — Writing',
    title: 'Articles &\u00A0essays.',
    items: [
      {
        date: 'May, 2026',
        title: 'Working Code Is Not Enough',
        href: '#',
        disabled: true
      },
      {
        date: 'Aug, 2024',
        title: 'Design NearBy Friends Service',
        href: 'https://medium.com/@abhishek-saini/design-nearby-friends-service-3af672f83518',
      },
      {
        date: 'Jul, 2024',
        title: 'Design Proximity Service',
        href: 'https://medium.com/@abhishek-saini/design-proximity-service-5944155f5a86',
      }, // we can pass disabled: true for drafts
    ],
    more: { label: 'Read more on Medium', href: 'https://medium.com/@abhishek-saini' },
  },

  contact: {
    eyebrow: '06 — Contact',
    title: {
      prefix: 'Say hi on ',
      linkLabel: 'LinkedIn',
      linkHref: 'http://linkedin.com/in/abhishek-saini-880/',
      suffix: '.',
    },
    note: 'Always happy to chat about backend systems, GenAI products, or quietly removing complexity.',
    socials: [
      { label: 'GitHub', href: 'https://github.com/abhisaini880', external: true },
    ],
  },

  footer: {
    copyrightName: 'Abhishek Saini',
    build: 'Designed, debugged, and shipped from India ❤️',
  },
};
