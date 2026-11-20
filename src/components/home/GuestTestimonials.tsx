import { LuStar } from 'react-icons/lu';

const testimonials = [
    {
        quote: 'The Balayage & Couture Glaze was pure magic. Beautifully blended color, thoughtful care, and a finish that felt completely my own.',
        name: 'Camille Laurent',
        detail: 'Beverly Hills Guest',
        initials: 'CL',
        avatarClass: 'bg-[#e8d9cc] text-[#78513c]',
    },
    {
        quote: 'The Hydra-Dew Botanical Facial was pure bliss. I left feeling refreshed, and finding the right treatment was wonderfully simple.',
        name: 'Vivian S. Thorne',
        detail: 'Atelier Member',
        initials: 'VT',
        avatarClass: 'bg-[#e5dce9] text-[#70567d]',
    },
    {
        quote: 'A beautiful salon experience from start to finish. Clear service details, lovely attention to the little things, and a truly welcoming team.',
        name: 'Julian Vance',
        detail: 'Creative Director',
        initials: 'JV',
        avatarClass: 'bg-[#dfe5da] text-[#58684f]',
    },
];

export default function GuestTestimonials() {
    return (
        <section aria-labelledby="guest-testimonials-title" className="bg-[#fbf9f6]">
            <div className="mx-auto max-w-7xl px-5 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
                <div className="rounded-3xl border border-line/60 bg-panel p-5 shadow-xs sm:p-8 lg:p-10">
                    <header className="flex items-end justify-between gap-5">
                        <div>
                            <p className="text-[10px] font-semibold tracking-[0.14em] text-brand">
                                ATELIER STORIES
                            </p>
                            <h2
                                id="guest-testimonials-title"
                                className="mt-3 text-3xl leading-tight tracking-tight text-ink sm:text-4xl"
                            >
                                What Our Guests Say
                            </h2>
                        </div>
                    </header>

                    <div className="mt-7 grid gap-4 md:grid-cols-3 sm:mt-8 sm:gap-5">
                        {testimonials.map(({ quote, name, detail, initials, avatarClass }) => (
                            <figure
                                key={name}
                                className="flex min-w-0 flex-col rounded-2xl bg-surface p-5 sm:p-6"
                            >
                                <div
                                    role="img"
                                    aria-label="5 out of 5 stars"
                                    className="flex gap-1 text-brand"
                                >
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <LuStar
                                            key={index}
                                            aria-hidden="true"
                                            size={13}
                                            fill="currentColor"
                                        />
                                    ))}
                                </div>
                                <blockquote className="mt-5 flex-1 text-xs leading-6 text-ink italic">
                                    &ldquo;{quote}&rdquo;
                                </blockquote>
                                <figcaption className="mt-6 flex items-center gap-3">
                                    <span
                                        aria-hidden="true"
                                        className={`flex size-9 shrink-0 items-center justify-center rounded-full border border-panel text-[10px] font-semibold ${avatarClass}`}
                                    >
                                        {initials}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-[11px] font-semibold leading-5 text-ink">
                                            {name}
                                        </p>
                                        <p className="text-[10px] leading-4 text-subtle">
                                            {detail}
                                        </p>
                                    </div>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
