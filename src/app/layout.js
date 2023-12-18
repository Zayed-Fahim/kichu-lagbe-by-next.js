import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Roboto } from "next/font/google";
import classNames from "@/utils/classNames";
import Providers from "@/providers";
import Toaster from "@/Components/Toaster/Toaster";
import "./globals.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Home || Kichu Lagbe?",
  description: "Author Zayed Fahim",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="transition-all" data-theme="light">
      <body className={classNames(roboto.variable, "font-roboto")}>
        <main>
          <Providers>
            <div className="min-h-screen">{children}</div>
            <SpeedInsights />
            <Analytics />
          </Providers>
          <Toaster position="top-right" reverseOrder={false} />
        </main>
      </body>
    </html>
  );
};
export default RootLayout;
