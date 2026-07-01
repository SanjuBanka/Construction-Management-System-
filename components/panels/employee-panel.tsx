'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle2, AlertCircle, Clock, User, Plus, Edit2, Trash2 } from 'lucide-react';
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

interface EmployeePanelProps {
  activeMenu: string;
}

type Task = {
  id: number;
  title: string;
  project: string;
  status: string;
  deadline: string;
};

type TaskForm = Omit<Task, 'id'>;

const initialTasks: Task[] = [
  { id: 1, title: 'Foundation Work', project: 'Downtown Plaza', status: 'Completed', deadline: '2024-02-15' },
  { id: 2, title: 'Wall Installation', project: 'Downtown Plaza', status: 'In Progress', deadline: '2024-03-01' },
  { id: 3, title: 'Structural Inspection', project: 'Metro Station', status: 'Pending', deadline: '2024-03-10' },
  { id: 4, title: 'Material Order', project: 'Residential Complex', status: 'In Progress', deadline: '2024-03-05' },
];

const projectData = [
  { month: 'Jan', tasks: 5, completed: 3, inProgress: 2 },
  { month: 'Feb', tasks: 8, completed: 5, inProgress: 3 },
  { month: 'Mar', tasks: 10, completed: 7, inProgress: 3 },
  { month: 'Apr', tasks: 12, completed: 9, inProgress: 3 },
];

const projects = [
  {
    id: 1,
    name: 'Downtown Plaza',
    role: 'Lead Supervisor',
    progress: 65,
    status: 'In Progress',
    team: 12,
  },
  {
    id: 2,
    name: 'Metro Station',
    role: 'Site Engineer',
    progress: 45,
    status: 'In Progress',
    team: 18,
  },
  {
    id: 3,
    name: 'Residential Complex',
    role: 'Project Coordinator',
    progress: 20,
    status: 'In Progress',
    team: 8,
  },
];

const userProfile = {
  name: 'John Doe',
  email: 'john@construct.com',
  role: 'Site Manager',
  department: 'Site Operations',
  joinDate: '2019-06-15',
  skill: 'Project Management',
  experience: 5,
  contact: '+1 (555) 123-4567',
};

export default function EmployeePanel({ activeMenu }: EmployeePanelProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'Pending':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [taskForm, setTaskForm] = useState<TaskForm>({
    title: '',
    project: '',
    status: 'Pending',
    deadline: '',
  });

  const resetTaskForm = () => {
    setCurrentTask(null);
    setTaskForm({ title: '', project: '', status: 'Pending', deadline: '' });
  };

  const handleTaskDialogOpen = (task?: Task) => {
    if (task) {
      setCurrentTask(task);
      setTaskForm({ title: task.title, project: task.project, status: task.status, deadline: task.deadline });
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
              <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Completed Tasks</p>
              <p className="text-3xl font-bold text-primary mt-2">24</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">In Progress</p>
              <p className="text-3xl font-bold text-primary mt-2">8</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Pending Tasks</p>
              <p className="text-3xl font-bold text-primary mt-2">3</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Assigned Projects</p>
              <p className="text-3xl font-bold text-accent mt-2">3</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Task Performance</CardTitle>
          <CardDescription>Monthly task completion tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={projectData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="var(--color-primary)" strokeWidth={2} />
              <Line type="monotone" dataKey="inProgress" stroke="var(--color-accent)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">My Tasks</h3>
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
              <DialogDescription>Update task details or add a new task.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleTaskSubmit} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} required />
              </div>
              <div>
                <Label>Project</Label>
                <Input value={taskForm.project} onChange={(e) => setTaskForm({ ...taskForm, project: e.target.value })} required />
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
          <CardTitle>Task List</CardTitle>
          <CardDescription>All tasks assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead>Title</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} className="border-border">
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>{task.project}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <Badge variant="outline" className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>
                    </TableCell>
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

  const renderProjects = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">My Projects</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription className="mt-1">{project.role}</CardDescription>
                </div>
                <Badge variant="secondary">{project.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="text-sm font-medium">{project.progress}%</p>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Team Members</span>
                <span className="font-medium">{project.team} people</span>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">My Profile</h3>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-border">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-lg">{userProfile.name}</p>
              <p className="text-muted-foreground">{userProfile.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email Address</p>
              <p className="font-medium">{userProfile.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
              <p className="font-medium">{userProfile.contact}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Department</p>
              <p className="font-medium">{userProfile.department}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Join Date</p>
              <p className="font-medium">{userProfile.joinDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Primary Skill</p>
              <p className="font-medium">{userProfile.skill}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Years of Experience</p>
              <p className="font-medium">{userProfile.experience} years</p>
            </div>
          </div>

          <Button variant="outline" className="border-border bg-transparent">
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div>
      {activeMenu === 'dashboard' && renderDashboard()}
      {activeMenu === 'tasks' && renderTasks()}
      {activeMenu === 'projects' && renderProjects()}
      {activeMenu === 'profile' && renderProfile()}
      {activeMenu === 'inventory' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Inventory Visibility</h3>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <p className="text-muted-foreground">You have view-only access to inventory items related to your projects.</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
