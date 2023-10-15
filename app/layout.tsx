import Header from "@/src/components/Header/Header";
import { Box, Stack, Container } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "On The Rise MSU",
  description: "On The Rise MSU club",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ margin: 0, background: "#1B1B1B" }}
      >
        <Header />
        <Container>{children}</Container>
      </body>
    </html>
  );
}
