import "@/styles/style.scss";

export const metadata = {
  title: "AvoTech",
  icons: "/favicon.ico",
  description: "An advanced system for detecting and monitoring avocado trees using cutting-edge technology to enhance agricultural efficiency and productivity.",
};

export default function RootLayout({children}) {
  return (
      <html lang="en">
        <body>{children}</body>
      </html>
  );
}
