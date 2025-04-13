import { Montserrat } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import ParentComponent from "./ParentComponent";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "Amazon App",
  icons: {
    icon: "/social.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-[#d1d5dbc3]`}>
        <ParentComponent>{children}</ParentComponent>
      </body>
    </html>
  );
}
