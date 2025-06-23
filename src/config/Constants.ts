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
    title: "What is your return policy?",
    description: "You can return any item within 30 days of purchase as long as it's in its original condition and packaging."
  },
  {
    title: "How can I track my order?",
    description: "Once your order is shipped, you’ll receive an email with a tracking number and link to track your delivery."
  },
  {
    title: "Do you offer international shipping?",
    description: "Yes, we ship internationally. Shipping costs and delivery times vary depending on the destination."
  },
  {
    title: "How do I reset my password?",
    description: "Click on the 'Forgot Password' link on the login page, and follow the instructions to reset your password via email."
  },
  {
    title: "Can I cancel or modify my order?",
    description: "You can cancel or change your order within 1 hour of placing it by contacting our support team."
  },
  {
    title: "What payment methods do you accept?",
    description: "We accept all major credit/debit cards, PayPal, Apple Pay, and Google Pay."
  },
  {
    title: "Is my personal information secure?",
    description: "Yes, we use industry-standard encryption to protect your data and never share it with third parties without your consent."
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
    assigned: 'Assigned',
    'in-progress': 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };

  return map[status] || status;
}


export function getStatusColor(status: JobStatus): string {
  const colorMap: Record<JobStatus, string> = {
    pending: '#facc15',        // Yellow
    assigned: '#3b82f6',       // Blue
    'in-progress': '#06b6d4',  // Cyan
    completed: '#22c55e',      // Green
    cancelled: '#ef4444',      // Red
  };

  return colorMap[status] || '#6b7280';
}