import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  /** Rendered on its own line in italic plum after the title */
  emphasis?: string;
  subtitle?: string;
  align?: "center" | "start";
  as?: "h1" | "h2";
}

export const SectionHeading = ({
  eyebrow,
  title,
  emphasis,
  subtitle,
  align = "center",
  as: Heading = "h2",
}: SectionHeadingProps) => {
  const centered = align === "center";

  return (
    <div className={cn("flex flex-col gap-4", centered ? "items-center text-center" : "items-start text-start")}>
      {eyebrow && (
        <Reveal className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
          <span aria-hidden className="h-px w-9 bg-gold" />
          {eyebrow}
          {centered && <span aria-hidden className="h-px w-9 bg-gold" />}
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <Heading className="font-display text-4xl font-medium leading-[1.05] text-foreground md:text-6xl">
          {title}
          {emphasis && (
            <>
              <br />
              <em className="text-primary">{emphasis}</em>
            </>
          )}
        </Heading>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
};
