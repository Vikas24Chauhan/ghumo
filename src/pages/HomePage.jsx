import Header from "../components/header/Header";
import TopDestinations from "../components/topDestinations/TopDestinations";
import TopCategories from "../components/topCategories/TopCategories";

export default function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <TopDestinations />
      <TopCategories />
    </div>
  );
}
