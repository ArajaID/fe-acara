import { 
    Button, 
    Card, 
    CardBody, 
    CardHeader,
    Input, 
    Skeleton, 
    Spinner, 
} from "@heroui/react"
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IProfile } from "@/types/Auth";

interface PropTypes {
    dataProfile: IProfile;
    onUpdate: (data: IProfile) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
    const { 
        dataProfile, 
        onUpdate, 
        isPendingUpdate, 
        isSuccessUpdate,
    } = props;

    const { 
        controlUpdateInfo,
        errorsUpdateInfo,
        handleSubmitUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
    } = useInfoTab();

    useEffect(() => {
        if(dataProfile) {
            setValueUpdateInfo('fullName', `${dataProfile?.fullName}`);
        }
    }, [dataProfile])

    useEffect(() => {
        if(isSuccessUpdate) {
            resetUpdateInfo();
        } 
    }, [isSuccessUpdate])

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="text-xl font-bold w-full">User Information</h1>
                <p className="text-sm text-default-400 w-full">
                    Manage information your profile                
                </p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateInfo(onUpdate)}>
                    <Skeleton isLoaded={!!dataProfile?.username} className="rounded-lg">
                        <Input
                            label="Username" 
                            variant="flat"
                            disabled
                            labelPlacement="outside" 
                            type="text"
                            value={dataProfile?.username}
                        />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataProfile?.email} className="rounded-lg">
                        <Input
                            label="Email" 
                            variant="flat"
                            disabled
                            labelPlacement="outside" 
                            type="text"
                            value={dataProfile?.email}
                        />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataProfile?.role} className="rounded-lg">
                        <Input
                            label="Role" 
                            variant="flat"
                            disabled
                            labelPlacement="outside" 
                            type="text"
                            value={dataProfile?.role}
                        />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataProfile?.fullName} className="rounded-lg">
                        <Controller 
                            name="fullName"
                            control={controlUpdateInfo}
                            render={({field}) => (
                                <Input 
                                    {...field}
                                    label="Full Name" 
                                    variant="bordered"
                                    labelPlacement="outside"
                                    placeholder="Input your fullname" 
                                    type="text"
                                    isInvalid ={errorsUpdateInfo.fullName !== undefined}
                                    errorMessage={errorsUpdateInfo.fullName?.message}
                                />
                            )} 
                        />
                    </Skeleton>
                          
                    <Button 
                        color="danger" 
                        className="mt-2 disabled:bg-default-500"
                        type="submit"
                        disabled={isPendingUpdate || !dataProfile?._id}
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

export default InfoTab;