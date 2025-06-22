import { toast as sonnerToast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning";

const toast = (message: string, type: ToastType = "info") => {
  switch (type) {
    case "success":
      sonnerToast.success(message);
      break;
    case "error":
      sonnerToast.error(message);
      break;
    case "info":
      sonnerToast.info(message);
      break;
    case "warning":
      sonnerToast.warning(message);
      break;
    default:
      sonnerToast(message);
      break;
  }
};

export { toast };
