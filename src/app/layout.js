"use client";
import { Cairo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@ant-design/v5-patch-for-react-19";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import HydrationHandler from "./components/HydrationHandler";
import { Provider } from "react-redux";
import { App } from "antd";
import store from "../store/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "900"],
  display: "swap",
  variable: "--font-cairo",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Ogani Template" />
        <meta name="keywords" content="Ogani, unica, creative, html" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Ogani | Template</title>
        {/* Css Styles */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" type="text/css" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" type="text/css" />
        <link rel="stylesheet" href="/css/elegant-icons.css" type="text/css" />
        <link rel="stylesheet" href="/css/nice-select.css" type="text/css" />
        <link rel="stylesheet" href="/css/jquery-ui.min.css" type="text/css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" type="text/css" />
        <link rel="stylesheet" href="/css/slicknav.min.css" type="text/css" />
        <link rel="stylesheet" href="/css/style.css" type="text/css" />
      </head>
      <body className={`${cairo.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          <App>
            <Preloader />
            <Header />
            {children}
            <Footer />
          </App>
        </Provider>
      </body>
    </html>
  );
}
