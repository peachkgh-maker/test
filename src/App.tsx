import { useState, type FormEvent } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    if (!trimmedName || !trimmedPhone) {
      setStatus('error');
      setErrorMsg('이름과 전화번호를 모두 입력해주세요.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const { error } = await supabase
      .from('event_registrations')
      .insert({ name: trimmedName, phone: trimmedPhone });

    if (error) {
      setStatus('error');
      setErrorMsg('신청 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setStatus('success');
    setName('');
    setPhone('');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-md border border-black/80 rounded-none p-8 bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
        {/* Header */}
        <header className="mb-8 pb-6 border-b-2 border-dashed border-black/30">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 border border-black bg-black" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-black/60">
              Wireframe / v1
            </span>
          </div>
          <h1 className="text-2xl font-bold text-black tracking-tight">
            이벤트 신청서
          </h1>
          <p className="mt-2 text-sm text-black/60 leading-relaxed">
            아래 정보를 입력하고 제출해주세요.
          </p>
        </header>

        {/* Success state */}
        {status === 'success' ? (
          <div className="py-10 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 border-2 border-black rounded-full mb-4">
              <Check className="w-7 h-7 text-black" strokeWidth={2.5} />
            </div>
            <h2 className="text-lg font-bold text-black mb-2">
              신청 완료
            </h2>
            <p className="text-sm text-black/60 mb-6">
              신청해주셔서 감사합니다.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="px-5 py-2 text-sm border border-black text-black hover:bg-black hover:text-white transition-colors"
            >
              다시 신청하기
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-bold text-black mb-2"
              >
                <span className="w-4 h-4 border border-black flex items-center justify-center text-[10px]">
                  01
                </span>
                이름
                <span className="text-black/40 text-xs font-normal">
                  (필수)
                </span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                disabled={status === 'submitting'}
                className="w-full px-3 py-3 bg-white border border-black/80 text-black placeholder:text-black/30 focus:outline-none focus:border-2 focus:border-black disabled:opacity-50"
              />
            </div>

            {/* Phone field */}
            <div>
              <label
                htmlFor="phone"
                className="flex items-center gap-2 text-sm font-bold text-black mb-2"
              >
                <span className="w-4 h-4 border border-black flex items-center justify-center text-[10px]">
                  02
                </span>
                전화번호
                <span className="text-black/40 text-xs font-normal">
                  (필수)
                </span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-0000-0000"
                disabled={status === 'submitting'}
                className="w-full px-3 py-3 bg-white border border-black/80 text-black placeholder:text-black/30 focus:outline-none focus:border-2 focus:border-black disabled:opacity-50"
              />
            </div>

            {/* Error message */}
            {status === 'error' && (
              <p className="text-sm text-black border border-black/40 bg-black/5 px-3 py-2">
                {errorMsg}
              </p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-3 bg-black text-white font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-black border border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  제출 중...
                </>
              ) : (
                '신청하기'
              )}
            </button>
          </form>
        )}

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t border-dashed border-black/20">
          <p className="text-[10px] text-black/40 text-center tracking-wider">
            ⌐ EVENT REGISTRATION FORM
          </p>
        </footer>
      </div>
    </div>
  );
}
