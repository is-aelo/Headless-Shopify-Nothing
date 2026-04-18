import clsx from "clsx";

function Grid(props: React.ComponentProps<"ul">) {
  return (
    <ul
      {...props}
      className={clsx(
        "grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        props.className,
      )}
    >
      {props.children}
    </ul>
  );
}

function GridItem(props: React.ComponentProps<"li">) {
  return (
    <li
      {...props}
      className={clsx("transition-opacity duration-200", props.className)}
    >
      {props.children}
    </li>
  );
}

Grid.Item = GridItem;

export default Grid;
