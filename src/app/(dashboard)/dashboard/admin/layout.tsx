import { requireUser } from '@/lib/auth-session';
import type { ChildrenProps } from '@/types/types';

export default async function AdminLayout({ children }: ChildrenProps) {
    await requireUser('admin');
    return children;
}
