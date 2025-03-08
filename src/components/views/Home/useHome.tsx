import bannerServices from "@/services/banner.service";
import { useQuery } from "@tanstack/react-query";
import { LIMIT_BANNER, LIMIT_EVENT, PAGE_DEFAULT } from "@/constants/list.constants";
import eventServices from "@/services/event.service";

const useHome = () => {
    const getBanners = async () => {
        let params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;
   
        const res = await bannerServices.getBanners(params);
        const {data} = res;
        return data;
    };

    const {
        data: dataBanners,
        isLoading: isLoadingBanners,
    } = useQuery({
        queryKey: ["Banners"],
        queryFn: getBanners,
        enabled: true
    });

    const getEvents = async (params: string) => {   
        const res = await eventServices.getEvents(params);
        const {data} = res;
        return data;
    };

    const currentEventQuery = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true`

    const {
        data: dataFeaturedEvents,
        isLoading: isLoadingFeaturedEvents,
    } = useQuery({
        queryKey: ["FeaturedEvents"],
        queryFn: () => getEvents(
            `${currentEventQuery}&isFeatured=true`
        ),
        enabled: true
    });

    const {
        data: dataLatestEvents,
        isLoading: isLoadingLatestEvents,
    } = useQuery({
        queryKey: ["LatestEvents"],
        queryFn: () => getEvents(currentEventQuery),
        enabled: true
    });

    return {
        dataBanners, 
        isLoadingBanners,
        dataFeaturedEvents,
        isLoadingFeaturedEvents,
        dataLatestEvents,
        isLoadingLatestEvents,
    }
}

export default useHome;