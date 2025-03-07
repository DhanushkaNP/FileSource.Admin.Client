import "@/styles/globals.css";
import ReduxProvider from "../redux/Provider";

export const metadata = {
  title: "sysadmin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white font-default text-dark-dark-blue">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
