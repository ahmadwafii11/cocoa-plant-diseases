import { cn } from "../../lib/cn";
import Badge from "./Badge";

// Desainnya ada di: src/styles/section.css
interface SectionHeadingProps {
    badge: string;
    title: string;
    description: string;
    align?: "center" | "left";
}

export default function SectionHeading({
    badge,
    title,
    description,
    align = "center",
}: SectionHeadingProps) {
    const isCenter = align === "center";

    return (
        <div className={isCenter ? "section-heading-center" : undefined}>
            <Badge variant="light">{badge}</Badge>

            <h2 className="section-title">{title}</h2>

            <p className={cn("section-desc", !isCenter && "section-desc-left")}>
                {description}
            </p>
        </div>
    );
};