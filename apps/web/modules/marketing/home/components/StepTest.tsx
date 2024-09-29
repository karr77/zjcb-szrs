// biome-ignore lint/correctness/noUnusedImports: <explanation>
import { FileText } from 'lucide-react';
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React, { useState, useEffect } from 'react';


export default function SalesIntelligenceSteps() {
  return (
    <div className="mx-auto px-4 py-16">
      <div className="mx-auto space-y-5 py-6 text-center">
        <h2 className="text-primary font-mono text-[14px] font-medium tracking-tight">工作原理</h2>
        <h2 className="mx-auto mb-2 max-w-3xl text-balance text-[42px] font-medium leading-tight tracking-tighter">人工智能驱动的销售智能分 3 步实现</h2>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-center py-20">
        <div className="grid h-full gap-6 lg:grid-cols-3">
          <Step1 />
          <Step2 />
          <Step3 />
        </div>
      </div>
    </div>
  )
}

function Step1() {
  return (
    <div className="relative h-full min-h-[500px] rounded-[20px] bg-[#ececf1] p-0 lg:col-span-1">
      <p className="absolute -top-20 left-1/2 hidden size-fit -translate-x-1/2 items-center justify-center object-contain lg:flex">
        步骤 1
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
         <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-5 size-14">
          <path d="M15.9441 15.8748C19.7179 15.0705 23.7632 14.8586 27.5765 15.5585C36.0702 17.1174 42.6422 22.0592 46.8543 29.5804C50.5526 36.1843 52.4659 44.153 52.3442 51.7058C52.3153 53.4997 51.9273 55.4879 51.2695 57.1085" stroke="black" strokeOpacity="0.65" strokeWidth="1.40169" strokeLinecap="round" />
          <path d="M42.5383 48.4746L50.5848 57.731C50.8387 58.0231 51.2814 58.0541 51.5735 57.8002L61.3588 49.2939" stroke="black" strokeOpacity="0.65" strokeWidth="1.40169" strokeLinecap="round" />
        </svg>
      </p>
      <div className="flex size-full flex-col items-center justify-between gap-y-3.5 p-5">
        <p className="flex items-center justify-center text-xl font-semibold text-neutral-900 dark:text-white">个性化</p>
        <div className="relative z-[1] mx-auto flex w-full max-w-[200px] flex-col items-start gap-y-2 rounded-[10px] bg-white p-2.5 shadow-[0_21px_44px_-32px_rgba(63,70,75,0.10),0_26px_30px_-23px_rgba(39,44,48,0.20),0_14px_40px_0_rgba(39,44,48,0.05),0_0_0_1px_rgba(39,44,48,0.08),0_4px_8px_0px_rgba(39,44,48,0.12)]">
          <div className="absolute left-1/2 top-1/2 z-[-1] size-[calc(100%+100px)] -translate-x-1/2 -translate-y-1/2 border-2 border-neutral-100 bg-gradient-to-b from-neutral-200/40 to-transparent">
            <div className="pointer-events-none absolute -left-0.5 -top-0.5 size-6 border-l-2 border-t-2 border-neutral-200" />
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <div className="pointer-events-none absolute -right-0.5 -top-0.5 size-6 border-r-2 border-t-2 border-neutral-200"></div>
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <div className="pointer-events-none absolute -bottom-0.5 -left-0.5 size-6 border-b-2 border-l-2 border-neutral-200"></div>
            <div className="pointer-events-none absolute -bottom-0.5 -right-0.5 size-6 border-b-2 border-r-2 border-neutral-200" />
          </div>
          <style jsx>{`
            @keyframes scanAnimation {
              0% {
                transform: translateY(-100%);
              }
              100% {
                transform: translateY(100%);
              }
            }
            .scanning-line {
              animation: scanAnimation 2s linear infinite;
            }
               .animate-scroll {
    animation: scroll 1.3s linear infinite; /* 10秒循环滚动 */
  }

  @keyframes scroll {
    0% { transform: translateY(-5%); }
    100% { transform: translateY(-200%); } /* 向上滚动 */
  }
          `}</style>
          <div className="relative aspect-[1/1.2142] w-full overflow-hidden rounded-md bg-gray-100">
            <div className="absolute inset-0">
              <div className="scanning-line absolute inset-x-0 top-0 z-[9999] h-24 w-full rounded-md border border-dashed border-[#6F44D1]/30 bg-gradient-to-b from-[#F5F1FF] via-transparent to-[#8aa2b1] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
              <div className="flex w-full flex-col gap-2 p-4">
                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((_, index) => (
                  <div key={index} className={`animate-scroll h-1 ${index === 0 || index === 8 ? 'w-1/2' : index === 3 || index === 11 ? 'h-10 w-full' : 'w-full'} rounded ${index === 0 || index === 8 ? 'bg-gray-300' : 'bg-gray-200'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-start">
          <p className="text-base font-normal text-[#526068]">训练一个了解你的 ICP、差异化因素和市场格局的 AI 代理</p>
        </div>
      </div>
    </div>
  )
}

function Step2() {
    const [heights, setHeights] = useState([40, 60, 40, 10, 20, 80, 50, 90]);

    useEffect(() => {
      const interval = setInterval(() => {
        // 随机生成新的高度
        const newHeights = heights.map(() => Math.floor(Math.random() * 100));
        setHeights(newHeights);
      }, 1000); // 每秒更新一次
  
      return () => clearInterval(interval); // 清理定时器
    }, [heights]);
  return (
    <div className="relative h-full min-h-[500px] rounded-[20px] bg-[#ececf1] p-0 lg:col-span-1">
      <p className="absolute -bottom-20 left-1/2 hidden size-fit -translate-x-1/2 items-center justify-center object-contain lg:flex">
        第 2 步
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg width="71" height="72" viewBox="0 0 71 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="-mt-5 size-14">
          <path d="M15.2749 55.7165C19.0488 56.5207 23.094 56.7327 26.9073 56.0328C35.401 54.4739 41.973 49.5321 46.1851 42.0108C49.8834 35.407 51.7967 27.4383 51.675 19.8855C51.6461 18.0915 51.2581 16.1034 50.6003 14.4828" stroke="black" strokeOpacity="0.65" strokeWidth="1.40169" strokeLinecap="round" />
          <path d="M41.8691 23.1166L49.9156 13.8603C50.1695 13.5681 50.6122 13.5372 50.9043 13.7911L60.6896 22.2974" stroke="black" strokeOpacity="0.65" strokeWidth="1.40169" strokeLinecap="round" />
        </svg>
      </p>
      <div className="flex size-full flex-col items-center justify-between gap-y-3.5 p-5">
        <p className="flex items-center justify-center text-xl font-semibold text-neutral-900 dark:text-white">分析</p>
        <div className="relative flex size-full items-center justify-center">
          <div className="flex size-full max-h-[400px] max-w-lg flex-col items-stretch justify-center gap-y-5">
            <div className="flex flex-row items-center justify-between">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="z-40 flex items-center justify-center rounded-md bg-white p-3 shadow-lg size-12 border">
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2 2.19385C2 1.22735 2.7835 0.443848 3.75 0.443848L12.25 0.443848C13.2165 0.443848 14 1.22735 14 2.19385L14 4.69385L18.25 4.69385C19.2165 4.69385 20 5.47735 20 6.44385L20 15.9438L21.25 15.9438C21.6642 15.9438 22 16.2796 22 16.6938C22 17.1081 21.6642 17.4438 21.25 17.4438L0.75 17.4438C0.335786 17.4438 -2.31966e-07 17.1081 -2.262e-07 16.6938C-2.20435e-07 16.2796 0.335786 15.9438 0.75 15.9438L2 15.9438L2 2.19385ZM14 15.9438L18.5 15.9438L18.5 6.44385C18.5 6.30578 18.3881 6.19385 18.25 6.19385L14 6.19385L14 15.9438ZM6 6.19385C6 5.77963 6.33579 5.44385 6.75 5.44385L9.25 5.44385C9.66421 5.44385 10 5.77963 10 6.19385C10 6.60806 9.66421 6.94385 9.25 6.94385L6.75 6.94385C6.33579 6.94385 6 6.60806 6 6.19385ZM6 10.1938C6 9.77963 6.33579 9.44385 6.75 9.44385L9.25 9.44385C9.66421 9.44385 10 9.77963 10 10.1938C10 10.6081 9.66421 10.9438 9.25 10.9438L6.75 10.9438C6.33579 10.9438 6 10.6081 6 10.1938Z" fill="black" fillOpacity="0.45" />
                  </svg>
                </div>
              ))}
            </div>
            <div className="flex flex-row items-center justify-center">
              <div className="z-40 flex items-center justify-center rounded-md bg-white p-3 shadow-lg size-12 border">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M2 2.19385C2 1.22735 2.7835 0.443848 3.75 0.443848L12.25 0.443848C13.2165 0.443848 14 1.22735 14 2.19385L14 4.69385L18.25 4.69385C19.2165 4.69385 20 5.47735 20 6.44385L20 15.9438L21.25 15.9438C21.6642 15.9438 22 16.2796 22 16.6938C22 17.1081 21.6642 17.4438 21.25 17.4438L0.75 17.4438C0.335786 17.4438 -2.31966e-07 17.1081 -2.262e-07 16.6938C-2.20435e-07 16.2796 0.335786 15.9438 0.75 15.9438L2 15.9438L2 2.19385ZM14 15.9438L18.5 15.9438L18.5 6.44385C18.5 6.30578 18.3881 6.19385 18.25 6.19385L14 6.19385L14 15.9438ZM6 6.19385C6 5.77963 6.33579 5.44385 6.75 5.44385L9.25 5.44385C9.66421 5.44385 10 5.77963 10 6.19385C10 6.60806 9.66421 6.94385 9.25 6.94385L6.75 6.94385C6.33579 6.94385 6 6.60806 6 6.19385ZM6 10.1938C6 9.77963 6.33579 9.44385 6.75 9.44385L9.25 9.44385C9.66421 9.44385 10 9.77963 10 10.1938C10 10.6081 9.66421 10.9438 9.25 10.9438L6.75 10.9438C6.33579 10.9438 6 10.6081 6 10.1938Z" fill="black" fillOpacity="0.45" />
                </svg>
              </div>
            </div>
            <div>
              <div className="z-40 flex size-full items-center justify-center rounded-md bg-white p-3 shadow-lg">
              <div className="flex h-[100px] w-full items-end gap-3">
      {heights.map((height, index) => (
        // biome-ignore lint/style/useSelfClosingElements: <explanation>
        <div key={index} className="w-full rounded-sm bg-[#F3F3F3] transition-all duration-500 ease-in-out" style={{height: `${height}%`, opacity: 1, willChange: 'auto', transform: 'none', transformOrigin: '50% 100% 0px'}}></div>
      ))}
    </div>
                <div className="absolute bottom-0 left-1/2 flex size-14 -translate-x-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white">
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-8">
                    <path d="M8.10254 1.56061L8.10254 7.59119C8.103 7.86319 8.18398 8.12896 8.33526 8.35501L14.8275 16.7336C14.9738 16.9536 15.1725 17.1337 15.4058 17.2577C15.6391 17.3817 15.8995 17.4456 16.1637 17.4438L21.757 17.4438C21.902 17.444 22.0456 17.4155 22.1796 17.3601C22.3137 17.3048 22.4355 17.2235 22.5381 17.121C22.6407 17.0185 22.722 16.8968 22.7776 16.7629C22.8331 16.6289 22.8617 16.4853 22.8617 16.3403L22.8617 10.4226C22.8623 10.0735 22.7589 9.7321 22.5645 9.44213L16.0617 1.04329C15.9396 0.858727 15.7736 0.707352 15.5786 0.602739C15.3836 0.498126 15.1657 0.443547 14.9444 0.443896L9.21721 0.443896C9.07031 0.44252 8.92462 0.470487 8.78867 0.526157C8.65273 0.581826 8.52927 0.664079 8.42553 0.76809C8.32179 0.872102 8.23986 0.995778 8.18455 1.13187C8.12924 1.26796 8.10166 1.41372 8.10342 1.56061L8.10254 1.56061Z" fill="black" />
                    <path d="M7.16371 9.44727L0.832704 9.44727C0.723369 9.44715 0.615083 9.46859 0.514041 9.51036C0.412999 9.55213 0.321183 9.61341 0.243844 9.69069C0.166505 9.76798 0.105161 9.85975 0.0633199 9.96077C0.0214792 10.0618 -3.73052e-05 10.17 1.27987e-06 10.2794L1.19174e-06 16.6104C-0.000191421 16.7197 0.0211627 16.828 0.0628428 16.929C0.104523 17.0301 0.165712 17.1219 0.242911 17.1993C0.32011 17.2767 0.411805 17.3381 0.512755 17.38C0.613704 17.422 0.721928 17.4436 0.831238 17.4437L7.16371 17.4437C7.38432 17.4437 7.5959 17.356 7.75189 17.2C7.90789 17.044 7.99553 16.8325 7.99553 16.6119L7.99553 10.2808C7.99572 10.1715 7.97435 10.0631 7.93264 9.96203C7.89092 9.86092 7.82969 9.76903 7.75243 9.69161C7.67517 9.61419 7.58341 9.55276 7.48239 9.51083C7.38137 9.4689 7.27308 9.4473 7.16371 9.44727Z" fill="black" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {[
            {start: '24,72', end: '164,140', id: ':R5akufnnhja:'},
            {start: '164,72', end: '164,140', id: ':R7akufnnhja:'},
            {start: '303.99993896484375,72', end: '164,140', id: ':R9akufnnhja:'},
            {start: '164,140', end: '164,184', id: ':Rbakufnnhja:'}
          ].map((path, index) => (
            // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
<svg key={index} fill="none" width="328" height="356" xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute left-0 top-0 transform-gpu stroke-2" viewBox="0 0 328 356">
              <path d={`M ${path.start} Q ${path.start.split(',')[0]},${path.end.split(',')[1]} ${path.end}`} stroke="gray" strokeWidth="2" strokeOpacity="0.2" strokeLinecap="round" />
              <path d={`M ${path.start} Q ${path.start.split(',')[0]},${path.end.split(',')[1]} ${path.end}`} strokeWidth="2" stroke={`url(#${path.id})`} strokeOpacity="1" strokeLinecap="round" />
              <defs>
                <linearGradient className="transform-gpu" id={path.id} gradientUnits="userSpaceOnUse" x1="109.89448%" x2="99.89448%" y1="0%" y2="0%">
                  <stop stopColor="#ffaa40" stopOpacity="0" />
                  <stop stopColor="#ffaa40" />
                  <stop offset="32.5%" stopColor="#9c40ff" />
                  <stop offset="100%" stopColor="#9c40ff" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          ))}
        </div>
        <div className="flex w-full items-start">
          <p className="text-base font-normal text-[#526068]">将您的具体解决方案与潜在客户的需求联系起来</p>
        </div>
      </div>
    </div>
  )
}

function Step3() {
    const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 1000); // 1秒后开始动画

    return () => clearTimeout(timer);
  }, []);
    return (
        <div className="relative h-full min-h-[400px] rounded-[20px] bg-[#ececf1] p-0 lg:col-span-1">
        <p className="absolute -top-20 left-1/2 hidden size-fit -translate-x-1/2 items-center justify-center object-contain lg:flex">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg width="71" height="72" viewBox="0 0 71 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-5 size-14">
            <path d="M55.1528 15.8747C51.379 15.0705 47.3337 14.8585 43.5204 15.5584C35.0267 17.1173 28.4547 22.0591 24.2427 29.5803C20.5444 36.1842 18.631 44.1529 18.7527 51.7057C18.7816 53.4996 19.1696 55.4878 19.8275 57.1084" stroke="black" strokeOpacity="0.65" strokeWidth="1.40169" strokeLinecap="round" />
            <path d="M28.5586 48.4745L20.5121 57.7309C20.2582 58.023 19.8155 58.054 19.5234 57.8001L9.7381 49.2938" stroke="black" strokeOpacity="0.65" strokeWidth="1.40169" strokeLinecap="round" />
          </svg>
          步骤3
        </p>
        <div className="flex size-full flex-col items-center justify-between gap-y-3.5 p-5">
          <p className="flex items-center justify-center text-xl font-semibold text-neutral-900 dark:text-white">执行</p>
          <div className="relative flex size-full items-center justify-center rounded-t-xl bg-transparent">
            <div className="absolute left-1/2 top-[calc(50%+3.5rem)] z-10 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#05C851]">
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check size-5 stroke-2 text-white">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <div className="absolute left-1/2 top-1/2 z-0 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E6E6E6]" />
            <div className="mx-auto flex w-full max-w-sm items-center justify-between gap-x-4 ">
              {[1, 2, 3].map((_, index) => (
                <div 
                  key={index} 
                  className={`z-[3] flex h-fit w-full flex-col items-center justify-between gap-2 transition-all duration-[2000ms] ease-in-out ${
                    isAnimated 
                      ? index === 1 
                        ? 'scale-110' 
                        : `translate-x-${index === 0 ? '-20' : '20'}`
                      : ''
                  }`} 
                  style={{willChange: 'transform'}}
                >
                  <div className="relative">
                    <img src="https://www.aomni.com/landing/assets/paper.png" alt="" className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.15)]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full items-start">
            <p className="text-base font-normal text-[#526068]">在几分钟内制定战略客户计划并交付可立即使用的交付成果</p>
          </div>
        </div>
      </div>
    )
  }