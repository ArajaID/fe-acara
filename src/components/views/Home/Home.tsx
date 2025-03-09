import { Skeleton } from "@nextui-org/react";
import HomeList from "./HomeList";
import HomeSlider from "./HomeSlider"
import useHome from "./useHome";
import Image from "next/image";

const Home = () => {
    const { 
        dataBanners, 
        isLoadingBanners,
        dataFeaturedEvents,
        isLoadingFeaturedEvents,
        dataLatestEvents,
        isLoadingLatestEvents,
    } = useHome();

    console.log(dataFeaturedEvents?.data)

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

            <Skeleton 
                isLoaded={!isLoadingBanners} 
                className="mx-6 mb-6 h-[25vw] rounded-2xl lg:mx-0 lg:mb-16">
                <Image 
                    src={dataBanners && dataBanners?.data[0].image} 
                    alt="banner" 
                    width={1920}
                    height={400}
                    className="h-[20vw] w-full rounded-2xl object-cover object-center"
                />
            </Skeleton>

            <HomeList 
                title="Latest Event" 
                events={dataLatestEvents?.data} 
                isLoading={isLoadingLatestEvents}
            />
        </div>
    )
}

export default Home;