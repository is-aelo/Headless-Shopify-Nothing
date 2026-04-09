import clsx from "clsx";

const StatusDot = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "flex h-2 w-2 flex-shrink-0 items-center justify-center",
        className,
      )}
    >
      {/* The Actual Solid Dot - Perfect Circle */}
      <span className="h-1.5 w-1.5 rounded-full bg-accent-red shadow-[0_0_8px_rgba(255,0,0,0.4)]"></span>
    </div>
  );
};

export default StatusDot;
