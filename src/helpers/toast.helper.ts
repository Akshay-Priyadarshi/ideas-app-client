import toast from "react-hot-toast";
import { toTitleCase } from "./string.helper";

export const successToast = (msg: string) => {
    toast.success(toTitleCase(msg), {
        position: "bottom-center",
        duration: 4000,
    });
};

export const errorToast = (msg: string) => {
    toast.error(toTitleCase(msg), {
        position: "bottom-center",
        duration: 4000,
    });
};
