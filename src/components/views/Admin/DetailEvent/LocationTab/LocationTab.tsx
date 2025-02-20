import { 
    Autocomplete,
    AutocompleteItem,
    Button, 
    Card, 
    CardBody, 
    CardHeader,
    Input, 
    Select, 
    SelectItem, 
    Skeleton, 
    Spinner, 
} from "@nextui-org/react"
import useLocationTab from "./useLocationTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEventForm, IRegency } from "@/types/Event";

interface PropTypes {
    dataEvent: IEventForm;
    dataDefaultRegion: string,
    isPendingDefaultRegion: boolean,
    onUpdate: (data: IEventForm) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const LocationTab = (props: PropTypes) => {
    const { 
        dataEvent, 
        onUpdate, 
        isPendingUpdate, 
        isSuccessUpdate,
        isPendingDefaultRegion,
        dataDefaultRegion,
    } = props;

    const { 
        controlUpdateLocation,
        errorsUpdateLocation,
        handleSubmitUpdateLocation,
        resetUpdateLocation,
        setValueUpdateLocation,

        handleSearchRegion,
        searchRegency,
        dataRegion,
    } = useLocationTab();

    useEffect(() => {
        if(dataEvent) {
            setValueUpdateLocation('isOnline', `${dataEvent?.isOnline}`);
            setValueUpdateLocation('latitude', `${dataEvent?.location?.coordinates[0]}`);
            setValueUpdateLocation('longitude', `${dataEvent?.location?.coordinates[1]}`);
            setValueUpdateLocation('region', `${dataEvent?.category}`);
        }
    }, [dataEvent])

    useEffect(() => {
        if(isSuccessUpdate) {
            resetUpdateLocation();
        } 
    }, [isSuccessUpdate])

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="text-xl font-bold w-full">Event Location</h1>
                <p className="text-sm text-default-400 w-full">
                    Manage location of this event
                </p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateLocation(onUpdate)}>
                <Skeleton isLoaded={!!dataEvent?.isOnline} className="rounded-lg">
                        <Controller 
                            name="isOnline"
                            control={controlUpdateLocation}
                            render={({field}) => (
                                    <Select 
                                        {...field} 
                                        label="Online / Offline" 
                                        labelPlacement="outside"
                                        variant="bordered" 
                                        isInvalid ={errorsUpdateLocation.isOnline !== undefined}
                                        errorMessage={errorsUpdateLocation.isOnline?.message}
                                        disallowEmptySelection
                                        defaultSelectedKeys={[
                                            dataEvent.isOnline ? "true" : "false"
                                        ]}
                                    >
                                        <SelectItem key="true" value="true">Online</SelectItem>
                                        <SelectItem key="false" value="false">Offline</SelectItem>
                                    </Select>
                                )} 
                        />
                    </Skeleton>
                    
                    <Skeleton isLoaded={!!dataEvent?.location?.coordinates[0]} className="rounded-lg">
                        <Controller 
                            name="latitude"
                            control={controlUpdateLocation}
                            render={({field}) => (
                                <Input 
                                    {...field}
                                    label="Latitude" 
                                    variant="bordered"
                                    labelPlacement="outside" 
                                    type="text"
                                    isInvalid ={errorsUpdateLocation.latitude !== undefined}
                                    errorMessage={errorsUpdateLocation.latitude?.message}
                                />
                            )} 
                        />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent?.location?.coordinates[1]} className="rounded-lg">
                        <Controller 
                            name="longitude"
                            control={controlUpdateLocation}
                            render={({field}) => (
                                <Input 
                                    {...field}
                                    label="Longtitude" 
                                    variant="bordered"
                                    labelPlacement="outside" 
                                    type="text"
                                    isInvalid ={errorsUpdateLocation.longitude !== undefined}
                                    errorMessage={errorsUpdateLocation.longitude?.message}
                                />
                            )} 
                        />
                    </Skeleton>
   
                    <Skeleton isLoaded={!!dataEvent?.location?.region && !isPendingDefaultRegion} className="rounded-lg">
                       {!isPendingDefaultRegion ? (
                         <Controller 
                         name="region"
                         control={controlUpdateLocation}
                         render={({field: {onChange, ...field}}) => (
                                 <Autocomplete 
                                     {...field} 
                                     defaultItems={dataRegion?.data.data && searchRegency !== "" ? dataRegion.data.data : []}
                                     defaultInputValue={dataDefaultRegion}
                                     label="City" 
                                     variant="bordered"
                                     onInputChange={(search) => handleSearchRegion(search)}
                                     isInvalid ={errorsUpdateLocation.region !== undefined}
                                     errorMessage={errorsUpdateLocation.region?.message}
                                     onSelectionChange={(value) => onChange(value)}
                                     placeholder="Search city here"
                                 >
                                     {(regency: IRegency) => (
                                         <AutocompleteItem key={`${regency.id}`}>
                                             {regency.name}
                                         </AutocompleteItem>
                                     )}

                                 </Autocomplete>
                             )} 
                         />
                       ) : (
                            <div className="w-full h-16" />
                       )}
                    </Skeleton>
                          
                    <Button 
                        color="danger" 
                        className="mt-2 disabled:bg-default-500"
                        type="submit"
                        disabled={isPendingUpdate || !dataEvent?._id}
                        >
                            { isPendingUpdate ? (
                                <Spinner size="sm" color="white" />
                            ) : (
                                "Save Changes"
                            )}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default LocationTab;