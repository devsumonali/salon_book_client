import type { AdminTransaction } from '@/types/admin';
import { AdminBadge, eventDate, money, tableClass } from './AdminUi';
import { formatAppointmentDate } from '../customer-appointment-display';

export default function AdminTransactions({ transactions }: { transactions: AdminTransaction[] }) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-line bg-panel shadow-card">
            <table className={tableClass}>
                <caption className="sr-only">
                    Read-only payment records verified by Stripe webhooks
                </caption>
                <thead className="bg-surface text-muted">
                    <tr>
                        <th scope="col">Customer</th>
                        <th scope="col">Service / appointment</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Stripe reference</th>
                        <th scope="col">Status</th>
                        <th scope="col">Transaction date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-line">
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td>
                                <p className="font-semibold">{transaction.customerName}</p>
                                <p className="mt-1 text-xs text-muted">
                                    {transaction.customerEmail}
                                </p>
                            </td>
                            <td>
                                <p className="font-semibold">
                                    {transaction.appointment?.service.name ||
                                        transaction.serviceName}
                                </p>
                                <p className="mt-1 text-xs text-muted">
                                    {formatAppointmentDate(transaction.appointmentDate)}{' '}
                                    {transaction.appointment?.time}
                                </p>
                            </td>
                            <td className="font-semibold">
                                {money(transaction.amount, transaction.currency)}
                                <p className="mt-1 text-xs font-normal uppercase text-muted">
                                    {transaction.currency}
                                </p>
                            </td>
                            <td>
                                <p
                                    title={transaction.stripeSessionId}
                                    className="max-w-44 truncate font-mono text-xs"
                                >
                                    {transaction.stripeSessionId}
                                </p>
                                <p
                                    title={transaction.paymentReference}
                                    className="mt-1 max-w-44 truncate text-xs text-muted"
                                >
                                    {transaction.paymentReference}
                                </p>
                            </td>
                            <td>
                                <AdminBadge value={transaction.status} />
                            </td>
                            <td>{eventDate(transaction.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!transactions.length && (
                <p className="p-10 text-center text-base text-muted">
                    No verified payment transactions yet.
                </p>
            )}
        </div>
    );
}
