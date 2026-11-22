import { FiScissors } from 'react-icons/fi';

export default function BrandLogo({ light = false }: { light?: boolean }) {
    return (
        <span className="inline-flex items-center gap-2.5">
            <span className="hidden size-10 shrink-0 items-center justify-center rounded-[14px] bg-brand text-white shadow-sm min-[360px]:flex">
                <FiScissors size={21} aria-hidden="true" />
            </span>
            <span
                className={`font-serif text-[27px] font-bold leading-none tracking-tight ${light ? 'text-white' : 'text-ink'}`}
            >
                Salon<span className={light ? 'text-[#edc4b1]' : 'text-brand'}>Book</span>
            </span>
        </span>
    );
}
