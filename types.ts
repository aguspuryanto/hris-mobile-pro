
export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  clockIn: string;
  clockOut?: string;
  location: { lat: number; lng: number };
  status: 'present' | 'late' | 'absent' | 'leave';
}

export interface Reimbursement {
  id: string;
  title: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  category: string;
}

export interface Loan {
  id: string;
  amount: number;
  installments: number;
  status: 'pending' | 'approved' | 'active' | 'completed';
  date: string;
}

export interface TaskProgress {
  id: string;
  title: string;
  progress: number;
  dueDate: string;
}

export interface Payroll {
  month: string;
  basicSalary: number;
  allowance: number;
  deductions: number;
  netPay: number;
}
