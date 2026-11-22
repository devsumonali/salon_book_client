'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type { AdminUser } from '@/types/admin';
import { updateAdminUser } from '@/lib/actions/admin';
import ServiceDialog from '../ServiceDialog';
import { AdminBadge, buttonClass, eventDate, tableClass } from './AdminUi';

export default function AdminUsers({ users }: { users: AdminUser[] }) {
    const [selected, setSelected] = useState<AdminUser | null>(null);
    const [confirm, setConfirm] = useState(false);
    const [busy, setBusy] = useState(false);
    const dialog = useRef<HTMLDialogElement>(null);
    const router = useRouter();

    function open(user: AdminUser, change: boolean) {
        setSelected(user);
        setConfirm(change);
        dialog.current?.showModal();
    }

    async function handleUpdate() {
        if (!selected || busy) return;
        setBusy(true);
        try {
            const result = await updateAdminUser(selected._id, !selected.isBlocked);
            if (result.error) {
                toast.error(result.error);
                return;
            }
            toast.success(result.message || 'Customer updated');
            dialog.current?.close();
            router.refresh();
        } catch {
            toast.error('Unable to update customer');
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <div className="overflow-x-auto rounded-2xl border border-line bg-panel">
                <table className={tableClass}>
                    <thead className="bg-surface text-muted">
                        <tr>
                            <th scope="col">Customer</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Joined</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="font-semibold">{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone || 'Not provided'}</td>
                                <td>{eventDate(user.createdAt)}</td>
                                <td>
                                    <AdminBadge value={user.isBlocked ? 'blocked' : 'active'} />
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <button
                                            className={buttonClass}
                                            onClick={() => open(user, false)}
                                        >
                                            Details
                                        </button>
                                        <button
                                            className={buttonClass}
                                            onClick={() => open(user, true)}
                                        >
                                            {user.isBlocked ? 'Unblock' : 'Block'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!users.length && (
                    <p className="p-10 text-center text-muted">No registered customers yet.</p>
                )}
            </div>
            <ServiceDialog
                dialogRef={dialog}
                id="admin-customer"
                title={
                    confirm
                        ? selected?.isBlocked
                            ? 'Unblock customer'
                            : 'Block customer'
                        : 'Customer details'
                }
                compact
                busy={busy}
            >
                {selected && (
                    <div className="space-y-5">
                        <h3 className="text-2xl">{selected.name}</h3>
                        <dl className="space-y-3 text-sm">
                            <div>
                                <dt className="text-muted">Email</dt>
                                <dd className="mt-1 font-semibold break-all">{selected.email}</dd>
                            </div>
                            <div>
                                <dt className="text-muted">Phone</dt>
                                <dd className="mt-1 font-semibold">
                                    {selected.phone || 'Not provided'}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-muted">Joined</dt>
                                <dd className="mt-1">{eventDate(selected.createdAt)}</dd>
                            </div>
                        </dl>
                        <AdminBadge value={selected.isBlocked ? 'blocked' : 'active'} />
                        {confirm && (
                            <p className="rounded-xl bg-surface p-4 text-base leading-7">
                                {selected.isBlocked
                                    ? 'Allow this customer to sign in and use the platform again?'
                                    : 'Block this customer? They will be signed out and cannot use protected features.'}
                            </p>
                        )}
                        <div className="flex justify-end gap-3 border-t border-line pt-5">
                            <button
                                disabled={busy}
                                className={buttonClass}
                                onClick={() => dialog.current?.close()}
                            >
                                Close
                            </button>
                            {confirm && (
                                <button
                                    disabled={busy}
                                    onClick={handleUpdate}
                                    className="min-h-11 cursor-pointer rounded-lg bg-brand px-5 text-sm font-semibold text-white disabled:opacity-50"
                                >
                                    {busy
                                        ? 'Saving…'
                                        : selected.isBlocked
                                          ? 'Unblock Customer'
                                          : 'Block Customer'}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </ServiceDialog>
        </>
    );
}
