import type { SocialLink, StoryHighlight, PortfolioPost } from '../types/portfolio';

export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    title: "LinkedIn",
    icon: "logos:linkedin-icon",
    url: "http://linkedin.com/in/naveen-rm/"
  },
  {
    id: "github",
    title: "GitHub",
    icon: "logos:github-icon",
    url: "https://github.com/Naveen-R-M"
  },
  {
    id: "email",
    title: "Email",
    icon: "lucide:mail",
    url: "mailto:rajagopalmohanraj.n"
  },
  {
    id: "twitter",
    title: "X/Twitter",
    icon: "logos:twitter",
    url: "https://x.com/naveen_m19007"
  },
  {
    id: "resume",
    title: "Resume",
    icon: "lucide:file-text",
    url: "https://drive.google.com/file/d/1W37vu62lBOjWeeHW6kxzLiID8XviJC8O/view"
  }
];

export const storyHighlights: StoryHighlight[] = [
  {
    id: "skills",
    title: "Skills",
    icon: "gravity-ui:gear",
    items: [
      "Data Analysis & Visualization:\n🐼 Pandas\n🔢 NumPy\n📊 Matplotlib\n🎨 Seaborn\n🗄️ SQL\n⚛️ PyMOL\n📈 Tableau\n📊 Power BI",
      "Programming\n🐍 Python\n🤖 Scikit-learn\n🔗 LangChain\n🗣️ NLP\n📓 Jupyter\n🗄️ SQL\n🧠 TensorFlow\n🔥 PyTorch\n🧱 Keras",
      "Cloud & Infrastructure\n☁️ AWS\n🌐 Azure\n🐳 Docker\n☸️ Kubernetes",
      "Databases\n🗄️ SQL (PostgreSQL, MySQL)\n📦 NoSQL (MongoDB, DynamoDB)\n🔍 Vector Databases (Pinecone, FAISS)",
      "Core Competencies\n⛏️ Data Mining\n💡 Insights Generation\n💼 Business Use Case Evaluation\n🤖 Pipeline Automation"
    ]
  },
  {
    id: "projects",
    title: "Projects",
    icon: "gravity-ui:rocket",
    items: [
      "NewsNexus - News AI | Personal Project\n🔗 Built GraphRAG app for contextual news retrieval\n📰 Improved query analysis with LangChain for real-time summaries",
      "Parallel Computation for Stock Market Analysis\n📈 Accelerated stock prediction via distributed deep learning\n📊 Optimized cluster performance with dynamic scaling",
      "Atlee AI - Personalized Language Model\n🤖 Improved document processing with an advanced AI assistant\n🌐 Enhanced data collection ethics and built a Q&A tool",
      "ERP for Faculty Record Management\n🏛️ Automated ERP system, reducing administrative time and errors\n🔒 Secured academic records with PDPB-compliant access control\n📈 Increased self-service adoption with intuitive UI and automation"
    ]
  },
  {
    id: "research",
    title: "Research",
    icon: "gravity-ui:flask",
    items: [
      "Research Assistant (Software) | SimBioSys Lab\n🚀 Accelerated AlphaFold predictions via HPC parallelization\n🔬 Analyzed protein structures using PyMOL\n🌐 Built a web server for viral glycoprotein modeling",
      "Backpropagation in Spiking Neural Network\n📈 Improved SNN accuracy via novel backpropagation\n🧠 Modeled neuron spiking with Brian2 simulations",
      "AI and ML-Based Crop Detection\n🎯 Achieved high-accuracy species detection with on-device ML\n📱 Optimized app for efficient offline, mobile performance"
    ]
  },
  {
    id: "experience",
    title: "Experience",
    icon: "gravity-ui:star-fill",
    items: [
      "Software Engineer | Applied Data Finance\n🚀 Optimized database queries to reduce retrieval times by 25%, enhancing system scalability for millions of transactions\n🛠️ Resolved 90% of production issues in 24 hours, demonstrating problem-solving skills in a high-pressure environment",
      "Mobile/Web Developer Intern | AFour Technologies\n📱 Built social media app, enhancing community engagement\n💳 Integrated payment gateways, increasing efficiency\n⚡ Maximized app performance through data management"
    ]
  },
  {
    id: "interests",
    title: "Interests",
    icon: "gravity-ui:card-heart",
    items: [
      "🌱 Always Learning\nConstantly exploring new technologies from Spiking Neural Networks to Quantum Computing",
      "💡 Innovation Focus\nPassionate about creating meaningful impact through technology",
      "🌐 Community Building\nActive in tech communities and knowledge sharing",
      "🎬 Beyond Code\nEnjoying movies, hanging out with friends, and discovering new culinary delights"
    ]
  }
];

export const portfolioPosts: PortfolioPost[] = [
  {
    id: "newsNexus",
    title: "NewsNexus AI",
    image: "https://img.freepik.com/free-psd/artificial-intelligence-concept-template_23-2151613944.jpg?t=st=1742776553~exp=1742780153~hmac=45a5efedd3e8419a5ac4371bed5a169b0aadfae9d4461bc6b47a5d08d263dc62&w=1800",
    description: "An AI-powered news retrieval system using graph databases and LLMs",
    caption: "📰 GraphRAG Magic! ✨\n🔍 Contextual news retrieval powered by Neo4j, spaCy, & Ollama!\n🤯 50+ entity-relationship mappings per query!\nReal-time news summaries with LangChain! 🚀",
    tags: ["#AI", "#LangChain", "#Neo4j", "#NewsApp", "#GraphRAG"],
    githubLink: "https://github.com/Naveen-R-M/NewsNexus---News-AI",
    type: "project",
    likes: 42,
  },
  {
    id: "stockAnalysis",
    title: "Parallel Stock Analysis",
    image: "https://img.freepik.com/free-vector/flat-computer-engineering-concept_23-2148154743.jpg?t=st=1742776699~exp=1742780299~hmac=a4a45ae5adc5d817cedd2eddf2c89cc3390a26b0f8da2a4deaa4c19fa041a038&w=1800",
    description: "High-performance stock market analysis using parallel computing",
    caption: "🚀 Stock Market Prediction, Turbocharged! 📈\n⚡ 70% faster with distributed LSTM/GRU/RNN on SLURM & Dask!\n📊 40% cluster efficiency & less idle time.\nPredict the future, faster! 💰",
    tags: ["#MachineLearning", "#ParallelComputing", "#FinanceTech"],
    githubLink: "https://github.com/Naveen-R-M/Stock-Prediction-using-Parallel-Computing",
    type: "project",
    likes: 55,
  },
  {
    id: "atleeAi",
    title: "Atlee AI",
    image: "https://img.freepik.com/free-photo/ai-cloud-with-robot-head_23-2149739759.jpg?ga=GA1.1.1217933206.1742776486&semt=ais_keywords_boost",
    description: "Atlee AI - Personalized Language Model",
    caption: "🚀 AI Assistant Power-Up! 🤖\n\n✨ Boosted document parsing & context with LangChain, Vector DBs, RAG, & Claude!\n📈 Data processing efficiency = 💯\nPlus: Ethical web data & a slick Q&A tool! 🌐",
    githubLink: "https://github.com/atleeAi",
    tags: ["#RAG", "#AI", "#Streamlit", "#LangChain", "#VectorDB"],
    type: "project",
    likes: 62,
  },
  {
    id: "cvdCure",
    title: "CVD Cure",
    image: "https://img.freepik.com/premium-vector/flat-3d-isometric-covid-19-virus-surgical-mask-with-world-map-vaccine-syringe-new-normal-covid-19-virus-prevention-concept_47328-1584.jpg?w=1800",
    description: "CVD Cure - COVID-19 Detection and Prevention App",
    caption: "📱 COVID-19 App: Empowering Users! 🦠\n📈 Real-time stats & data viz, 150+ downloads!\n🔬 Offline X-ray detection (80% accuracy) with MobileNetV2!\nTech for public health! 💙",
    tags: ["#Flutter", "#COVID19", "#HealthTech", "#MobileApp"],
    githubLink: "https://github.com/Naveen-R-M/cvdCure",
    type: "project",
    likes: 15,
  },
  {
    id: "yogasanRectifier",
    title: "Yogasan Rectifier",
    image: "https://img.freepik.com/free-vector/yoga-practice-concept-illustration_114360-5554.jpg?t=st=1743033237~exp=1743036837~hmac=8bb7e304379bedc7bc5194675d3feb698095969ca9c687796761a340612eac13&w=1800",
    description: "Yogasan Rectifier - AI-Powered Yoga Trainer",
    caption: "🧠 AI-Powered Yoga Trainer! 📊\n⚡ Offline PoseNet with Flutter, TensorFlow, Keras!\n📵 25% less social media distraction during practice!\nTech meets tranquility! 🚀",
    tags: ["#MachineLearning", "#Flutter", "#Wellness"],
    githubLink: "https://github.com/Trojans2-0/yogasanRectifier",
    type: "project",
    likes: 25,
  },
  {
    id: "llokalityApp",
    title: "Llokality App",
    image: "https://img.freepik.com/free-photo/top-view-paper-style-community-map_23-2149377706.jpg?t=st=1742778724~exp=1742782324~hmac=05a88741bae8dc819e63032f197287ef2aaf97886faf7ebec6006400c008ae83&w=2000",
    description: "Llokality App - Connecting Communities",
    caption: "📱 Social App Boom! 🚀\n🤝 700+ users in 2 months, community vibes ON!\n💳 Stripe integration: 20% faster payments!\n⚡️ MongoDB optimization: 15% quicker load times!\nBuilding connections, one app at a time! 💙",
    tags: ["#MobileDevelopment", "#NoSQL", "#PaymentGateway"],
    githubLink: "https://github.com/Intech-mobile-app/flutter-mobile-app/tree/master/fl_mobile_intech_frontend",
    type: "experience",
    likes: 35,
  }
];
