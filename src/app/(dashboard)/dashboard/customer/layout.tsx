import { requireUser } from '@/lib/auth-session';
import type { ChildrenProps } from '@/types/types';

export default async function CustomerLayout({ children }: ChildrenProps) {
    await requireUser('user');
    return children;
}
