export default function AppLoading() {
  return (
    <div className="animate-pulse space-y-8" aria-label="Loading workspace">
      <div className="space-y-3">
        <div className="h-4 w-32 rounded bg-white/10" />
        <div className="h-9 w-52 rounded bg-white/10" />
        <div className="h-4 w-72 rounded bg-white/10" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((item) => <div key={item} className="h-32 rounded-2xl border border-white/10 bg-white/[0.04]" />)}
      </div>
      <div className="h-72 rounded-2xl border border-white/10 bg-white/[0.04]" />
    </div>
  );
}
