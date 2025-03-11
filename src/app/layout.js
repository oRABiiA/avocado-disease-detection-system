import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar.jsx"
import Footer from "@/components/footer/Footer.jsx"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "AgriTech",
    icons: "/favicon.ico",
    description: "An advanced system for detecting and monitoring avocado trees using cutting-edge technology to enhance agricultural efficiency and productivity.",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <div className="container">
                <Navbar />
                {children}
                <Footer />
            </div>
        </body>
        </html>
    );
}
