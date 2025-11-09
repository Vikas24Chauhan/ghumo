import Header from "../components/header/Header";
import TopDestinations from "../components/topDestinations/TopDestinations";
import TopCategories from "../components/topCategories/TopCategories";
import CoreFeatures from "../components/coreFeatures/CoreFeatures";
import Testimonials from "../components/testimonials/Testimonials";
import ScrollRevealSections from "../components/scrollRevealSections/ScrollRevealSections";

export default function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <CoreFeatures />
      <TopDestinations />
      <TopCategories />
      <Testimonials />
      <ScrollRevealSections />
    </div>
  );
}
