import "./globals.css";


export const metadata = {
  title: "Shoes Store || فروشگاه کفش جلوه",
  description: "shop store generated with next v13",
  icons: {
    icon: "/img/1.jpg"
  }
};

export default async function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">

      <body >
     
        {children}
      
      </body>
    </html>
  );
}
