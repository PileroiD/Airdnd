import toast from "react-hot-toast";

export const showToastNotification = (
    type: "error" | "success",
    text: string
) => {
    switch (type) {
        case "error":
            toast.error(text, {
                duration: 3000,
                position: "bottom-right",
            });
            break;
        case "success":
            toast.success(text, {
                duration: 3000,
                position: "bottom-right",
            });
            break;
        default:
            return;
    }
};
