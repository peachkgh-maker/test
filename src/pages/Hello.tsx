export default function Hello() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-md border border-black/80 p-8 bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 border border-black bg-black" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-black/60">
            Hello / v1
          </span>
        </div>
        <h1 className="text-3xl font-bold text-black tracking-tight">Hello</h1>
        <p className="mt-3 text-sm text-black/60 leading-relaxed">
          안녕하세요. 이 페이지는 GitHub Actions로 배포되었습니다.
        </p>
      </div>
    </div>
  );
}
