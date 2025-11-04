import * as React from "react";
import * as ReactDOM from "react-dom";

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface AlertDialogContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertDialogContext = React.createContext<AlertDialogContextType | null>(null);

function AlertDialog({ open, onOpenChange, children }: AlertDialogProps) {
  return (
    <AlertDialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

interface AlertDialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

function AlertDialogTrigger({ children, asChild }: AlertDialogTriggerProps) {
  const context = React.useContext(AlertDialogContext);

  if (!context) {
    throw new Error("AlertDialogTrigger must be used within AlertDialog");
  }

  const { onOpenChange } = context;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: () => onOpenChange(true)
    } as unknown as React.ReactElement<React.HTMLProps<HTMLElement>>);
  }

  return (
    <button
      onClick={() => onOpenChange(true)}
      className="inline-flex items-center justify-center"
    >
      {children}
    </button>
  );
}

interface AlertDialogContentProps {
  children: React.ReactNode;
  className?: string;
}

function AlertDialogContent({ children, className }: AlertDialogContentProps) {
  const context = React.useContext(AlertDialogContext);

  if (!context) {
    throw new Error("AlertDialogContent must be used within AlertDialog");
  }

  const { open, onOpenChange } = context;

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  const contentClass = `fixed inset-0 z-50 flex items-center justify-center ${className || ""}`.trim();

  return (
    <div className={contentClass}>
      <div
        className="fixed inset-0 bg-black/50 animate-in fade-in-0"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 animate-in fade-in-0 zoom-in-95">
        {children}
      </div>
    </div>
  );
}

interface AlertDialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

function AlertDialogHeader({ children, className }: AlertDialogHeaderProps) {
  const headerClass = `flex flex-col gap-2 text-center sm:text-left ${className || ""}`.trim();

  return (
    <div className={headerClass}>
      {children}
    </div>
  );
}

interface AlertDialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

function AlertDialogFooter({ children, className }: AlertDialogFooterProps) {
  const footerClass = `flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-4 ${className || ""}`.trim();

  return (
    <div className={footerClass}>
      {children}
    </div>
  );
}

interface AlertDialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

function AlertDialogTitle({ children, className }: AlertDialogTitleProps) {
  const titleClass = `text-lg font-semibold text-gray-900 ${className || ""}`.trim();

  return (
    <h2 className={titleClass}>
      {children}
    </h2>
  );
}

interface AlertDialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

function AlertDialogDescription({ children, className }: AlertDialogDescriptionProps) {
  const descriptionClass = `text-gray-600 text-sm mt-2 ${className || ""}`.trim();

  return (
    <p className={descriptionClass}>
      {children}
    </p>
  );
}

interface AlertDialogActionProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "destructive";
}

function AlertDialogAction({
  children,
  onClick,
  className,
  variant = "default"
}: AlertDialogActionProps) {
  const context = React.useContext(AlertDialogContext);

  const baseClass = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";

  const variantClass = variant === "destructive"
    ? "bg-red-600 text-white hover:bg-red-700"
    : "bg-blue-600 text-white hover:bg-blue-700";

  const actionClass = `${baseClass} ${variantClass} ${className || ""}`.trim();

  const handleClick = () => {
    onClick?.();
    context?.onOpenChange(false);
  };

  return (
    <button className={actionClass} onClick={handleClick}>
      {children}
    </button>
  );
}

interface AlertDialogCancelProps {
  children: React.ReactNode;
  className?: string;
}

function AlertDialogCancel({ children, className }: AlertDialogCancelProps) {
  const context = React.useContext(AlertDialogContext);

  const cancelClass = `inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 h-10 px-4 py-2 ${className || ""}`.trim();

  return (
    <button className={cancelClass} onClick={() => context?.onOpenChange(false)}>
      {children}
    </button>
  );
}

function AlertDialogPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return ReactDOM.createPortal(children, document.body);
}

function AlertDialogOverlay({ className, ...props }: React.ComponentProps<"div">) {
  const overlayClass = `fixed inset-0 z-50 bg-black/50 animate-in fade-in-0 ${className || ""}`.trim();

  return (
    <div className={overlayClass} {...props} />
  );
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogPortal,
  AlertDialogOverlay,
};