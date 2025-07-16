import "@/styles/style.scss";
import ClientProviders from "./ClientProviders";
import AlertPopup from "./(DashboardLayout)/dashboard/components/AlertPopup";
import SensorDataLogger from "@/app/(DashboardLayout)/dashboard/components/SensorDataLogger"

export const metadata = {
  title: "AvoTech",
  icons: "/favicon.ico",
  description: "Advanced system for avocado disease detection",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <SensorDataLogger />
          {children}
          <AlertPopup />
        </ClientProviders>
      </body>
    </html>
  );
}
