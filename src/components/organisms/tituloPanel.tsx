import type { JSX } from "react";

const TituloPanel = ({
  titulo,
  iconTypea,
  description,
}: {
  titulo: string,
  iconTypea: JSX.Element,
  description: string
}) => {
  return (
    <div className="flex py-2 flex-col border-b sm:flex-row justify-center sm:justify-between items-center sm:items-start gap-4 sm:gap-2 text-center sm:text-left w-full">
      <div className="flex-1 min-w-0 sm:flex-initial">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 truncate flex items-center gap-2">
          {iconTypea }
          <span>{titulo}</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-400 max-w-xs sm:max-w-none mx-auto sm:mx-0">
          {description}
        </p>
      </div>
      <div className="text-muted-foreground shrink-0">
        <div className="text-lg sm:text-2xl font-mono font-bold tracking-wide">
          08:16 p.&nbsp;m.
        </div>
        <div className="text-xs sm:text-sm font-medium mt-1">
          martes, 3 de febrero de 2026
        </div>
      </div>
    </div>
  );
};
export default TituloPanel;
