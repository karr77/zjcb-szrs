// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React, { useState, useEffect } from 'react'

export default function Component() {
  const [showInput, setShowInput] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fullText = "Company: Aomni\nPitch: Aomni is transforming the way sales teams operate.\nOur AI-powered platform revolutionizes sales by generating laser-focused value propositions, crafting hyper-relevant sales materials, and tailoring pitches to each stakeholder's unique needs.\nImagine having a virtual sales expert at your fingertips, instantly providing the tools to close more deals faster.\nAomni doesn't just automate tasks; it amplifies human potential, allowing sales teams to focus on building relationships and driving revenue growth.";

  useEffect(() => {
    // 先显示输入框
    setTimeout(() => setShowInput(true), 500);

    // 然后显示卡片
    setTimeout(() => {
      setShowCard(true);
      setIsTyping(true);
    }, 1500);

    // 开始打字效果
    setTimeout(() => {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 10); // 加快打字速度

      return () => clearInterval(typingInterval);
    }, 1000);
  }, []);

  return (
    <div className="relative z-[2] flex size-full min-h-[200px] flex-col items-center justify-center gap-y-1 overflow-hidden px-4">
      <div className={`relative flex flex-col items-center justify-center gap-y-3 p-7 transition-all duration-1000 ${showCard ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        {showCard && (
          <div className="relative flex size-full max-w-[340px] flex-col gap-y-1 rounded-lg bg- p-4 text-xs shadow-[0_21px_44px_-32px_rgba(63,70,75,0.10),0_26px_30px_-23px_rgba(39,44,48,0.20),0_14px_40px_0_rgba(39,44,48,0.05),0_0_0_1px_rgba(39,44,48,0.08),0_4px_8px_0px_rgba(39,44,48,0.12)]" style={{zIndex: 1, opacity: 1, willChange: 'transform, opacity', transform: 'translateY(50px)'}}>
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg width="18" height="32" viewBox="0 0 18 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -left-10 -top-20 size-fit object-contain">
              <path d="M6.66634 25.9953C6.71069 26.3799 6.4046 26.7245 5.98268 26.7649C5.56076 26.8054 5.18277 26.5263 5.13843 26.1417C4.98095 24.7759 4.554 23.9831 3.95443 23.5405C3.35485 23.0979 2.41549 22.8821 0.917169 23.0256C0.495248 23.066 0.117263 22.787 0.0729177 22.4024C0.028572 22.0178 0.334658 21.6732 0.756579 21.6328C2.2549 21.4892 3.1245 21.1 3.61003 20.5535C4.09555 20.0069 4.33237 19.1506 4.17489 17.7847C4.13054 17.4001 4.43663 17.0555 4.85855 17.0151C5.28047 16.9747 5.65845 17.2537 5.7028 17.6383C5.86028 19.0042 6.28722 19.7969 6.8868 20.2395C7.48637 20.6821 8.42574 20.898 9.92406 20.7544C10.346 20.714 10.724 20.993 10.7683 21.3776C10.8127 21.7623 10.5066 22.1068 10.0846 22.1473C8.58633 22.2908 7.71673 22.68 7.2312 23.2266C6.74568 23.7731 6.50886 24.6295 6.66634 25.9953Z" fill="#F5D256" />
              <path d="M14.9483 30.8347C14.9926 31.2193 14.6865 31.5639 14.2646 31.6043C13.8427 31.6447 13.4647 31.3657 13.4204 30.9811C13.3186 30.0988 13.0486 29.6431 12.7245 29.404C12.4005 29.1648 11.8554 29.0187 10.8876 29.1114C10.4657 29.1518 10.0877 28.8728 10.0433 28.4882C9.999 28.1036 10.3051 27.759 10.727 27.7186C11.6948 27.6259 12.1947 27.3797 12.4571 27.0843C12.7195 26.7889 12.8797 26.292 12.778 25.4097C12.7336 25.0251 13.0397 24.6806 13.4617 24.6401C13.8836 24.5997 14.2616 24.8787 14.3059 25.2634C14.4076 26.1456 14.6777 26.6013 15.0017 26.8405C15.3257 27.0797 15.8709 27.2257 16.8387 27.133C17.2606 27.0926 17.6386 27.3716 17.6829 27.7562C17.7273 28.1409 17.4212 28.4854 16.9993 28.5258C16.0315 28.6186 15.5316 28.8648 15.2692 29.1602C15.0068 29.4555 14.8465 29.9525 14.9483 30.8347Z" fill="#F5D256" />
            </svg>
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -right-10 -top-20 size-fit object-contain">
              <path d="M12.8151 7.0897C12.7834 6.6765 12.3903 6.36495 11.937 6.39385C11.4837 6.42274 11.1419 6.78113 11.1736 7.19434C11.3593 9.61423 10.8934 11.2232 9.89451 12.2707C8.89563 13.3182 7.21259 13.9627 4.55801 14.1319C4.10473 14.1608 3.76297 14.5192 3.79466 14.9324C3.82636 15.3456 4.21951 15.6572 4.67279 15.6283C7.32738 15.4591 9.09243 15.8837 10.2415 16.7943C11.3906 17.7049 12.0976 19.2391 12.2832 21.659C12.3149 22.0722 12.708 22.3838 13.1613 22.3549C13.6146 22.326 13.9564 21.9676 13.9247 21.5544C13.739 19.1345 14.2049 17.5255 15.2038 16.478C16.2027 15.4305 17.8857 14.786 20.5403 14.6168C20.9936 14.5879 21.3353 14.2295 21.3036 13.8163C21.2719 13.4031 20.8788 13.0916 20.4255 13.1205C17.7709 13.2897 16.0059 12.865 14.8568 11.9544C13.7077 11.0438 13.0007 9.5096 12.8151 7.0897Z" fill="#F5D256" />
              <path d="M4.16202 5.38579C4.14089 5.11032 3.87879 4.90263 3.5766 4.92189C3.27442 4.94115 3.04658 5.18008 3.06771 5.45555C3.14275 6.43379 2.95035 7.03948 2.58894 7.41847C2.22753 7.79747 1.59635 8.05545 0.523236 8.12385C0.221051 8.14311 -0.0067889 8.38204 0.014342 8.65751C0.0354728 8.93298 0.297573 9.14068 0.599758 9.12142C1.67287 9.05301 2.3373 9.2284 2.75305 9.55786C3.1688 9.88731 3.4518 10.4627 3.52684 11.4409C3.54797 11.7164 3.81007 11.9241 4.11225 11.9048C4.41444 11.8856 4.64228 11.6466 4.62115 11.3712C4.54611 10.3929 4.73851 9.78725 5.09992 9.40826C5.46133 9.02926 6.09251 8.77128 7.16562 8.70288C7.46781 8.68361 7.69565 8.44469 7.67452 8.16922C7.65339 7.89375 7.39129 7.68605 7.0891 7.70531C6.01599 7.77372 5.35156 7.59833 4.93581 7.26887C4.52005 6.93942 4.23706 6.36404 4.16202 5.38579Z" fill="#F5D256" />
              <path d="M9.32749 1.04676C9.30636 0.771285 9.04426 0.563589 8.74207 0.582851C8.43989 0.602114 8.21205 0.841042 8.23318 1.11651C8.28165 1.74838 8.15371 2.09934 7.9584 2.30416C7.76309 2.50897 7.39964 2.67331 6.70649 2.71749C6.40431 2.73676 6.17647 2.97568 6.1976 3.25115C6.21873 3.52662 6.48083 3.73432 6.78301 3.71506C7.47616 3.67087 7.86116 3.7875 8.08584 3.96554C8.31052 4.14359 8.49079 4.4749 8.53926 5.10677C8.56039 5.38224 8.82249 5.58994 9.12468 5.57067C9.42686 5.55141 9.6547 5.31248 9.63357 5.03701C9.5851 4.40515 9.71304 4.05418 9.90835 3.84937C10.1037 3.64455 10.4671 3.48022 11.1603 3.43603C11.4624 3.41677 11.6903 3.17784 11.6692 2.90237C11.648 2.6269 11.3859 2.4192 11.0837 2.43847C10.3906 2.48265 10.0056 2.36603 9.78091 2.18798C9.55623 2.00994 9.37596 1.67862 9.32749 1.04676Z" fill="#F5D256" />
            </svg>
            <div className="flex w-full items-center justify-between">
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg width="24" height="6" viewBox="0 0 24 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="-mt-2">
                <rect x="0.985352" y="0.986328" width="5" height="5" rx="2.5" fill="#CBD3D6" />
                <rect x="9.98535" y="0.986328" width="5" height="5" rx="2.5" fill="#CBD3D6" />
                <rect x="18.9854" y="0.986328" width="5" height="5" rx="2.5" fill="#CBD3D6" />
              </svg>
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg width="111" height="41" viewBox="0 0 111 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.985352" y="11.4863" width="104" height="10" rx="3" fill="#EDEDEF" />
                <g filter="url(#filter0_f_0_1)">
                  <rect x="5.98535" y="5.29785" width="10" height="45" transform="rotate(-47 5.98535 5.29785)" fill="white" fillOpacity="0.59" />
                </g>
                <g filter="url(#filter1_f_0_1)">
                  <rect x="65.9854" y="5.29785" width="10" height="45" transform="rotate(-47 65.9854 5.29785)" fill="white" fillOpacity="0.59" />
                </g>
                <defs>
                  <filter id="filter0_f_0_1" x="1.08535" y="-6.91563" width="49.5305" height="47.8034" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="2.45" result="effect1_foregroundBlur_0_1" />
                  </filter>
                  <filter id="filter1_f_0_1" x="61.0854" y="-6.91563" width="49.5305" height="47.8034" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="2.45" result="effect1_foregroundBlur_0_1" />
                  </filter>
                </defs>
              </svg>
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg width="24" height="6" viewBox="0 0 24 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="invisible">
                <rect x="0.985352" y="0.986328" width="5" height="5" rx="2.5" fill="#CBD3D6" />
                <rect x="9.98535" y="0.986328" width="5" height="5" rx="2.5" fill="#CBD3D6" />
                <rect x="18.9854" y="0.986328" width="5" height="5" rx="2.5" fill="#CBD3D6" />
              </svg>
            </div>
            <div className="whitespace-pre-line">{typedText}</div>
          </div>
        )}
        <div className={`flex size-full min-w-[calc(100%+5px)] items-center justify-center gap-x-2 rounded-lg bg-white px-8 shadow-[0_21px_44px_-32px_rgba(63,70,75,0.10),0_26px_30px_-23px_rgba(39,44,48,0.20),0_14px_40px_0_rgba(39,44,48,0.05),0_0_0_1px_rgba(39,44,48,0.08),0_4px_8px_0px_rgba(39,44,48,0.12)] md:min-w-[370px] transition-all duration-1000 ${showInput ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`} style={{zIndex: 1, willChange: 'auto', transform: 'translateY(-25px)'}}>
          <input 
            className="h-12 w-full focus-within:outline-none focus:outline-none appearance-none border-none bg-transparent focus:ring-0 focus:ring-offset-0"
            style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
            type="text" 
            placeholder="Generating the pitch..." 
            aria-label="Pitch generation input" 
            readOnly
          />
          <div className="flex items-center justify-center">
            {isTyping ? (
              // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
<svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
<svg viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="16">
                <path d="M9.58333 15.4439L15 0.443848L-1.26362e-05 5.86052L6.66666 8.77719L9.58333 15.4439Z" fill="black" fillOpacity="0.55" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}