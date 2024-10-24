import MainLayout from "@/layouts/MainLayout"

export const metadata = {
    title: 'Contractor',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <MainLayout>
            {children}
        </MainLayout>
    )
}
