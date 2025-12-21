import './globals.css';
import Navbar from '@/components/Navbar';

export default function RootLayout({children}: {children: React.ReactNode;}) {
  return (
    <html lang="jp">
      <body>
        {/* 上部Navbar */}
        <Navbar />
        {/* 各ページのコンテンツがここに入る */}
        <main>{children}</main>
      </body>
    </html>
  )
}