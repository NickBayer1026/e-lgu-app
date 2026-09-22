import Image from "next/image";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex size-9 items-center justify-center overflow-hidden rounded-lg bg-primary/10 ring-1 ring-primary/20">
        <Image
          src="/logo.png"
          alt="e-LGU"
          width={36}
          height={36}
          className="size-9 object-contain"
          priority
        />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className="text-sm font-bold tracking-tight">e-LGU</p>
          <p className="text-[10px] text-muted-foreground">
            Local Government Services
          </p>
        </div>
      )}
    </div>
  );
}