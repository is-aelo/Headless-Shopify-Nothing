const Price = ({
  amount,
  className,
  currencyCode = "USD",
  currencyCodeClassName,
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<"p">) => {
  const parts = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
  }).formatToParts(parseFloat(amount));

  return (
    <p suppressHydrationWarning={true} className={className}>
      {parts.map((part, index) => {
        if (part.type === "currency") {
          return (
            <span key={index} className={currencyCodeClassName}>
              {part.value}
            </span>
          );
        }
        return part.value;
      })}
    </p>
  );
};

export default Price;
