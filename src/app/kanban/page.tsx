'use client';

import DashboardLayout from '@/components/dashboard-layout';
import KanbanBoard from '@/components/kanban-board';

export default function KanbanPage() {
  return (
    <DashboardLayout currentPage="kanban">
      <KanbanBoard />
    </DashboardLayout>
  );
}