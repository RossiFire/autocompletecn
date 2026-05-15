import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Usage",
    description: "Explore all the autocompletecn capabilities.",
};

export default function UsageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}