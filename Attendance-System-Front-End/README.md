# Attendance System Front-End | الواجهة الأمامية لنظام الحضور

---

## English

This is the front-end part of the Face Gate Attendance System for Employees. It is built with React.js and provides the user interface for both employees and administrators.

### How to Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. The app will run on [http://localhost:3000](http://localhost:3000) by default.

### Features

- Employee check-in/out using face recognition
- Admin dashboard for managing employees, departments, shifts, and reports

### Demo Admin Login

- Username: `it145`
- Password: `newpassword`

### Important Notes

- For data safety, destructive routes (edit/delete for Departments, Shifts, Employees, and Accounts) are disabled in the demo UI.
- To try the Face Recognition flow:
  1. Create a new employee account from the Admin Users page (Create Account).
  2. Activate the account (log in once with that account to initialize).
  3. Log out and log in with the created account, then navigate to the Attendance form to test the face recognition model.
  4. If camera permission is requested by the browser, allow access.

---

## العربية

هذا هو الجزء الخاص بالواجهة الأمامية لنظام بوابة الوجه - نظام حضور الموظفين. تم تطويره باستخدام React.js ويوفر واجهة المستخدم للموظفين والمسؤولين.

### طريقة التشغيل

1. ثبّت الحزم:
   ```bash
   npm install
   ```
2. شغّل الخادم:
   ```bash
   npm start
   ```
3. التطبيق يعمل افتراضياً على [http://localhost:3000](http://localhost:3000)

### المميزات

- تسجيل حضور وانصراف الموظفين بالتعرف على الوجه
- لوحة تحكم للمسؤول لإدارة الموظفين والأقسام والورديات والتقارير

### بيانات دخول المدير للتجربة

- اسم المستخدم: `it145`
- كلمة المرور: `newpassword`

### ملاحظات مهمة

- لحماية قاعدة البيانات، تم تعطيل عمليات التعديل/الحذف للأقسام والورديات والموظفين والحسابات في واجهة التجربة.
- لتجربة التعرف على الوجه:
  1. قم بإنشاء حساب لموظف جديد من صفحة المستخدمين (إنشاء حساب).
  2. فعّل الحساب (سجّل الدخول مرة بهذا الحساب للتفعيل الأولي).
  3. سجّل الخروج ثم سجّل الدخول بالحساب الذي أنشأته، ثم اذهب إلى نموذج الحضور لتجربة نموذج التعرف على الوجه.
  4. إذا ظهرت رسالة إذن الكاميرا من المتصفح، اسمح بالوصول.
