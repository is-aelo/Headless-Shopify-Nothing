import clsx from "clsx";

export default function LogoIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.SITE_NAME} logo`}
      viewBox="0 0 24 24"
      {...props}
      className={clsx("h-4 w-4", props.className)}
    >
      {/* Nothing Signature Red Dot Indicator */}
      <circle cx="12" cy="12" r="5" className="fill-accent-red" />
    </svg>
  );
}
