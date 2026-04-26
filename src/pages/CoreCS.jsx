// src/pages/CoreCS.jsx
import { motion } from 'framer-motion';

const topics = [
  {
    title: 'Operating Systems',
    icon: '🖥️',
    color: '#6c5ce7',
    items: [
      'Process Management & Scheduling',
      'Memory Management (Paging, Segmentation)',
      'File Systems & I/O',
      'Concurrency & Deadlocks',
      'Virtualisation Basics',
    ],
  },
  {
    title: 'Database Management Systems',
    icon: '🗄️',
    color: '#00b894',
    items: [
      'Relational Model & SQL',
      'Normalization & ER Diagrams',
      'Transactions & ACID Properties',
      'Indexing & Query Optimization',
      'NoSQL Basics (MongoDB)',
    ],
  },
  {
    title: 'Computer Networks',
    icon: '🌐',
    color: '#fdcb6e',
    items: [
      'OSI & TCP/IP Models',
      'HTTP, DNS, SMTP Protocols',
      'IP Addressing & Subnetting',
      'Routing Algorithms',
      'Network Security Fundamentals',
    ],
  },
  {
    title: 'Object-Oriented Programming',
    icon: '📦',
    color: '#e17055',
    items: [
      'Classes & Objects',
      'Inheritance & Polymorphism',
      'Encapsulation & Abstraction',
      'Design Patterns (Singleton, Factory)',
      'SOLID Principles',
    ],
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CoreCS = () => (
  <div className="corecs-page">
    <div className="floating-shapes">
      <motion.div className="shape shape-1" animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 6 }} />
      <motion.div className="shape shape-2" animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 8 }} />
    </div>

    <div className="container py-5">
      <motion.div
        className="text-center mb-5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="corecs-heading">Core Computer Science</h1>
        <p className="lead mx-auto" style={{ maxWidth: 600 }}>
          Foundational knowledge that powers everything I build.
        </p>
      </motion.div>

      <motion.div
        className="row g-4"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {topics.map((topic, idx) => (
          <motion.div key={idx} className="col-md-6" variants={item}>
            <div className="glass-card corecs-card p-4 h-100">
              <div className="d-flex align-items-center mb-3">
                <span className="corecs-icon me-2" style={{ fontSize: '1.8rem' }}>
                  {topic.icon}
                </span>
                <h4 className="corecs-topic-title mb-0">{topic.title}</h4>
              </div>
              <ul className="corecs-list">
                {topic.items.map((item, i) => (
                  <li key={i} className="corecs-list-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
);

export default CoreCS;