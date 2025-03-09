import HomeList from "./HomeList";
import HomeSlider from "./HomeSlider"
import useHome from "./useHome";

const Home = () => {
    const { 
        dataBanners, 
        isLoadingBanners,
        dataFeaturedEvents,
        isLoadingFeaturedEvents,
    } = useHome();

    return (
        <div>
            <HomeSlider 
                banners={dataBanners?.data} 
                isLoadingBanners={isLoadingBanners} 
            />

            <HomeList 
                title="Featured Event" 
                events={dataFeaturedEvents?.data} 
                isLoading={isLoadingFeaturedEvents}
            />
        </div>
    )
}

export default Home;