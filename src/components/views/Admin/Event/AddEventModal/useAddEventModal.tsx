import { DELAY } from "@/constants/list.constants";
import { ToasterContext } from "@/contexts/ToasterContexts";
import useDebounce from "@/hooks/useDebounce";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLocalTimeZone, now } from "@internationalized/date";
import { DateValue } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Please input name"),
    slug: yup.string().required("Please input slug"),
    category: yup.string().required("Please select category"),
    startDate: yup.mixed<DateValue>().required("Please select start date"),
    endDate: yup.mixed<DateValue>().required("Please select end date"),
    isPublish: yup.string().required("Please select status"),
    isFeatured: yup.string().required("Please select featured"),
    description: yup.string().required("Please input description"),
    isOnline: yup.string().required("Please select online or offline"),
    region: yup.string().required("Please select region"),
    latitude: yup.string().required("Please input latitude"),
    longitude: yup.string().required("Please input longitude"),
    banner: yup.mixed<FileList | string>().required("Please upload banner"),
});

const useAddEventModal = () => {
    const { setToaster } = useContext(ToasterContext);
    const debounce = useDebounce();

    const { 
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,
        handleDeleteFile,
        handleUploadFile,
    } = useMediaHandling();

    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: {errors},
        reset,
        watch,
        getValues,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const preview = watch("banner");
    const fileUrl = getValues("banner");

    setValue("startDate", now(getLocalTimeZone()));
    setValue("endDate", now(getLocalTimeZone()));

    const handleUploadBanner = (
        files: FileList, 
        onChange: (files: FileList | undefined) => void
    ) => {
        handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
            if(fileUrl) {
                setValue("banner", fileUrl)
            }
        });
    };

    const handleDeleteBanner = (onChange: (files: FileList | undefined) => void) => {
        handleDeleteFile(fileUrl, () => onChange(undefined))
    };

    const handleOnClose = (onClose: () => void) => {
        handleDeleteFile(fileUrl, () => {
            reset();
            onClose();
        })
    };

    const { data: dataCategory, } = useQuery({
        queryKey: ["Categories"],
        queryFn: () => categoryServices.getCategories(),
        enabled: true
    });

    const [searchRegency, setSearchRegency] = useState("")

    const { data: dataRegion } = useQuery({
        queryKey: ["region", searchRegency],
        queryFn: () => eventServices.searchLocationByRegency(`${searchRegency}`),
        enabled: searchRegency !== "",
    })

    const handleSearchRegion = (region: string) => {
        debounce(() => setSearchRegency(region), DELAY)
    }


    const addEvent = async (payload: IEvent) => {
        const res = await eventServices.addEvent(payload)
        return res;
    };

    const {
        mutate: mutateAddEvent, 
        isPending: isPendingMutateAddEvent, 
        isSuccess: isSuccessMutateAddEvent
    } = useMutation({
        mutationFn: addEvent,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            })
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Success add event",
            })
            reset();
        },
    });

    const handleAddEvent = (data: IEventForm) => {
        const payload = {
            ...data,
            isFeatured: Boolean(data.isFeatured),
            isPublish: Boolean(data.isPublish),
            startDate: data.startDate ? toDateStandard(data.startDate) : "",
            endDate: data.endDate ? toDateStandard(data.endDate) : "",
            location: {
                region: `${data.region}`,
                coordinates: [Number(data.latitude), Number(data.longitude)],
            },
            banner: data.banner,
        };
        mutateAddEvent(payload)
    };

    return {
        control,
        errors,
        reset,
        handleSubmitForm,
        handleAddEvent,
        isPendingMutateAddEvent,
        isSuccessMutateAddEvent,

        preview,
        handleUploadBanner,
        handleDeleteBanner,
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,
        handleOnClose,

        dataCategory,
        dataRegion,
        searchRegency,
        handleSearchRegion,
    }
}

export default useAddEventModal;