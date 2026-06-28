import { useEffect } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const Notification = () => {
  const { message, type } = useSelector((state) => state.noti);

  useEffect(() => {
    if (message) {
      if (type === "success") {
        toast.success(message, {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#198754",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#198754",
          },
        });
      } else if (type === "error") {
        toast.error(message, {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#dc3545",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#dc3545",
          },
        });
      }
    }
  }, [message, type]);

  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        className: "",
        style: {
          fontSize: "14px",
          fontWeight: "500",
        },
      }}
    />
  );
};

export default Notification;
