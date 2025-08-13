"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  MessageCircle,
  Paperclip,
  User
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in_progress' | 'review' | 'completed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignee?: {
    name: string
    avatar?: string
    initials: string
  }
  dueDate?: string
  comments: number
  attachments: number
}

interface Column {
  id: string
  title: string
  status: Task['status']
  taskIds: string[]
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Update user dashboard',
    description: 'Redesign the main dashboard with new metrics and improved layout',
    status: 'todo',
    priority: 'high',
    assignee: { name: 'John Doe', initials: 'JD' },
    dueDate: '2024-01-15',
    comments: 3,
    attachments: 2
  },
  {
    id: '2',
    title: 'Fix login authentication',
    description: 'Resolve the authentication issue preventing users from logging in',
    status: 'in_progress',
    priority: 'urgent',
    assignee: { name: 'Jane Smith', initials: 'JS' },
    dueDate: '2024-01-12',
    comments: 5,
    attachments: 1
  },
  {
    id: '3',
    title: 'Design new landing page',
    description: 'Create a modern, responsive landing page for the new product launch',
    status: 'review',
    priority: 'medium',
    assignee: { name: 'Mike Johnson', initials: 'MJ' },
    dueDate: '2024-01-18',
    comments: 2,
    attachments: 4
  },
  {
    id: '4',
    title: 'Implement API endpoints',
    description: 'Develop RESTful API endpoints for the new features',
    status: 'completed',
    priority: 'low',
    assignee: { name: 'Sarah Wilson', initials: 'SW' },
    dueDate: '2024-01-10',
    comments: 1,
    attachments: 0
  },
  {
    id: '5',
    title: 'Database optimization',
    description: 'Optimize database queries for better performance',
    status: 'todo',
    priority: 'medium',
    assignee: { name: 'Tom Brown', initials: 'TB' },
    dueDate: '2024-01-20',
    comments: 0,
    attachments: 1
  },
  {
    id: '6',
    title: 'Mobile app testing',
    description: 'Conduct comprehensive testing on iOS and Android devices',
    status: 'in_progress',
    priority: 'high',
    assignee: { name: 'Lisa Chen', initials: 'LC' },
    dueDate: '2024-01-14',
    comments: 4,
    attachments: 3
  }
]

const initialColumns: Column[] = [
  { id: 'todo', title: 'To Do', status: 'todo', taskIds: ['1', '5'] },
  { id: 'in_progress', title: 'In Progress', status: 'in_progress', taskIds: ['2', '6'] },
  { id: 'review', title: 'Review', status: 'review', taskIds: ['3'] },
  { id: 'completed', title: 'Completed', status: 'completed', taskIds: ['4'] }
]

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
}

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [draggedTask, setDraggedTask] = useState<string | null>(null)

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId)
  }

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault()
    
    if (!draggedTask) return

    const targetColumn = columns.find(col => col.id === targetColumnId)
    const sourceColumn = columns.find(col => col.taskIds.includes(draggedTask))

    if (!targetColumn || !sourceColumn || sourceColumn.id === targetColumnId) return

    // Update columns
    setColumns(prev => prev.map(col => {
      if (col.id === sourceColumn.id) {
        return { ...col, taskIds: col.taskIds.filter(id => id !== draggedTask) }
      }
      if (col.id === targetColumnId) {
        return { ...col, taskIds: [...col.taskIds, draggedTask] }
      }
      return col
    }))

    // Update task status
    setTasks(prev => prev.map(task => {
      if (task.id === draggedTask) {
        return { ...task, status: targetColumn.status }
      }
      return task
    }))

    setDraggedTask(null)
  }

  const getTasksForColumn = (columnId: string) => {
    const column = columns.find(col => col.id === columnId)
    if (!column) return []
    return column.taskIds.map(taskId => tasks.find(task => task.id === taskId)).filter(Boolean) as Task[]
  }

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
          <p className="text-gray-600">Manage your tasks visually with drag-and-drop</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex-shrink-0 w-80"
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{column.title}</h3>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                {getTasksForColumn(column.id).length}
              </span>
            </div>

            <div className="space-y-3">
              {getTasksForColumn(column.id).map((task) => (
                <Card
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                  className="cursor-move hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium text-gray-900 leading-tight">
                        {task.title}
                      </CardTitle>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {task.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-3">
                      <Badge 
                        className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          priorityColors[task.priority]
                        )}
                      >
                        {task.priority}
                      </Badge>
                      
                      {task.dueDate && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(task.dueDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {task.assignee && (
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assignee.avatar} />
                            <AvatarFallback className="text-xs">
                              {task.assignee.initials}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          {task.comments > 0 && (
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {task.comments}
                            </div>
                          )}
                          {task.attachments > 0 && (
                            <div className="flex items-center gap-1">
                              <Paperclip className="h-3 w-3" />
                              {task.attachments}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button 
              variant="outline" 
              className="w-full mt-3 border-dashed"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}