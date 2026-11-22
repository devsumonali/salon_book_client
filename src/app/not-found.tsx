import Link from 'next/link';

export default function NotFound() {
    return <section className="mx-auto max-w-2xl px-5 py-20 text-center"><p className="text-sm font-semibold text-brand">404</p><h1 className="mt-3 text-4xl">We couldn&apos;t find that page.</h1><p className="mt-4 text-base text-muted">The page or service may be unavailable.</p><Link href="/service" className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-brand px-5 font-semibold text-white">Browse services</Link></section>;
}
