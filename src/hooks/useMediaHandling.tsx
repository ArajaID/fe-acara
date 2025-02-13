import { ToasterContext } from "@/contexts/ToasterContexts";
import uploadServices from "@/services/upload.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useMediaHandling = () => {
    const { setToaster } = useContext(ToasterContext);

    const uploadIcon = async (file: File, callback: (fileUrl: string) => void) => {
        const formData = new FormData();
        formData.append("file", file);
        const {
            data: {
                data: {secure_url: icon}
            },
        } = await uploadServices.uploadFile(formData);
        callback(icon)
    };

    const {
        mutate: mutateUploadFile, 
        isPending: isPendingMutateUploadFile, 
    } = useMutation({
        mutationFn: (variabels: {
            file: File;
            callback: (fileUrl: string) => void;
        }) => uploadIcon(variabels.file, variabels.callback),
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            })
        },
    });

    const deleteIcon = async (fileUrl: string, callback: () => void) => {
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
        }) => deleteIcon(variabels.fileUrl, variabels.callback),
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            })
        },
    });

    return {
        mutateUploadFile,
        isPendingMutateUploadFile,
        mutateDeleteFile,
        isPendingMutateDeleteFile,
    };
}

export default useMediaHandling;



