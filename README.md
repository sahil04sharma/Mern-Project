# 🧑‍💻 MERN Multi-Step User Profile Update Form

This project is a full-stack MERN application featuring a multi-step form for user profile updates. It includes frontend + backend validation, dynamic fields, and real-time interactions such as username availability and password strength. Built as part of the Junior Developer assignment for **Frequent Research Fieldwork Solutions Pvt. Ltd.**

## 🌐 Live Links

- 🔗 **Frontend (Vercel):** https://mern-project-five-beige.vercel.app/
- 🔗 **Backend (Render):** https://mern-project-xv6d.onrender.com
- 📁 **GitHub Repo:**  https://github.com/sahil04sharma/Mern-Project/tree/main

---

## ⚙️ Tech Stack

- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## 🧩 Features

- ✅ **Multi-Step Form** with clean section separation
- 🔄 **Dynamic Field Behavior**:
  - Show custom gender textbox if "Other" selected
  - Show/Hide Company Name based on profession
- 📸 **File Upload**:
  - Live image preview (JPG/PNG, max 2MB)
- 🔐 **Password Section**:
  - Real-time strength meter
  - Validation for current & new passwords
- 🧠 **Smart Validations**:
  - Disable future DOB dates
  - Reset address if country changes
  - Username availability via API
- ✅ **Form Summary Page** before final submit
- 📦 **Saves to MongoDB** on final submission

---

## 📋 Form Fields & Validation

| Field             | Type          | Rules/Behavior |
|------------------|---------------|----------------|
| Profile Photo     | File Upload   | JPG/PNG, max 2MB, Required |
| Username          | Text          | Unique, 4–20 chars, no spaces |
| Current Password  | Password      | Required if updating |
| New Password      | Password      | 8+ chars, 1 special char, 1 number |
| Gender            | Radio + Text  | Show custom input if "Other" |
| Profession        | Dropdown      | Student/Developer/Entrepreneur |
| Company Name      | Text          | Required if Entrepreneur |
| Address Line 1    | Text          | Required |
| Country           | Dropdown      | Fetched from DB |
| State             | Dropdown      | Depends on selected country |
| City              | Dropdown      | Depends on selected state |
| Subscription Plan | Radio         | Basic / Pro / Enterprise |
| Newsletter        | Checkbox      | Default checked |

---

## 🛠️ Local Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/sahil04sharma/Mern-Project.git
cd Mern-Project
