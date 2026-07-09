# SAP Assistant, Chatbot Concept Demo

A working front-end demo of the AI chatbot proposed in *"AI Chatbot Integration in Student Access Portal for Zayed University."* It's a rule-based prototype, no real AI model or SAP connection, built to give a feel for the interaction the capstone study describes.

## What it demonstrates

- A chat interface styled to match the capstone poster, with the online-status dot in Zayed University's maroon (`#9B1F36`)
- Scripted responses that point to the real Student Access Portal menu structure: **Academics** (Academic Transcript, Academic Standing, Academic Advisors, Degree Audit, GPA Calculator), **Courses** (Course Schedules, Class Attendance, Exam Schedules, Course Projection), **Quick Links** (Course Registration Self-Service, Advising and Risk Management, Blackboard, and more), and **Help Center** (User Guides, Registrar's Office, Technical Support / Sanad)
- Quick-reply buttons for the tasks students asked for most in the survey: registration, grades, graduation status, course schedule, attendance, and advisor contact
- A typing indicator to simulate response latency
- Keyword matching, so free-typed questions like *"when do I graduate?"* or *"what's my attendance?"* also get routed to the right menu path

## How to run it in VS Code

1. Unzip this folder and open it in VS Code (`File → Open Folder…`).
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions panel if you don't have it.
3. Right-click `index.html` in the file explorer and choose **"Open with Live Server."**
4. Your browser opens the demo at `http://127.0.0.1:5500` (or similar), no build step, no npm install needed.

Alternatively, just double-click `index.html` to open it directly in a browser, it will work, though Live Server gives you auto-refresh while you edit.

## Files

- `index.html`: page structure
- `style.css`: visual design (fonts loaded from Google Fonts, so you'll need an internet connection the first time)
- `script.js`: the response engine and chat logic (this is the file to edit if you want to add new topics)

## Extending it

To add a new topic, open `script.js` and add a rule to the `RULES` array near the top:

```js
{
  pattern: /library|book|study room/i,
  respond: () => ({
    text: "Library hours and study room bookings are under Quick Links, then Electronic Services Online.",
    hint: "Study rooms can be reserved up to 7 days in advance."
  })
}
```

Rules are checked in order, so put more specific patterns above more general ones.

## Note

This is a static, front-end-only prototype meant to illustrate the *interaction design* of the proposed chatbot for a presentation or demo. It is not connected to any real AI model or to Zayed University's actual SAP system.
