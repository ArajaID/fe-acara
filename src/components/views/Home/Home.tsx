import { Skeleton } from "@heroui/react";
import HomeSlider from "./HomeSlider"
import useHome from "./useHome";
import Image from "next/image";
import HomeEventList from "./HomeEventList";
import HomeCategoryList from "./HomeCategoryList";

const Home = () => {
    const { 
        dataBanners, 
        isLoadingBanners,
        dataFeaturedEvents,
        isLoadingFeaturedEvents,
        dataLatestEvents,
        isLoadingLatestEvents,
        dataCategories, 
        isLoadingCategories, 
    } = useHome();

    return (
        <div>
            <HomeSlider 
                banners={dataBanners?.data} 
                isLoadingBanners={isLoadingBanners} 
            />

            <HomeEventList 
                title="Featured Event" 
                events={dataFeaturedEvents?.data} 
                isLoading={isLoadingFeaturedEvents}
                urlMore="/event?isFeatured=true"
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

            <HomeEventList 
                title="Latest Event" 
                events={dataLatestEvents?.data} 
                isLoading={isLoadingLatestEvents}
                urlMore="/event"
            />

            <HomeCategoryList 
                categories={dataCategories?.data} 
                isLoading={isLoadingCategories}
            />
        </div>
    )
}

export default Home;