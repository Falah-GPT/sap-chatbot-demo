// ============================================================
// SAP Assistant. Demo of the proposed capstone chatbot concept.
// All responses are scripted/rule-based to illustrate the idea;
// there is no real connection to Zayed University's SAP system.
// Menu paths below match the real Student Access Portal layout
// (Home, Academics, Courses, Quick Links, Help Center).
// ============================================================

const chatLog = document.getElementById("chatLog");
const composerForm = document.getElementById("composerForm");
const messageInput = document.getElementById("messageInput");
const resetBtn = document.getElementById("resetBtn");
const quickReplies = document.getElementById("quickReplies");

const WELCOME_MESSAGE = {
  text: "Hi! I'm the SAP Assistant, a concept demo from the capstone study on AI chatbot integration in Zayed University's Student Access Portal."
};

// ---------- Response engine ----------
// Ordered rules: first matching pattern wins.
const RULES = [
  {
    pattern: /\b(hi|hello|hey|salam|assalam)\b/i,
    respond: () => pick([
      "I can help with registration, grades, graduation status, course schedule, attendance, and advisor details.",
      "Ask me about your academic records and I will show you the steps."
    ])
  },
  {
    pattern: /how are you|how r u|how you doing|how's it going/i,
    respond: () => ({
      text: "I'm doing good. I can help you find SAP services faster. Ask me about registration, grades, course schedule, attendance, advisor, or graduation status."
    })
  },
  {
    pattern: /regist(er|ration)|add.*class|drop.*class|enroll/i,
    respond: () => ({
      text: "Registration lets you add, drop, or manage your classes for the selected term.\n\n1. Go to Quick Links\n2. Select Course Registration Self-Service\n3. Log in to Banner\n4. Select Student Registration\n5. Search for term and pick your courses"
    })
  },
  {
    pattern: /transcript|grade|marks|score/i,
    respond: () => ({
      text: "Grades show your course results, transcript, and academic record.\n\n1. Go to Academics\n2. Select Academic Transcript\n3. Choose the current term or full history"
    })
  },
  {
    pattern: /gpa/i,
    respond: () => ({
      text: "GPA shows your current academic performance and helps you check expected results.\n\n1. Go to Academics\n2. Select GPA Calculator\n3. Enter your expected grades"
    })
  },
  {
    pattern: /graduat|degree audit|degree progress|when.*finish/i,
    respond: () => ({
      text: "Graduation status shows your completed credits, missing requirements, and degree progress.\n\n1. Go to Academics\n2. Select Degree Audit\n3. Review completed and remaining requirements"
    })
  },
  {
    pattern: /attend|entry log|absen/i,
    respond: () => ({
      text: "Attendance shows your class attendance record and absence percentage.\n\n1. Go to Courses\n2. Select Class Attendance\n3. Choose the current term"
    })
  },
  {
    pattern: /hold/i,
    respond: () => ({
      text: "Holds show any account restrictions that may block services or registration.\n\n1. Go to Home\n2. Open Student Essentials\n3. Select Holds"
    })
  },
  {
    pattern: /exam/i,
    respond: () => ({
      text: "Exam schedule shows your exam dates, times, and rooms.\n\n1. Go to Courses\n2. Select Exam Schedules\n3. Choose the current term"
    })
  },
  {
    pattern: /course|class(es)?|schedule|timetable|section/i,
    respond: () => ({
      text: "Your course schedule shows your classes, timings, instructors, and rooms.\n\n1. Go to Courses\n2. Select Course Schedules\n3. Choose the current term"
    })
  },
  {
    pattern: /advisor|advising|counsel/i,
    respond: () => ({
      text: "Academic advisor shows your advisor name and contact information.\n\n1. Go to Academics\n2. Select Academic Advisors\n3. Review advisor details"
    })
  },
  {
    pattern: /blackboard|lms|assignment upload/i,
    respond: () => ({
      text: "Blackboard gives access to course materials, announcements, and assignment uploads.\n\n1. Go to Quick Links\n2. Select Blackboard Learn Portal\n3. Open your course"
    })
  },
  {
    pattern: /internship|career|job/i,
    respond: () => ({
      text: "Internship and career services help with internship tasks, jobs, and career support.\n\n1. Go to Quick Links\n2. Select Internship and Career Portal\n3. Choose the needed service"
    })
  },
  {
    pattern: /thesis/i,
    respond: () => ({
      text: "Graduate thesis management helps with thesis submission and tracking.\n\n1. Go to Quick Links\n2. Select Graduate Thesis Management\n3. Follow the submission steps"
    })
  },
  {
    pattern: /form/i,
    respond: () => ({
      text: "Academic forms are used for official student requests.\n\n1. Go to Quick Links\n2. Select Academic Electronic Forms\n3. Choose the needed form"
    })
  },
  {
    pattern: /messenger|message/i,
    respond: () => ({
      text: "ZU Messenger shows your university messages and unread message count.\n\n1. Go to Home\n2. Select ZU Messenger\n3. Open your inbox"
    })
  },
  {
    pattern: /(tech|technical) support|sanad|login|password|locked out/i,
    respond: () => ({
      text: "Technical support helps with login, password, and access problems.\n\n1. Go to Help Center\n2. Select Technical Support (Sanad)\n3. Submit your issue"
    })
  },
  {
    pattern: /registrar/i,
    respond: () => ({
      text: "Registrar's Office handles official academic records and student requests.\n\n1. Go to Help Center\n2. Select Registrar's Office\n3. Choose the needed service"
    })
  },
  {
    pattern: /feedback|complain|suggest/i,
    respond: () => ({
      text: "Feedback lets you send suggestions, complaints, or comments.\n\n1. Go to Help Center\n2. Select Send us your Feedback\n3. Write and submit your message"
    })
  },
  {
    pattern: /thank/i,
    respond: () => ({ text: "You're welcome. Let me know what else you want to check." })
  },
  {
    pattern: /slow|difficult|confus|hate|annoying|hard to/i,
    respond: () => ({
      text: "This chatbot is designed to reduce the time students spend searching for academic information.\n\n1. Ask for the service you need\n2. Read the short steps\n3. Follow the steps in SAP"
    })
  }
];

const FALLBACKS = [
  {
    text: "I'm still a concept demo, so I only know a few topics right now. Try asking about registration, grades, course schedule, attendance, advisor, or graduation status."
  }
];

function pick(list) {
  return { text: list[Math.floor(Math.random() * list.length)] };
}

function getBotResponse(userText) {
  for (const rule of RULES) {
    if (rule.pattern.test(userText)) return rule.respond();
  }
  return FALLBACKS[0];
}

// ---------- Rendering ----------
function addMessage({ text }, sender) {
  const row = document.createElement("div");
  row.className = `msg-row ${sender}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = sender === "bot" ? "ZU" : "You";
  avatar.setAttribute("aria-hidden", "true");

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  const p = document.createElement("span");
  p.textContent = text;
  bubble.appendChild(p);

  row.appendChild(avatar);
  row.appendChild(bubble);
  chatLog.appendChild(row);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function showTypingThenRespond(userText) {
  const typingRow = document.createElement("div");
  typingRow.className = "msg-row bot typing";
  typingRow.innerHTML = `
    <div class="avatar" aria-hidden="true">ZU</div>
    <div class="bubble"><span></span><span></span><span></span></div>
  `;
  chatLog.appendChild(typingRow);
  chatLog.scrollTop = chatLog.scrollHeight;

  const delay = 500 + Math.random() * 500;
  setTimeout(() => {
    typingRow.remove();
    addMessage(getBotResponse(userText), "bot");
  }, delay);
}

function sendUserMessage(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  addMessage({ text: trimmed }, "user");
  showTypingThenRespond(trimmed);
}

// ---------- Events ----------
composerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendUserMessage(messageInput.value);
  messageInput.value = "";
  messageInput.focus();
});

quickReplies.addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  sendUserMessage(btn.dataset.query);
});

resetBtn.addEventListener("click", () => {
  chatLog.innerHTML = "";
  addMessage(WELCOME_MESSAGE, "bot");
});

// ---------- Init ----------
addMessage(WELCOME_MESSAGE, "bot");
