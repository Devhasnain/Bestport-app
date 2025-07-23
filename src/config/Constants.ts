import { JobStatus } from "../types/job";


export const dummyJobs = [
  {
    _id: "job1",
    urgency: "Low",
    title: "Fix kitchen sink leak",
    description: "The kitchen sink is leaking from the bottom and needs urgent repair.",
    category: "Plumbing",
    status: "assigned", // pending, reviewed, assigned, accepted, in-progress, completed
    customer: "customer1",
    employee: "employee1",
    assigned_by: "admin1",
    reviewed: true,
    createdAt: new Date("2025-06-01T10:00:00Z"),
    updatedAt: new Date("2025-06-02T09:00:00Z"),
    location: {
      address: "123 Main Street, New York",
      city: "New York",
      postal_code: "10001"
    },
    scheduled_date: new Date("2025-06-03T14:00:00Z"),
    is_paid: true,
    review: {
      rating: 4.5,
      feedback: "Great work, fixed it quickly!"
    }
  },
  {
    _id: "job2",
    urgency: "High",
    title: "Install ceiling fan",
    description: "Need a new ceiling fan installed in the living room.",
    category: "Electrical",
    status: "pending",
    customer: "customer2",
    employee: null,
    assigned_by: null,
    reviewed: false,
    createdAt: new Date("2025-06-05T11:30:00Z"),
    updatedAt: new Date("2025-06-05T11:30:00Z"),
    location: {
      address: "456 Oak Avenue, San Francisco",
      city: "San Francisco",
      postal_code: "94102"
    },
    scheduled_date: new Date("2025-06-10T16:00:00Z"),
    is_paid: false,
    review: null
  },
  {
    _id: "job3",
    urgency: "Medium",
    title: "Paint bedroom walls",
    description: "Repainting bedroom walls with a fresh coat of light blue.",
    category: "Painting",
    status: "completed",
    customer: "customer3",
    employee: "employee2",
    assigned_by: "admin1",
    reviewed: true,
    createdAt: new Date("2025-06-01T09:00:00Z"),
    updatedAt: new Date("2025-06-07T17:00:00Z"),
    location: {
      address: "789 Pine Street, Chicago",
      city: "Chicago",
      postal_code: "60605"
    },
    scheduled_date: new Date("2025-06-06T09:00:00Z"),
    is_paid: true,
    review: {
      rating: 5.0,
      feedback: "Excellent job and very neat!"
    }
  },
  {
    _id: "job1",
    urgency: "High",
    title: "Fix kitchen sink leak",
    description: "The kitchen sink is leaking from the bottom and needs urgent repair.",
    category: "Plumbing",
    status: "assigned", // pending, reviewed, assigned, accepted, in-progress, completed
    customer: "customer1",
    employee: "employee1",
    assigned_by: "admin1",
    reviewed: true,
    createdAt: new Date("2025-06-01T10:00:00Z"),
    updatedAt: new Date("2025-06-02T09:00:00Z"),
    location: {
      address: "123 Main Street, New York",
      city: "New York",
      postal_code: "10001"
    },
    scheduled_date: new Date("2025-06-03T14:00:00Z"),
    is_paid: true,
    review: {
      rating: 4.5,
      feedback: "Great work, fixed it quickly!"
    }
  },
  {
    _id: "job2",
    urgency: "Low",
    title: "Install ceiling fan",
    description: "Need a new ceiling fan installed in the living room.",
    category: "Electrical",
    status: "pending",
    customer: "customer2",
    employee: null,
    assigned_by: null,
    reviewed: false,
    createdAt: new Date("2025-06-05T11:30:00Z"),
    updatedAt: new Date("2025-06-05T11:30:00Z"),
    location: {
      address: "456 Oak Avenue, San Francisco",
      city: "San Francisco",
      postal_code: "94102"
    },
    scheduled_date: new Date("2025-06-10T16:00:00Z"),
    is_paid: false,
    review: null
  },
  {
    _id: "job3",
    urgency: "Medium",
    title: "Paint bedroom walls",
    description: "Repainting bedroom walls with a fresh coat of light blue.",
    category: "Painting",
    status: "completed",
    customer: "customer3",
    employee: "employee2",
    assigned_by: "admin1",
    reviewed: true,
    createdAt: new Date("2025-06-01T09:00:00Z"),
    updatedAt: new Date("2025-06-07T17:00:00Z"),
    location: {
      address: "789 Pine Street, Chicago",
      city: "Chicago",
      postal_code: "60605"
    },
    scheduled_date: new Date("2025-06-06T09:00:00Z"),
    is_paid: true,
    review: {
      rating: 5.0,
      feedback: "Excellent job and very neat!"
    }
  },
  {
    _id: "job1",
    urgency: "Low",
    title: "Fix kitchen sink leak",
    description: "The kitchen sink is leaking from the bottom and needs urgent repair.",
    category: "Plumbing",
    status: "assigned", // pending, reviewed, assigned, accepted, in-progress, completed
    customer: "customer1",
    employee: "employee1",
    assigned_by: "admin1",
    reviewed: true,
    createdAt: new Date("2025-06-01T10:00:00Z"),
    updatedAt: new Date("2025-06-02T09:00:00Z"),
    location: {
      address: "123 Main Street, New York",
      city: "New York",
      postal_code: "10001"
    },
    scheduled_date: new Date("2025-06-03T14:00:00Z"),
    is_paid: true,
    review: {
      rating: 4.5,
      feedback: "Great work, fixed it quickly!"
    }
  },
  {
    _id: "job2",
    urgency: "Low",
    title: "Install ceiling fan",
    description: "Need a new ceiling fan installed in the living room.",
    category: "Electrical",
    status: "pending",
    customer: "customer2",
    employee: null,
    assigned_by: null,
    reviewed: false,
    createdAt: new Date("2025-06-05T11:30:00Z"),
    updatedAt: new Date("2025-06-05T11:30:00Z"),
    location: {
      address: "456 Oak Avenue, San Francisco",
      city: "San Francisco",
      postal_code: "94102"
    },
    scheduled_date: new Date("2025-06-10T16:00:00Z"),
    is_paid: false,
    review: null
  },
  {
    _id: "job3",
    urgency: "Low",
    title: "Paint bedroom walls",
    description: "Repainting bedroom walls with a fresh coat of light blue.",
    category: "Painting",
    status: "completed",
    customer: "customer3",
    employee: "employee2",
    assigned_by: "admin1",
    reviewed: true,
    createdAt: new Date("2025-06-01T09:00:00Z"),
    updatedAt: new Date("2025-06-07T17:00:00Z"),
    location: {
      address: "789 Pine Street, Chicago",
      city: "Chicago",
      postal_code: "60605"
    },
    scheduled_date: new Date("2025-06-06T09:00:00Z"),
    is_paid: true,
    review: {
      rating: 5.0,
      feedback: "Excellent job and very neat!"
    }
  }
];

export const faqs = [
  {
    title: "What is Bestport?",
    description:
      "Bestport is a job management platform where customers can create service requests, and our verified employees complete them efficiently."
  },
  {
    title: "Who can register on Bestport?",
    description:
      "Only customers can register through the app. Employees are added and managed by the admin through the admin panel."
  },
  {
    title: "How do I create a job request?",
    description:
      "Once logged in as a customer, you can create a job by providing job details and address. The job is then reviewed by the admin before assignment."
  },
  {
    title: "How are jobs assigned to employees?",
    description:
      "After reviewing a customer's job request, the admin assigns it to an active employee. The employee can then accept or decline the job."
  },
  {
    title: "What happens after an employee accepts the job?",
    description:
      "Once accepted, the job status changes to 'Assigned'. The employee visits the provided address, performs the task, and marks it as completed."
  },
  {
    title: "How can I leave a review?",
    description:
      "After a job is marked completed, customers can go to the Completed Jobs tab and leave a review for the employee."
  },
  {
    title: "What about spare parts or products used during the job?",
    description:
      "If any spare parts are used, the employee can select them when marking the job as completed. This helps maintain service records."
  },
  {
    title: "How is the job payment handled?",
    description:
      "All payments are handled in cash between the customer and the employee at the job location."
  },
  {
    title: "Can I update my email or personal details?",
    description:
      "Yes, you can update your name, email, and password in the app settings. Make sure your email is valid and verified."
  },
  {
    title: "What is the Customer Support screen?",
    description:
      "Customers and employees can use the Customer Support screen to send messages or report issues directly to the admin."
  },
  {
    title: "Why do you need notification permissions?",
    description:
      "Notification permissions are required to keep you updated about job status, admin messages, and other important events."
  },
  {
    title: "Why do you need media permissions?",
    description:
      "Media permissions are needed if you upload or attach any images or documents related to a job or support request."
  },
  {
    title: "Do I need internet access to use the app?",
    description:
      "Yes, an active internet connection is required to use Bestport, receive updates, and communicate with the admin."
  }
];

export const privacyPolicy = [
  {
    title: "Introduction",
    content:
      "At Bestport, your privacy is important to us. This policy explains what data we collect, how we use it, and your rights as a user."
  },
  {
    title: "Personal Information",
    content:
      "We collect personal information such as your name, email address, and phone number to create and manage your account. Customers can register through the app, while employees are added via the admin panel."
  },
  {
    title: "Usage of Information",
    content:
      "Your information is used to manage job assignments, support communication, and enhance your experience on the app."
  },
  {
    title: "Email Updates",
    content:
      "We may send you important notifications regarding your job status or account. Please ensure your email is valid and verified."
  },
  {
    title: "Permissions",
    content:
      "Bestport may request access to notifications, media, and internet. These permissions are essential for core functionality such as job updates, uploading media, and sending support messages."
  },
  {
    title: "Job and Payment Data",
    content:
      "Job history, used products, and customer reviews are stored securely. However, payment is handled directly in cash between customer and employee, and we do not store payment information."
  },
  {
    title: "Third-Party Services",
    content:
      "We use services like Google Sign-In for authentication. These services have their own privacy policies."
  },
  {
    title: "Data Security",
    content:
      "We implement reasonable security measures to protect your data. However, no method of transmission over the Internet is 100% secure."
  },
  {
    title: "User Rights",
    content:
      "You have the right to update or delete your personal information. Contact support via the app if you wish to do so."
  },
  {
    title: "Changes to Policy",
    content:
      "We may update this policy occasionally. Any changes will be reflected in the app. Continued use of the app constitutes acceptance of the updated policy."
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please use the Customer Support screen in the app to contact the admin."
  }
];



export const serviceTypes = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Painting",
  "Pest Control",
  "AC Repair & Maintenance",
  "Appliance Repair",
  "Carpentry",
  "IT Support",
  "Security System Installation",
  "Gardening & Landscaping",
  "Furniture Assembly",
  "Roof Repair",
  "Water Tank Cleaning",
  "CCTV Installation",
  "Vehicle Maintenance",
  "Home Renovation",
  "Locksmith Services",
  "Moving & Packing",
  "Custom Request"
];


export const urgencyLevel = [
  "Low", "Medium", "High"
]

export const urgencyLevelText = (urgency: string) => {

  switch (urgency) {
    case "Low":
      return "No rush"
    case "Medium":
      return "Should be handled soon"
    case "High":
      return "Requires immediate attention"
  }
}


export function formatJobStatus(status: JobStatus): string {
  const map: Record<JobStatus, string> = {
    pending: 'Pending',
    'in-progress': 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };

  return map[status] || status;
}


export function getStatusColor(status: JobStatus): string {
  const colorMap: Record<JobStatus, string> = {
    pending: '#facc15',        // Yellow
    'in-progress': '#06b6d4',  // Cyan
    completed: '#22c55e',      // Green
    cancelled: '#ef4444',      // Red
  };

  return colorMap[status] || '#6b7280';
}