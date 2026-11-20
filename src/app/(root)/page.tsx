import BookingOffer from '@/components/home/BookingOffer';
import FeaturedListing from '@/components/home/FeaturedListing';
import GuestTestimonials from '@/components/home/GuestTestimonials';
import Hero from '@/components/home/Hero';
import ServiceCategories from '@/components/home/ServiceCategories';
import SalonDifference from '@/components/home/SalonDifference';

export default function Home() {
    return (
        <>
            <Hero />
            <FeaturedListing />
            <ServiceCategories />
            <SalonDifference />
            <GuestTestimonials />
            <BookingOffer />
        </>
    );
}
