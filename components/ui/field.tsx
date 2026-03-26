import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

function Field({
	children,
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("flex flex-1 flex-col gap-1.5", className)}
			{...props}
		>
			{children}
		</div>
	);
}

function FieldLabel({
	children,
	className,
	...props
}: React.ComponentProps<typeof Label>) {
	return (
		<Label className={cn("text-sm font-medium", className)} {...props}>
			{children}
		</Label>
	);
}

function FieldError({
	errors,
}: { errors: ({ message?: string } | undefined)[] }) {
	return (
		<>
			{errors.filter(Boolean).map((err) => (
				<p key={err?.message} className="text-destructive text-xs">
					{err?.message}
				</p>
			))}
		</>
	);
}

export { Field, FieldLabel, FieldError };
