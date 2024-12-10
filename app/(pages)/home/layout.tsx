import WithHeader from "@/app/components/Layout/WithHeaderLayout";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <WithHeader>
            {children}
        </WithHeader>
    )
}

