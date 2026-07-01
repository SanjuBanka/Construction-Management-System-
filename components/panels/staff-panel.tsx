'use client';

import React from "react"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, MessageSquare, Send } from 'lucide-react';

interface StaffPanelProps {
  activeMenu: string;
}

const projects = [
  {
    id: 1,
    name: 'Downtown Plaza',
    status: 'In Progress',
    progress: 65,
    startDate: '2024-01-15',
    estimatedEnd: '2024-12-31',
  },
  {
    id: 2,
    name: 'Metro Station',
    status: 'In Progress',
    progress: 45,
    startDate: '2024-03-01',
    estimatedEnd: '2025-03-01',
  },
  {
    id: 3,
    name: 'Residential Complex',
    status: 'Planning',
    progress: 20,
    startDate: '2024-06-01',
    estimatedEnd: '2025-06-01',
  },
];

const feedback = [
  {
    id: 1,
    project: 'Downtown Plaza',
    author: 'Sarah Johnson',
    date: '2024-02-28',
    feedback: 'Great progress on the foundation work. The team is working efficiently.',
    category: 'Positive',
  },
  {
    id: 2,
    project: 'Metro Station',
    author: 'Mike Chen',
    date: '2024-02-27',
    feedback: 'Need to check the structural integrity of the north wall section.',
    category: 'Issue',
  },
  {
    id: 3,
    project: 'Downtown Plaza',
    author: 'Lisa Anderson',
    date: '2024-02-26',
    feedback: 'Material delivery was delayed but we managed to adapt the schedule.',
    category: 'Update',
  },
];

export default function StaffPanel({ activeMenu }: StaffPanelProps) {
  const [feedbackForm, setFeedbackForm] = useState({
    project: '',
    feedback: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFeedbackForm({ project: '', feedback: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Positive':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Issue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Update':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Projects Visible</p>
              <p className="text-3xl font-bold text-primary mt-2">3</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Feedback Submitted</p>
              <p className="text-3xl font-bold text-accent mt-2">7</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Account Status</p>
              <Badge className="mt-3 bg-green-600 hover:bg-green-700">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
          <CardDescription>Your access and responsibilities as a Staff member</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">What You Can Access:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <Eye className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">View Projects</p>
                    <p className="text-sm text-muted-foreground">See details of active projects</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Submit Feedback</p>
                    <p className="text-sm text-muted-foreground">Provide observations and feedback</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Limitations:</h4>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">• Cannot modify project details</li>
                <li className="text-sm text-muted-foreground">• Cannot manage employees or inventory</li>
                <li className="text-sm text-muted-foreground">• Cannot access financial information</li>
                <li className="text-sm text-muted-foreground">• View-only access to all data</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">View Projects</h3>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
          <CardDescription>All projects you have access to view</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="border border-border rounded-lg p-4 bg-background">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-foreground">{project.name}</h4>
                <Badge variant={project.status === 'In Progress' ? 'default' : 'secondary'}>
                  {project.status}
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1.5">
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="text-sm font-medium">{project.progress}%</p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                  <div>
                    <p className="text-muted-foreground">Start Date</p>
                    <p className="font-medium text-foreground">{project.startDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Estimated Completion</p>
                    <p className="font-medium text-foreground">{project.estimatedEnd}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Feedback & Observations</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit Feedback Form */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Submit Feedback</CardTitle>
            <CardDescription>Share your observations and feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <Label htmlFor="project">Select Project</Label>
                <select
                  id="project"
                  value={feedbackForm.project}
                  onChange={(e) =>
                    setFeedbackForm({ ...feedbackForm, project: e.target.value })
                  }
                  className="w-full mt-2 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  required
                >
                  <option value="">Choose a project...</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="feedback">Your Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Share your observations, suggestions, or concerns..."
                  value={feedbackForm.feedback}
                  onChange={(e) =>
                    setFeedbackForm({ ...feedbackForm, feedback: e.target.value })
                  }
                  className="mt-2 border-border bg-background text-foreground"
                  rows={4}
                  required
                />
              </div>

              {submitted && (
                <div className="p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-md text-sm">
                  ✓ Feedback submitted successfully!
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 gap-2"
                disabled={submitted}
              >
                <Send className="h-4 w-4" />
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Feedback History */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Your Feedback History</CardTitle>
            <CardDescription>Recent feedback you have submitted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {feedback.map((item) => (
                <div key={item.id} className="p-3 border border-border rounded-lg bg-background">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-sm text-foreground">{item.project}</p>
                    <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.feedback}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.author} • {item.date}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div>
      {activeMenu === 'dashboard' && renderDashboard()}
      {activeMenu === 'projects' && renderProjects()}
      {activeMenu === 'feedback' && renderFeedback()}
    </div>
  );
}
