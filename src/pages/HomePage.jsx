import Header from "../components/header/Header";
import TopDestinations from "../components/topDestinations/TopDestinations";
import TopCategories from "../components/topCategories/TopCategories";
import CoreFeatures from "../components/coreFeatures/CoreFeatures";
import Testimonials from "../components/testimonials/Testimonials";
import ScrollRevealSections from "../components/scrollRevealSections/ScrollRevealSections";
import { Team } from "../components/team/Team";
import Adventures from "../components/adventures/Adventures";

export default function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <CoreFeatures />
      <TopDestinations />
      <TopCategories />
      <Team />
      <Adventures />
      <Testimonials />
      <ScrollRevealSections />
    </div>
  );
}
