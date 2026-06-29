import { Toaster } from "react-hot-toast";

// Toasts được phát qua lib/notify (react-hot-toast) — component này chỉ là nơi
// hiển thị và cấu hình style chung. Không còn phụ thuộc Redux.
const Notifications = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          fontSize: "14px",
          fontWeight: "500",
        },
        success: {
          duration: 3000,
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
        },
        error: {
          duration: 4000,
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
        },
      }}
    />
  );
};

export default Notifications;
