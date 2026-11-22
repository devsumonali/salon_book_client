import type { ChildrenProps } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { FiCheck, FiShield } from 'react-icons/fi';
import BrandLogo from '@/components/shared/BrandLogo';

export default function AuthLayout({ children }: ChildrenProps) {
    return (
        <section className="bg-surface px-5 py-8 sm:px-6 sm:py-12 lg:py-14">
            <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[1.75rem] border border-line bg-panel p-2.5 shadow-card lg:grid-cols-[0.95fr_1.05fr]">
                <aside className="relative isolate hidden min-h-175 flex-col justify-between overflow-hidden rounded-[1.125rem] p-9 text-white lg:flex xl:p-11">
                    <Image
                        src="/images/salon-hero.jpg"
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 520px, 100vw"
                        className="-z-20 object-cover object-[57%_center]"
                    />
                    <div className="absolute inset-0 -z-10 bg-linear-to-b from-[#1d2c25]/55 via-[#1d2c25]/25 to-[#15261e]/95" />
                    <Link href="/">
                        <BrandLogo light />
                    </Link>
                    <div>
                        <p className="text-sm font-semibold tracking-widest text-[#e4c8b8]">
                            YOUR EVERYDAY ESCAPE
                        </p>
                        <h2 className="mt-4 text-5xl leading-[1.1] tracking-tight">
                            Good hair days.
                            <br />
                            Even better moments.
                        </h2>
                        <p className="mt-5 text-base leading-8 text-white/80">
                            Your favorite services, your next appointment, and a little more time
                            for yourself. All in one place.
                        </p>
                        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/20 pt-6 text-sm text-white/85">
                            <span className="flex items-center gap-2">
                                <FiCheck size={16} aria-hidden="true" />
                                Easy booking
                            </span>
                            <span className="flex items-center gap-2">
                                <FiShield size={16} aria-hidden="true" />
                                Secure payments
                            </span>
                        </div>
                    </div>
                </aside>
                <div className="flex min-w-0 flex-col justify-center px-4 py-7 sm:px-10 sm:py-10 lg:px-11 xl:px-16">
                    {children}
                    <p className="mt-8 border-t border-line pt-5 text-center text-xs leading-6 text-muted">
                        SalonBook &middot; A little care, made personal.
                    </p>
                </div>
            </div>
        </section>
    );
}
