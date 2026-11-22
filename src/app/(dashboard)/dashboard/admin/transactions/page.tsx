import { getApiToken, requireUser } from '@/lib/auth-session';
import { getAdminTransactionsProps } from '@/lib/api/admin';
import AdminPage from '@/app/(dashboard)/_components/admin/AdminPage';
import AdminTransactions from '@/app/(dashboard)/_components/admin/AdminTransactions';

export default async function Transactions() {
    await requireUser('admin');
    const transactions = await getAdminTransactionsProps(await getApiToken());
    return (
        <AdminPage
            title="Transactions"
            description="Verified payment history. Payment status cannot be changed manually."
        >
            <AdminTransactions transactions={transactions} />
        </AdminPage>
    );
}
