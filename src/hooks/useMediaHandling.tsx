import { ToasterContext } from "@/contexts/ToasterContexts";
import uploadServices from "@/services/upload.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useMediaHandling = () => {
    const { setToaster } = useContext(ToasterContext);

    const uploadFile = async (file: File, callback: (fileUrl: string) => void) => {
        const formData = new FormData();
        formData.append("file", file);
        const {
            data: {
                data: {secure_url: fileUrl}
            },
        } = await uploadServices.uploadFile(formData);
        callback(fileUrl)
    };

    const {
        mutate: mutateUploadFile, 
        isPending: isPendingMutateUploadFile, 
    } = useMutation({
        mutationFn: (variabels: {
            file: File;
            callback: (fileUrl: string) => void;
        }) => uploadFile(variabels.file, variabels.callback),
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            })
        },
    });

    const deleteFile = async (fileUrl: string, callback: () => void) => {
        const res = await uploadServices.deleteFile({fileUrl});
    
        if(res.data.meta.status === 200) {
            callback();
        }
    };

    const {
        mutate: mutateDeleteFile, 
        isPending: isPendingMutateDeleteFile, 
    } = useMutation({
        mutationFn: (variabels: {
            fileUrl: string;
            callback: () => void;
        }) => deleteFile(variabels.fileUrl, variabels.callback),
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            })
        },
    });

    const handleUploadFile = (
        files: FileList, 
        onChange: (files: FileList | undefined) => void,
        callback: (fileUrl?: string) => void,
    ) => {
        if(files.length !== 0) {
            onChange(files);
            mutateUploadFile({
                file: files[0],
                callback
            })
        }
    }

    const handleDeleteFile = (
        fileUrl: string | FileList | undefined,
        callback: () => void
    ) => {
        if(typeof fileUrl === "string") {
            mutateDeleteFile({fileUrl, callback})
        } else {
            callback();
        }
    }

    return {
        mutateUploadFile,
        isPendingMutateUploadFile,
        mutateDeleteFile,
        isPendingMutateDeleteFile,

        handleUploadFile,
        handleDeleteFile,
    };
}

export default useMediaHandling;



