import HeroCarousel from "./HeroCarousel";
import NowPlayingList from "./NowPlayingList";
import PopularList from "./PopularList.";

const Home = () => {
  return (
    <div className="">
      <HeroCarousel />
      <PopularList />;
      <NowPlayingList />
    </div>
  );
};

export default Home;
