import InputFile from "@/components/ui/InputFile";
import { Button, Card, CardBody, CardHeader, Skeleton, Spinner } from "@heroui/react"
import Image from "next/image";
import useIconTab from "./useIconTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";

interface PropTypes {
    currentIcon: string;
    onUpdate: (data: ICategory) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const IconTab = (props: PropTypes) => {
    const { currentIcon, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

    const {
        handleDeleteIcon,
        handleUploadIcon,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,

        resetUpdateIcon,
        controlUpdateIcon,
        handleSubmitUpdateIcon,
        errorsUpdateIcon,

        preview
    } = useIconTab();

    useEffect(() => {
        if(isSuccessUpdate) {
            resetUpdateIcon();
        }
    }, [isSuccessUpdate]);

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="text-xl font-bold w-full">Category Icon</h1>
                <p className="text-sm text-default-400 w-full">
                    Manage icon of this category
                </p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateIcon(onUpdate)}>
                    <div className="felx flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Icon</p>
                        <Skeleton isLoaded={!!currentIcon} className="aspect-square rounded-lg">
                            <Image src={currentIcon} alt="icon" fill className="relative" />
                        </Skeleton>
                    </div>
                    <Controller 
                          name="icon"
                          control={controlUpdateIcon}
                          render={({field: {onChange, value, ...field}}) => (
                                <InputFile {...field} 
                                    onDelete={() => handleDeleteIcon(onChange)}
                                    onUpload={(files) => handleUploadIcon(files, onChange)}
                                    isUploading={isPendingMutateUploadFile}
                                    isDeleting={isPendingMutateDeleteFile}
                                    isInvalid={errorsUpdateIcon.icon !== undefined}
                                    errorMessage={errorsUpdateIcon.icon?.message}
                                    isDropable
                                    label={<p className="mb-2 text-sm font-medium text-default-700">Upload new icon</p>}
                                    preview={typeof preview === 'string' ? preview : ""}
                                />
                            )} 
                        />
                    <Button 
                        color="danger" 
                        className="mt-2 disabled:bg-default-500"
                        type="submit"
                        disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
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

export default IconTab;