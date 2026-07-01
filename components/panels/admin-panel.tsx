'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface AdminPanelProps {
  activeMenu: string;
}

type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
  skill: string;
  experience: number;
};

type Project = {
  id: number;
  name: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: string;
};

type InventoryItem = {
  id: number;
  name: string;
  quantity: number;
  reorderLevel: number;
  unitPrice: number;
};

type Task = {
  id: number;
  title: string;
  assignedTo: string;
  status: string;
  deadline: string;
};

type EmployeeForm = Omit<Employee, 'id'>;
type ProjectForm = Omit<Project, 'id'>;
type InventoryForm = Omit<InventoryItem, 'id'>;
type TaskForm = Omit<Task, 'id'>;

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@construct.com',
    role: 'Site Manager',
    skill: 'Project Management',
    experience: 5,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@construct.com',
    role: 'Engineer',
    skill: 'Civil Engineering',
    experience: 8,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@construct.com',
    role: 'Supervisor',
    skill: 'Site Supervision',
    experience: 12,
  },
];

const initialProjects: Project[] = [
  {
    id: 1,
    name: 'Downtown Plaza',
    budget: 500000,
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    status: 'In Progress',
  },
  {
    id: 2,
    name: 'Metro Station',
    budget: 1200000,
    startDate: '2024-03-01',
    endDate: '2025-03-01',
    status: 'In Progress',
  },
  {
    id: 3,
    name: 'Residential Complex',
    budget: 800000,
    startDate: '2024-06-01',
    endDate: '2025-06-01',
    status: 'Planning',
  },
];

const initialInventory: InventoryItem[] = [
  {
    id: 1,
    name: 'Cement (50kg)',
    quantity: 5000,
    reorderLevel: 1000,
    unitPrice: 250,
  },
  {
    id: 2,
    name: 'Steel Rods (10mm)',
    quantity: 2000,
    reorderLevel: 500,
    unitPrice: 450,
  },
  {
    id: 3,
    name: 'Brick (Standard)',
    quantity: 50000,
    reorderLevel: 10000,
    unitPrice: 8,
  },
];

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Site Inspection',
    assignedTo: 'John Doe',
    status: 'Completed',
    deadline: '2024-03-01',
  },
  {
    id: 2,
    title: 'Permit Review',
    assignedTo: 'Jane Smith',
    status: 'In Progress',
    deadline: '2024-03-10',
  },
  {
    id: 3,
    title: 'Material Procurement',
    assignedTo: 'Mike Johnson',
    status: 'Pending',
    deadline: '2024-03-18',
  },
];

const dashboardData = [
  { month: 'Jan', projects: 4, completed: 2, pending: 2 },
  { month: 'Feb', projects: 6, completed: 4, pending: 2 },
  { month: 'Mar', projects: 8, completed: 5, pending: 3 },
  { month: 'Apr', projects: 10, completed: 7, pending: 3 },
];

const projectStatusData = [
  { name: 'Completed', value: 12 },
  { name: 'In Progress', value: 8 },
  { name: 'Planning', value: 4 },
];

const COLORS = ['#3b82f6', '#f97316', '#8b5cf6'];

export default function AdminPanel({ activeMenu }: AdminPanelProps) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [employeeForm, setEmployeeForm] = useState<EmployeeForm>({
    name: '',
    email: '',
    role: '',
    skill: '',
    experience: 0,
  });

  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState<ProjectForm>({
    name: '',
    budget: 0,
    startDate: '',
    endDate: '',
    status: 'In Progress',
  });

  const [isInventoryDialogOpen, setIsInventoryDialogOpen] = useState(false);
  const [currentInventoryItem, setCurrentInventoryItem] = useState<InventoryItem | null>(null);
  const [inventoryForm, setInventoryForm] = useState<InventoryForm>({
    name: '',
    quantity: 0,
    reorderLevel: 0,
    unitPrice: 0,
  });

  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [taskForm, setTaskForm] = useState<TaskForm>({
    title: '',
    assignedTo: '',
    status: 'Pending',
    deadline: '',
  });

  const resetEmployeeForm = () => {
    setCurrentEmployee(null);
    setEmployeeForm({ name: '', email: '', role: '', skill: '', experience: 0 });
  };

  const resetProjectForm = () => {
    setCurrentProject(null);
    setProjectForm({ name: '', budget: 0, startDate: '', endDate: '', status: 'In Progress' });
  };

  const resetInventoryForm = () => {
    setCurrentInventoryItem(null);
    setInventoryForm({ name: '', quantity: 0, reorderLevel: 0, unitPrice: 0 });
  };

  const resetTaskForm = () => {
    setCurrentTask(null);
    setTaskForm({ title: '', assignedTo: '', status: 'Pending', deadline: '' });
  };

  const handleEmployeeDialogOpen = (employee?: Employee) => {
    if (employee) {
      setCurrentEmployee(employee);
      setEmployeeForm({
        name: employee.name,
        email: employee.email,
        role: employee.role,
        skill: employee.skill,
        experience: employee.experience,
      });
    } else {
      resetEmployeeForm();
    }
    setIsEmployeeDialogOpen(true);
  };

  const handleEmployeeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentEmployee) {
      setEmployees((items) =>
        items.map((item) =>
          item.id === currentEmployee.id ? { ...item, ...employeeForm } : item
        )
      );
    } else {
      const nextId = Math.max(0, ...employees.map((item) => item.id)) + 1;
      setEmployees((items) => [...items, { id: nextId, ...employeeForm }]);
    }

    setIsEmployeeDialogOpen(false);
    resetEmployeeForm();
  };

  const handleEmployeeDelete = (id: number) => {
    setEmployees((items) => items.filter((item) => item.id !== id));
  };

  const handleProjectDialogOpen = (project?: Project) => {
    if (project) {
      setCurrentProject(project);
      setProjectForm({
        name: project.name,
        budget: project.budget,
        startDate: project.startDate,
        endDate: project.endDate,
        status: project.status,
      });
    } else {
      resetProjectForm();
    }
    setIsProjectDialogOpen(true);
  };

  const handleProjectSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentProject) {
      setProjects((items) =>
        items.map((item) =>
          item.id === currentProject.id ? { ...item, ...projectForm } : item
        )
      );
    } else {
      const nextId = Math.max(0, ...projects.map((item) => item.id)) + 1;
      setProjects((items) => [...items, { id: nextId, ...projectForm }]);
    }

    setIsProjectDialogOpen(false);
    resetProjectForm();
  };

  const handleProjectDelete = (id: number) => {
    setProjects((items) => items.filter((item) => item.id !== id));
  };

  const handleInventoryDialogOpen = (item?: InventoryItem) => {
    if (item) {
      setCurrentInventoryItem(item);
      setInventoryForm({
        name: item.name,
        quantity: item.quantity,
        reorderLevel: item.reorderLevel,
        unitPrice: item.unitPrice,
      });
    } else {
      resetInventoryForm();
    }
    setIsInventoryDialogOpen(true);
  };

  const handleInventorySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentInventoryItem) {
      setInventory((items) =>
        items.map((item) =>
          item.id === currentInventoryItem.id ? { ...item, ...inventoryForm } : item
        )
      );
    } else {
      const nextId = Math.max(0, ...inventory.map((item) => item.id)) + 1;
      setInventory((items) => [...items, { id: nextId, ...inventoryForm }]);
    }

    setIsInventoryDialogOpen(false);
    resetInventoryForm();
  };

  const handleInventoryDelete = (id: number) => {
    setInventory((items) => items.filter((item) => item.id !== id));
  };

  const handleTaskDialogOpen = (task?: Task) => {
    if (task) {
      setCurrentTask(task);
      setTaskForm({
        title: task.title,
        assignedTo: task.assignedTo,
        status: task.status,
        deadline: task.deadline,
      });
    } else {
      resetTaskForm();
    }
    setIsTaskDialogOpen(true);
  };

  const handleTaskSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentTask) {
      setTasks((items) =>
        items.map((item) =>
          item.id === currentTask.id ? { ...item, ...taskForm } : item
        )
      );
    } else {
      const nextId = Math.max(0, ...tasks.map((item) => item.id)) + 1;
      setTasks((items) => [...items, { id: nextId, ...taskForm }]);
    }

    setIsTaskDialogOpen(false);
    resetTaskForm();
  };

  const handleTaskDelete = (id: number) => {
    setTasks((items) => items.filter((item) => item.id !== id));
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Total Projects</p>
              <p className="text-3xl font-bold text-primary mt-2">{projects.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Active Employees</p>
              <p className="text-3xl font-bold text-primary mt-2">{employees.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Total Budget</p>
              <p className="text-3xl font-bold text-accent mt-2">
                ${projects.reduce((sum, project) => sum + project.budget, 0).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Completion Rate</p>
              <p className="text-3xl font-bold text-green-600 mt-2">78%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>Monthly project tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="completed" stroke="var(--color-primary)" strokeWidth={2} />
                <Line type="monotone" dataKey="pending" stroke="var(--color-accent)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
            <CardDescription>Current project breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={projectStatusData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={100} fill="#8884d8" dataKey="value">
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderEmployees = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Manage Employees</h3>
        <Dialog open={isEmployeeDialogOpen} onOpenChange={(open) => { if (!open) resetEmployeeForm(); setIsEmployeeDialogOpen(open); }}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentEmployee ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
              <DialogDescription>Enter employee details to save them.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEmployeeSubmit} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input value={employeeForm.name} onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })} required />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={employeeForm.email} onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })} required />
              </div>
              <div>
                <Label>Role</Label>
                <Input value={employeeForm.role} onChange={(e) => setEmployeeForm({ ...employeeForm, role: e.target.value })} required />
              </div>
              <div>
                <Label>Skill</Label>
                <Input value={employeeForm.skill} onChange={(e) => setEmployeeForm({ ...employeeForm, skill: e.target.value })} required />
              </div>
              <div>
                <Label>Experience (years)</Label>
                <Input type="number" min={0} value={employeeForm.experience} onChange={(e) => setEmployeeForm({ ...employeeForm, experience: Number(e.target.value) })} required />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  {currentEmployee ? 'Save Changes' : 'Add Employee'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Employee List</CardTitle>
          <CardDescription>All registered employees in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Skill</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((emp) => (
                  <TableRow key={emp.id} className="border-border">
                    <TableCell className="font-medium">{emp.name}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{emp.role}</Badge>
                    </TableCell>
                    <TableCell>{emp.skill}</TableCell>
                    <TableCell>{emp.experience} years</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEmployeeDialogOpen(emp)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEmployeeDelete(emp.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Manage Projects</h3>
        <Dialog open={isProjectDialogOpen} onOpenChange={(open) => { if (!open) resetProjectForm(); setIsProjectDialogOpen(open); }}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentProject ? 'Edit Project' : 'Add Project'}</DialogTitle>
              <DialogDescription>Fill in the project details to save it.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div>
                <Label>Project Name</Label>
                <Input value={projectForm.name} onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })} required />
              </div>
              <div>
                <Label>Budget</Label>
                <Input type="number" min={0} value={projectForm.budget} onChange={(e) => setProjectForm({ ...projectForm, budget: Number(e.target.value) })} required />
              </div>
              <div>
                <Label>Start Date</Label>
                <Input type="date" value={projectForm.startDate} onChange={(e) => setProjectForm({ ...projectForm, startDate: e.target.value })} required />
              </div>
              <div>
                <Label>End Date</Label>
                <Input type="date" value={projectForm.endDate} onChange={(e) => setProjectForm({ ...projectForm, endDate: e.target.value })} required />
              </div>
              <div>
                <Label>Status</Label>
                <Input value={projectForm.status} onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })} required />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  {currentProject ? 'Save Changes' : 'Add Project'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
          <CardDescription>All projects in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="border border-border rounded-lg p-4 bg-background">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-foreground">{project.name}</h4>
                  <Badge variant={project.status === 'In Progress' ? 'default' : 'secondary'}>{project.status}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground">Budget</p>
                    <p className="font-medium text-foreground">${project.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Start Date</p>
                    <p className="font-medium text-foreground">{project.startDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">End Date</p>
                    <p className="font-medium text-foreground">{project.endDate}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleProjectDialogOpen(project)}>
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleProjectDelete(project.id)}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Inventory Management</h3>
        <Dialog open={isInventoryDialogOpen} onOpenChange={(open) => { if (!open) resetInventoryForm(); setIsInventoryDialogOpen(open); }}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentInventoryItem ? 'Edit Inventory Item' : 'Add Inventory Item'}</DialogTitle>
              <DialogDescription>Update inventory stock or add a new item.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInventorySubmit} className="space-y-4">
              <div>
                <Label>Item Name</Label>
                <Input value={inventoryForm.name} onChange={(e) => setInventoryForm({ ...inventoryForm, name: e.target.value })} required />
              </div>
              <div>
                <Label>Quantity</Label>
                <Input type="number" min={0} value={inventoryForm.quantity} onChange={(e) => setInventoryForm({ ...inventoryForm, quantity: Number(e.target.value) })} required />
              </div>
              <div>
                <Label>Reorder Level</Label>
                <Input type="number" min={0} value={inventoryForm.reorderLevel} onChange={(e) => setInventoryForm({ ...inventoryForm, reorderLevel: Number(e.target.value) })} required />
              </div>
              <div>
                <Label>Unit Price</Label>
                <Input type="number" min={0} value={inventoryForm.unitPrice} onChange={(e) => setInventoryForm({ ...inventoryForm, unitPrice: Number(e.target.value) })} required />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  {currentInventoryItem ? 'Save Changes' : 'Add Item'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Stock Items</CardTitle>
          <CardDescription>Current inventory status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead>Item Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Reorder Level</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => (
                  <TableRow key={item.id} className="border-border">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.reorderLevel}</TableCell>
                    <TableCell>${item.unitPrice}</TableCell>
                    <TableCell className="font-medium">${(item.quantity * item.unitPrice).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={item.quantity > item.reorderLevel ? 'default' : 'destructive'}>
                        {item.quantity > item.reorderLevel ? 'In Stock' : 'Low Stock'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleInventoryDialogOpen(item)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleInventoryDelete(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Task Management</h3>
        <Dialog open={isTaskDialogOpen} onOpenChange={(open) => { if (!open) resetTaskForm(); setIsTaskDialogOpen(open); }}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentTask ? 'Edit Task' : 'Add Task'}</DialogTitle>
              <DialogDescription>Assign a new task or update an existing one.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleTaskSubmit} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} required />
              </div>
              <div>
                <Label>Assigned To</Label>
                <Input value={taskForm.assignedTo} onChange={(e) => setTaskForm({ ...taskForm, assignedTo: e.target.value })} required />
              </div>
              <div>
                <Label>Status</Label>
                <Input value={taskForm.status} onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })} required />
              </div>
              <div>
                <Label>Deadline</Label>
                <Input type="date" value={taskForm.deadline} onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })} required />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  {currentTask ? 'Save Changes' : 'Add Task'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Current Tasks</CardTitle>
          <CardDescription>Tasks assigned by the admin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead>Title</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} className="border-border">
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>{task.assignedTo}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>{task.deadline}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleTaskDialogOpen(task)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleTaskDelete(task.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">System Settings</h3>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Administrator Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>System Name</Label>
            <Input placeholder="CONSTRUCT Edge" className="mt-2" />
          </div>
          <div>
            <Label>Company Email</Label>
            <Input placeholder="admin@construct.com" className="mt-2" />
          </div>
          <Button className="bg-primary hover:bg-primary/90">Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div>
      {activeMenu === 'dashboard' && renderDashboard()}
      {activeMenu === 'employees' && renderEmployees()}
      {activeMenu === 'projects' && renderProjects()}
      {activeMenu === 'inventory' && renderInventory()}
      {activeMenu === 'tasks' && renderTasks()}
      {activeMenu === 'settings' && renderSettings()}
    </div>
  );
}
