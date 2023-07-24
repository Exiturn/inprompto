import "@styles/globals.css";
import localfont from "@next/font/local";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Prompto",
  description:
    "Prompto is a simple, modern, and AI powered prompting tool. Share prompts, discover and create new prompts.",
};

const montreal = localfont({
  src: [
    {
      path: "../public/fonts/PPNeueMontreal-Medium.otf",
      weight: "500",
    },
    {
      path: "../public/fonts/PPNeueMontreal-Bold.otf",
      weight: "700",
    },
    {
      path: "../public/fonts/PPNeueMontreal-Book.otf",
      weight: "400",
    },
  ],
  variable: "--font-montreal",
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={`${montreal.variable} font-montreal`}>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
