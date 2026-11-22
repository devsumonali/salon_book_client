const colors: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-800',
    confirmed: 'bg-green-50 text-green-800',
    paid: 'bg-green-50 text-green-800',
    active: 'bg-green-50 text-green-800',
    cancelled: 'bg-red-50 text-red-800',
    blocked: 'bg-red-50 text-red-800',
    failed: 'bg-red-50 text-red-800',
};

export function AdminBadge({ value }: { value: string }) {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1.5 text-sm font-medium capitalize ${colors[value] || 'bg-surface text-muted'}`}
        >
            {value}
        </span>
    );
}

export function money(amount: number, currency = 'usd') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export function eventDate(value?: string) {
    return value
        ? new Date(value).toLocaleString('en-US', {
              timeZone: 'Asia/Dhaka',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
          })
        : 'Unavailable';
}

export const tableClass =
    'w-full min-w-225 text-left text-sm [&_th]:px-4 [&_th]:py-4 [&_th]:font-medium [&_td]:px-4 [&_td]:py-4';
export const buttonClass =
    'inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg border border-line px-3 text-sm font-semibold text-brand hover:bg-brand-soft/50 disabled:cursor-wait disabled:opacity-50';
