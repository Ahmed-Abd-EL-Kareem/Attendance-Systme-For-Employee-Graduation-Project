# Face Gate - Attendance System for Employees | نظام بوابة الوجه - نظام حضور الموظفين

---

## ⚡️ This project was fully developed by me, individually, as a graduation project.

## ⚡️ تم تطوير هذا المشروع بالكامل بشكل فردي كمشروع تخرج.

---

## English

### Project Overview

Face Gate is a graduation project for an employee attendance system based on facial recognition. The system consists of a backend (Node.js/Express) and a frontend (React.js). It allows employees to check in/out using face recognition, and provides an admin dashboard for managing employees, departments, shifts, and attendance reports.

### Live Demo

You can try the system online here: [https://attendance-system-mu.vercel.app/](https://attendance-system-mu.vercel.app/)

### Demo Admin Login

- Username: `it145`
- Password: `newpassword`

### How to Try Face Recognition

1. Log in as admin using the credentials above.
2. Go to the Employee page and create a new employee (if needed).
3. Go to the Users page and create an account for that employee (username/password).
4. Log out, then return to the Login page and sign in with the newly created employee account.
5. After login, open the Attendance form to test the face recognition model.
6. Allow camera permissions when prompted by the browser.

### Features

- Employee attendance using face recognition
- Admin dashboard for managing employees, departments, shifts, and users
- Attendance and absence reports
- Secure authentication and user management

### Technologies Used

- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT (jsonwebtoken), Multer, Cloudinary
- **Frontend:** React.js, React Router, React Query, React-Bootstrap/Bootstrap, React Toastify, React Table, Lucide Icons
- **Face Recognition:** face-api.js
- **Maps:** Mapbox GL JS
- **Build Tools:** CRACO (Create React App Configuration Override)
- **Data Storage (Demo):** JSON files (can be replaced with MongoDB in production)

Note: Edit/Delete actions for Departments, Shifts, Employees, and Accounts are disabled in the demo to keep the shared database safe.

---

## العربية

### نظرة عامة على المشروع

بوابة الوجه هو مشروع تخرج لنظام حضور الموظفين يعتمد على تقنية التعرف على الوجه. يتكون النظام من واجهة خلفية (Node.js/Express) وواجهة أمامية (React.js). يسمح للموظفين بتسجيل الحضور والانصراف باستخدام التعرف على الوجه، ويوفر لوحة تحكم للمسؤول لإدارة الموظفين والأقسام والورديات والتقارير.

### تجربة النظام مباشرة

يمكنك تجربة النظام من خلال الرابط التالي: [https://attendance-system-mu.vercel.app/](https://attendance-system-mu.vercel.app/)

### بيانات دخول المدير للتجربة

- اسم المستخدم: `it145`
- كلمة المرور: `newpassword`

### طريقة تجربة التعرف على الوجه

1. سجِّل الدخول كمسؤول باستخدام البيانات أعلاه.
2. انتقل إلى صفحة الموظفين وقم بإنشاء موظف جديد (إن لزم).
3. انتقل إلى صفحة المستخدمين وأنشئ حساباً لذلك الموظف (اسم مستخدم وكلمة مرور).
4. سجِّل الخروج، ثم عُد إلى صفحة تسجيل الدخول وسجِّل الدخول بالحساب الذي أنشأته للتو.
5. بعد تسجيل الدخول، افتح نموذج الحضور لتجربة نموذج التعرف على الوجه.
6. عند ظهور طلب إذن الكاميرا من المتصفح، اسمح بالوصول.

### المميزات

- تسجيل حضور الموظفين باستخدام التعرف على الوجه
- لوحة تحكم للمسؤول لإدارة الموظفين، الأقسام، الورديات والمستخدمين
- تقارير الحضور والغياب
- نظام مصادقة وإدارة مستخدمين آمن

### التقنيات المستخدمة

- **الخلفية (Backend):** Node.js, Express.js, MongoDB, Mongoose, JWT (jsonwebtoken), Multer, Cloudinary
- **الواجهة الأمامية (Frontend):** React.js, React Router, React Query, React-Bootstrap/Bootstrap, React Toastify, React Table, Lucide Icons
- **التعرف على الوجه:** face-api.js
- **الخرائط:** Mapbox GL JS
- **أدوات البناء:** CRACO (تخصيص Create React App)
- **التخزين (نسخة التجربة):** ملفات JSON (ويمكن استبدالها بـ MongoDB في بيئة الإنتاج)

ملاحظة: تم تعطيل عمليات التعديل/الحذف للأقسام والورديات والموظفين والحسابات في نسخة التجربة للحفاظ على سلامة قاعدة البيانات المشتركة.

---
