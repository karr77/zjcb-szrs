import { AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function FullText() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 1000) // 1秒后显示中央卡片
    const timer2 = setTimeout(() => setStage(2), 2000) // 2秒后显示浮动元素
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <div className="relative z-[2] flex size-full min-h-[550px] flex-col items-center justify-center gap-y-2 overflow-hidden rounded-xl rounded-b-none">
      {/* Initial AlertCircle */}
      <div className={`transition-all duration-1000 ${stage >= 1 ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="relative flex size-20 items-center justify-center rounded-lg bg-orange-500 text-white">
          <span className="z-10 text-4xl font-bold">
            <AlertCircle />
          </span>
          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <span className="absolute inline-flex size-full rounded-lg animate-ping bg-orange-400" style={{animationDelay: '0.5s'}}></span>
          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <span className="absolute inline-flex size-full rounded-lg animate-ping bg-orange-400" style={{animationDelay: '1s'}}></span>
          <span className="absolute inline-flex size-full rounded-lg bg-orange-500" />
        </div>
      </div>

      {/* Floating CEO Call Prep Element */}
      <div className={`absolute left-0 top-0 z-[-1] flex items-center justify-center gap-x-2 rounded-xl rounded-br-none bg-white p-2 text-sm text-black/60 shadow-[0_21px_44px_-32px_rgba(63,70,75,0.10),0_26px_30px_-23px_rgba(39,44,48,0.20),0_14px_40px_0_rgba(39,44,48,0.05),0_0_0_1px_rgba(39,44,48,0.08),0_4px_8px_0px_rgba(39,44,48,0.12)] transition-all duration-1000 ${stage >= 2 ? 'translate-x-[90px] translate-y-[50px] opacity-100' : 'translate-x-[-100px] translate-y-[50px] opacity-0'}`}>
        <p className="w-fit max-w-[200px] md:max-w-full">Help me prepare for my call with the</p>
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#F023CF] text-sm text-white">
          S
        </div>
      </div>

      {/* Central Card */}
      <div className={`mb-10 relative flex items-center justify-center transition-all duration-1000 ${stage >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <div className="absolute z-20 h-auto w-[300px] overflow-hidden bg-white shadow-[0_21px_44px_-32px_rgba(63,70,75,0.10),0_26px_30px_-23px_rgba(39,44,48,0.20),0_14px_40px_0_rgba(39,44,48,0.05),0_0_0_1px_rgba(39,44,48,0.08),0_4px_8px_0px_rgba(39,44,48,0.12)] outline-none md:w-[364px] dark:bg-zinc-700" style={{borderRadius: '12px'}}>
          <div className="flex w-full flex-col items-center gap-2 p-4">
            <div className="flex w-full items-center justify-between gap-x-2">
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg width="24" height="6" viewBox="0 0 24 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.985352" y="0.148438" width="5" height="5" rx="2.5" fill="#CBD3D6" />
                <rect x="9.98535" y="0.148438" width="5" height="5" rx="2.5" fill="#CBD3D6" />
                <rect x="18.9854" y="0.148438" width="5" height="5" rx="2.5" fill="#CBD3D6" />
              </svg>
              <p>Prospect Info</p>
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg width="24" height="6" viewBox="0 0 24 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="invisible">
                <rect x="0.985352" y="0.148438" width="5" height="5" rx="2.5" fill="#CBD3D6" />
                <rect x="9.98535" y="0.148438" width="5" height="5" rx="2.5" fill="#CBD3D6" />
                <rect x="18.9854" y="0.148438" width="5" height="5" rx="2.5" fill="#CBD3D6" />
              </svg>
            </div>
            <div className="flex w-full items-center justify-start gap-x-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#F05F23] text-xl text-white shadow-[inset_0_0_9px_0px_rgba(255,255,255,0.5)]">
                <AlertCircle />
              </div>
              <div>
                <p className="font-semibold">Acme Inc.</p>
                <p className="text-sm text-gray-600">acme.com</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-y-2 bg-[#F9F9F9] p-4 text-xs">
            <div className="flex items-center justify-between gap-x-2">
              <p className="font-medium text-[#272C30]">Company Overview</p>
              <p className="text-[#7B8E95]">Founded 2005</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <p className="leading-normal text-[#7B8E95]">
                Acme Inc. is a leading diversified financial services company that provides a wide range of innovative products and services to institutional clients worldwide.
              </p>
              <div className="flex items-center justify-between gap-x-2 text-xs">
                <p className="font-semibold text-[#272C30]">Industry Sector</p>
                <p className="text-[#7B8E95]">Financials</p>
              </div>
              <div className="flex items-center justify-start gap-x-5 text-[#7B8E95]">
                <p>Startup Accelerator</p>
                <p>Diversified Financials</p>
              </div>
            </div>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button aria-disabled="true" aria-label="Send Message" className="mt-2 rounded-md border border-black/10 px-4 py-2 text-black/60 transition-colors hover:bg-gray-100">
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Floating Value Propositions Element */}
      <div className={`absolute -bottom-2 -left-5 z-20 flex items-center justify-center gap-x-2 rounded-xl rounded-bl-none bg-white p-2 text-sm text-black/60 shadow-[0_21px_44px_-32px_rgba(63,70,75,0.10),0_26px_30px_-23px_rgba(39,44,48,0.20),0_14px_40px_0_rgba(39,44,48,0.05),0_0_0_1px_rgba(39,44,48,0.08),0_4px_8px_0px_rgba(39,44,48,0.12)] md:bottom-0 md:left-0 transition-all duration-1000 ${stage >= 2 ? 'translate-x-[50px] translate-y-[-20px] opacity-100' : 'translate-x-[100px] translate-y-[-20px] opacity-0'}`}>
        <div className="flex size-7 items-center justify-center rounded-full bg-blue-800 text-sm text-white">
          AI
        </div>
        <p className="w-fit max-w-[200px] text-balance md:max-w-full">Here are your main value propositions</p>
      </div>
    </div>
  )
}