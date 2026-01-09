type TaskFormData = {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
};

type NavItem = {
  key: string;
  title: string;
  href: string;
  icon?: React.ReactNode;
  badge?: number;
};

type User = {
  name?: string;
  role?: string;
  team?: string;
  email?: string;
  avatarUrl?: string;
};

type TaskFormData = {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
};