import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { getWfPageBootstrapScript, WF_PAGE_HOME } from "@/data/wfPageId";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Classic Apartment",
    template: "%s | Classic Apartment",
  },
  description:
    "Classic Apartment — qulay xonalar, zamonaviy qulayliklar va iliq mehmondo‘stlik. Biznes va dam olish uchun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-wf-domain="elbergo.webflow.io"
      data-wf-site="6927ddcc377dce6e20188e35"
      data-wf-page={WF_PAGE_HOME}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: getWfPageBootstrapScript() }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/elbergo.shared.css" />
      </head>
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable}`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}