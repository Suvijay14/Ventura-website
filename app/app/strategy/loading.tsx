export default function StrategyListLoading() {
  return (
    <div className="animate-pulse px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="h-8 w-64 rounded-md bg-[#F4F6F9]" />
        <div className="h-4 max-w-xl rounded-md bg-[#F4F6F9]" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="h-24 rounded-md bg-[#F4F6F9]" />
          <div className="h-24 rounded-md bg-[#F4F6F9]" />
          <div className="h-24 rounded-md bg-[#F4F6F9]" />
        </div>
        <div className="mt-8 h-64 rounded-md bg-[#F4F6F9]" />
      </div>
    </div>
  );
}
