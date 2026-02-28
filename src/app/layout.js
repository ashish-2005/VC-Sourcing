import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "VC Intelligence",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="flex bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-10">{children}</main>
      </body>
    </html>
  );
}