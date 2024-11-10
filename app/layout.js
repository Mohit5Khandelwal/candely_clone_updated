import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import CreateEvent from "@/components/CreateEvent";


// Global layout page 

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Meeting Scheduler",
  description: "Develop by Mohit Khandelwal",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

          {/* Header */}
          <Header />
          

          <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {children}
          </main>

          {/* Global Event Page */}
          <CreateEvent />


          

          {/* Footer */}

          <footer className="bg-blue-100 py-12">
            <div className="container mx-auto px-4 text-center text-gray-800 font-bold">
              <p> Made with 💖 by Mohit Khandelwal </p>
            </div>
          </footer>


          

        </body>
      </html>
    </ClerkProvider>
  );
}
