import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>
type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>
type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>
type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>
type CardActionProps = React.HTMLAttributes<HTMLDivElement>
type CardContentProps = React.HTMLAttributes<HTMLDivElement>
type CardFooterProps = React.HTMLAttributes<HTMLDivElement>

export const Card: React.FC<CardProps> = ({ className = "", ...props }) => {
  return (
    <div
      data-slot="card"
      className={`bg-card text-card-foreground flex flex-col gap-6 rounded-xl border ${className}`}
      {...props}
    />
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({ className = "", ...props }) => {
  return (
    <div
      data-slot="card-header"
      className={`@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 ${className}`}
      {...props}
    />
  );
};

export const CardTitle: React.FC<CardTitleProps> = ({ className = "", ...props }) => {
  return (
    <h4 data-slot="card-title" className={`leading-none ${className}`} {...props} />
  );
};

export const CardDescription: React.FC<CardDescriptionProps> = ({ className = "", ...props }) => {
  return (
    <p data-slot="card-description" className={`text-muted-foreground ${className}`} {...props} />
  );
};

export const CardAction: React.FC<CardActionProps> = ({ className = "", ...props }) => {
  return (
    <div
      data-slot="card-action"
      className={`col-start-2 row-span-2 row-start-1 self-start justify-self-end ${className}`}
      {...props}
    />
  );
};

export const CardContent: React.FC<CardContentProps> = ({ className = "", ...props }) => {
  return (
    <div data-slot="card-content" className={`px-6 [&:last-child]:pb-6 ${className}`} {...props} />
  );
};

export const CardFooter: React.FC<CardFooterProps> = ({ className = "", ...props }) => {
  return (
    <div
      data-slot="card-footer"
      className={`flex items-center px-6 pb-6 [.border-t]:pt-6 ${className}`}
      {...props}
    />
  );
};
