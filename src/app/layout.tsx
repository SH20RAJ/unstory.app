import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Unistory - The Campus Operating System",
	description: "Connect, discover, and live your real-world campus story. The verified network for students.",
	openGraph: {
		title: "Unistory - Real-World Campus Connection",
		description: "A verified network for students to discover events, find their tribe, and build meaningful relationships.",
		type: "website",
	}
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}><StackProvider app={stackClientApp}><StackTheme>{children}</StackTheme></StackProvider></body>
		</html>
	);
}
