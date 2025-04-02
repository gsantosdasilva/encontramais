export default function GridPattern({ className }: { className?: string }) {
  return (
    <div className={`absolute inset-0 z-0 opacity-10 ${className}`}>
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5" />
    </div>
  )
}

