import { useEffect } from "react";
import toast from "react-hot-toast";

interface ErrorNotificationProps {
    isError: boolean;
    title: string;
}

const useErrorNotification = ({
    isError,
    title,
}: ErrorNotificationProps) => {

    useEffect(() => {
        if (isError) {
            toast.error(title);
        }
    }, [isError]);
}

export default useErrorNotification;