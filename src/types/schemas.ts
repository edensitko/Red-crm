import { Timestamp } from 'firebase/firestore';

export type FirebaseDate = Date | Timestamp;

///////////////////////////// subtask ///////////////////////
export interface SubTask {
  id: string;
  title: string;
  createdAt: any;
  updatedAt: any;
  createdBy: string;
  urgent: 'נמוכה' | 'בינונית' | 'גבוהה' | string;
  status: string;
  dueDate: any;
  description: string;
  completed: boolean;
}

///////////////////////////// minimal entity ///////////////////////

export interface BaseEntity {
  id: string;
  createdAt: any;
  createdBy: string;
  updatedAt: any;
  updatedBy: string;
  isDeleted?: boolean;
  deletedAt?: FirebaseDate;
  deletedBy?: string;
}

/////////////////////////////  customer  ///////////////////////

export interface CustomerClass {
  id: string;
  name: string;  
  lastName: string;
  companyName: string;  
  assignedTo: string[];
  Balance: number;
  ComeFrom: string;
  Comments: string[];
  CreatedBy: string;
  createdAt: string;
  Email: string;
  IsDeleted: boolean;
  Links: Array<string | { url: string; description: string }>;
  Phone: number;
  Projects: string[];
  Status: "פעיל" | "לא פעיל" | "בטיפול";
  Tags: string[];
  Tasks: string[];
  Files: Array<{ name: string; url: string; uploadedAt: string; size: number }>;
 subTasks: SubTask[];  
}


/////////////////////////////  user exetends ///////////////////////

export interface User extends BaseEntity {
  email: string;
  name: string;
  role: 'admin' | 'user' | 'manager';
  createdAt: Date | string;
  lastLogin: Date | string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  isActive?: boolean;
  displayName?: string;


}


///////////////////////////// task ///////////////////////

export interface Task {
  id: string;
  tasks: string[];
  files: string[];
  links: string[];
  isFavorite: boolean;
  title: string;
  subtitle?: string;
  description: string;
  status: 'לביצוע' | 'בתהליך' | 'הושלם' | string;
  urgent: 'נמוכה' | 'בינונית' | 'גבוהה' | string;
  repeat?: 'none' | 'daily' | 'weekly' | 'monthly';
  dueDate?: Timestamp | null;
  assignedTo: string[];
  project?: Project | null;
  customers?: CustomerClass[];
  subTasks?: SubTask[];
  comments?: Array<{
    id: string;
    text: string;
    createdAt: Timestamp;
    createdBy: string;
    user?: {
      id: string;
      name: string;
    };
  }>;
  completed?: boolean;
  completedAt?: Timestamp | null;
  isDeleted?: boolean;
  createdAt?: Timestamp | null;


  
}

export interface Project extends BaseEntity {
  name: string;
  description: string;
  customerId: string;
  customer?: {
    id: string;
    name: string;
    companyName: string;
    email: string;
    phone: string;
  };
  userId: string;
  projectManager: string;
  status: 'לביצוע' | 'בתהליך' | 'הושלם';
  startDate: string;
  endDate: string;
  budget: number;
  isFavorite: boolean;
  links: string[];
  comments: Array<{
    text: string;
    createdAt: string;
    userId: string;
    user?: {
      id: string;
      name: string;
    };
  }>;
  files?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
    createdAt: string;
    createdBy: string;
  }>;
  tasks?: Array<{
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
    assignedTo: string;
    assignedUser?: {
      id: string;
      name: string;
    };
  }>;
}

///////////////////////////// lead ///////////////////////

export interface Lead extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost' | 'חדש' | 'נוצר קשר' | 'מוסמך' | 'הצעה' | 'משא ומתן' | 'סגור זכה' | 'סגור הפסיד';
  score: number;
  notes: string;
  estimatedValue: number;
  assignedTo: string;
  lastContact?: FirebaseDate;
  tags: string[];
  industry?: string;
  budget?: number;
  timeline?: 'immediate' | '1_month' | '3_months' | '6_months' | 'unknown';
  interests?: string[];
  competitors?: string[];
  meetings?: Array<{
    id: string;
    date: FirebaseDate;
    type: 'phone' | 'video' | 'in_person';
    summary: string;
    outcome?: string;
    nextSteps?: string;
  }>;
  requirements?: string[];
  objections?: string[];
  conversionProbability?: number;
  lostReason?: string;
  preferredContactTime?: 'morning' | 'afternoon' | 'evening';
  marketingCampaign?: string;
  referralSource?: string;
}


///////////////////////////// reports ///////////////////////

export interface Report extends BaseEntity {
  title: string;
  type: 'sales' | 'leads' | 'performance' | 'customer' | 'custom';
  description: string;
  parameters: Record<string, any>;
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    recipients: string[];
    lastRun?: FirebaseDate;
    nextRun?: FirebaseDate;
    format: 'pdf' | 'excel' | 'csv';
    timezone: string;
  };
  data: any;
  isPublic: boolean;
  category?: string;
  tags?: string[];
  version?: number;
  exportHistory?: Array<{
    id: string;
    format: 'pdf' | 'excel' | 'csv';
    downloadedAt: FirebaseDate;
    downloadedBy: string;
    fileSize: number;
    url: string;
  }>;
  filters?: Record<string, any>;
  visualizations?: Array<{
    type: 'chart' | 'table' | 'metric';
    config: Record<string, any>;
  }>;
  permissions?: {
    viewUsers: string[];
    editUsers: string[];
    departments: string[];
  };
}


///////////////////////////// activity ///////////////////////

export interface Activity extends BaseEntity {
  type: 'create' | 'update' | 'delete' | 'login' | 'export' | 'other';
  entityType: 'user' | 'customer' | 'lead' | 'task' | 'report';
  entityId: string;
  description: string;
  metadata?: Record<string, any>;
  ip?: string;
  userAgent?: string;
  completedAt?: FirebaseDate;
  dueDate?: FirebaseDate;
}

///////////////////////////// item project  ///////////////////////

export interface Item extends BaseEntity {
  name: string;
  description: string;
  status: string;
  projectId?: string;
  project?: {
    id: string;
    name: string;
    status: string;
  };
  assignedTo?: string;
  assignedUser?: {
    id: string;
    name: string;
  };
  dueDate?: FirebaseDate;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
    uploadedAt: FirebaseDate;
    uploadedBy: string;
  }>;
}

///////////////////////////// task customer ///////////////////////

export interface TaskCustomer {
  id: any;
  name: string;  
  lastName: string;
  companyName: string;  
  assignedTo: string[];
  Balance: number;
  ComeFrom: string;
  Comments: string[];
  CreatedBy: string;
  createdAt: string;
  Email: string;
  IsDeleted: boolean;
  LastName: string;
  Links: Array<string | { url: string; description: string }>;
  Phone: number;
  Projects: string[];
  Status: "פעיל" | "לא פעיל" | "בטיפול";
  Tags: string[];
  Tasks: string[];
  Files: Array<{ name: string; url: string; uploadedAt: string; size: number }>;
}

export type Customer = {
  name: string;
  companyName: string;
} & CustomerClass;

///////////////////////////// task user ///////////////////////
export interface TaskUser {
  id: string;
  email: string;
  name?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
}
