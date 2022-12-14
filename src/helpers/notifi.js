import { ToastContainer, toast } from "react-toastify";

const notifySuccess = (title) => {
  return toast.success(`${title} successfullly!`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

const notifyFail = (title, exist) => {
  return toast.error(exist ? "The name was existed!" : `${title} fail`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export { notifySuccess, notifyFail };
