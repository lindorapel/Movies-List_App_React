import HeroCarousel from "./HeroCarousel";
import NowPlayingList from "./NowPlayingList";
import PopularList from "./PopularList.";
import TopRatedList from "./TopRatedList";
import UpComingList from "./UpComingList";

const Home = () => {
  return (
    <div className="">
      <HeroCarousel />
      <PopularList />;
      <TopRatedList />
      <NowPlayingList />
      <UpComingList />
    </div>
  );
};

export default Home;
