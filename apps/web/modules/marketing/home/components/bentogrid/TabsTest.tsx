// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Component() {
  const [activeTab, setActiveTab] = useState('Team')
  const [showAvatars, setShowAvatars] = useState(false)

  const [messages, setMessages] = useState([
    {
      avatar: "https://ui-avatars.com/api/?name=Jake+Schumacher&size=50&background=random",
      name: "Jake Schumacher",
      message: "Our contact booked a meeting",
      liked: false
    },
    {
      avatar: "https://ui-avatars.com/api/?name=Joly+Brownie&size=50&background=random",
      name: "Joly brownie",
      message: "This new system is Fire 🔥",
      liked: true
    },
    {
      avatar: "https://ui-avatars.com/api/?name=Orpha+Salsa&size=50&background=random",
      name: "Orpha salsa",
      message: "We got some news!",
      liked: true
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        const lastMessage = newMessages.pop();
        if (lastMessage) {
          newMessages.unshift(lastMessage);
        }
        return newMessages;
      });
    }, 3000); // 每3秒交换一次位置

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 延迟显示头像
    const timer = setTimeout(() => {
      setShowAvatars(true)
    }, 1000) // 1秒后显示头像

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative z-[2] flex size-full min-h-[500px] mt-8 flex-col items-center justify-center gap-y-2 overflow-hidden rounded-b-none">
      {/* <img src="/landing/assets/cardbg.png" alt="" className="absolute left-1/2 top-1/2 size-fit -translate-x-1/2 -translate-y-1/2 object-contain" /> */}
      <motion.div 
        className="absolute -bottom-5 left-1/8 flex -translate-x-1/2 flex-col items-center justify-center gap-y-4 p-7 pb-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="z-[2] flex size-full min-w-[300px] origin-bottom items-center justify-center gap-x-2 rounded-lg bg-white shadow-[0_21px_44px_-32px_rgba(63,70,75,0.10),0_26px_30px_-23px_rgba(39,44,48,0.20),0_14px_40px_0_rgba(39,44,48,0.05),0_0_0_1px_rgba(39,44,48,0.08),0_4px_8px_0px_rgba(39,44,48,0.12)]">
          <AnimatePresence>
            {showAvatars && (
              <>
                <CustomerAvatar src="https://randomuser.me/api/portraits/men/1.jpg" className="left-12 -top-14 rounded-full" />
                <CustomerAvatar src="https://randomuser.me/api/portraits/women/1.jpg" className="-top-14 left-[calc(50%-10px)] rounded-full" />
                <CustomerAvatar src="https://randomuser.me/api/portraits/men/2.jpg" className="-top-14 right-10 rounded-full" />
              </>
            )}
          </AnimatePresence>
          <div className="w-full p-5">
            <p className="flex items-center justify-start gap-x-2 pb-5 text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.59111 0.467285L11.6598 4.95699L16.8785 6.48841L13.5564 10.7944L13.7125 16.2303L8.59111 14.4018L3.46967 16.2303L3.62578 10.7944L0.303711 6.48841L5.52245 4.95699L8.59111 0.467285ZM8.59111 3.04071L6.42867 6.20522L2.75079 7.28353L5.09258 10.3173L4.98148 14.1477L8.59111 12.8595L12.2 14.1477L12.0896 10.3173L14.4307 7.28353L10.7535 6.20522L8.59111 3.04071V3.04071ZM7.13883 8.81785C7.13883 9.20302 7.29184 9.57241 7.56419 9.84477C7.83655 10.1171 8.20594 10.2701 8.59111 10.2701C8.97627 10.2701 9.34566 10.1171 9.61802 9.84477C9.89037 9.57241 10.0434 9.20302 10.0434 8.81785L11.4957 8.81785C11.4957 9.58819 11.1896 10.327 10.6449 10.8717C10.1002 11.4164 9.36144 11.7224 8.59111 11.7224C7.82077 11.7224 7.08199 11.4164 6.53728 10.8717C5.99257 10.327 5.68656 9.58819 5.68656 8.81785L7.13883 8.81785Z" fill="#525866" />
              </svg>
              Customer Insights
            </p>
            <div className="flex w-full items-center justify-between rounded-lg bg-[#F6F8FA] p-1">
              <div className="relative flex w-full items-center justify-between">
                {['Table', 'Team', 'Timeline'].map((tab) => (
                  // biome-ignore lint/a11y/useButtonType: <explanation>
<button
                    key={tab}
                    className={`relative px-4 py-2 ${activeTab === tab ? 'z-0' : 'z-[1]'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {activeTab === tab && (
                      <div className="absolute inset-0 rounded-md bg-white text-black shadow-md" style={{ opacity: 1 }} />
                    )}
                    <span className={`relative block text-sm font-medium duration-200 ${activeTab === tab ? 'text-neutral-800' : 'text-[#868C98]'}`}>
                      {tab}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col mt-4 items-start py-4 relative" style={{ height: `${messages.length * 80}px` }}>
              <AnimatePresence initial={false}>
                {messages.map((msg, index) => (
                   <motion.div
                   key={msg.name}
                   initial={{ opacity: 0, y: 50 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -50 }}
                   transition={{ duration: 2, ease: "easeInOut" }} // 增加过渡时间
                   style={{ position: 'absolute', width: '100%', top: `${index * 80}px` }}
               >
                    <MessageItem
                      avatar={msg.avatar}
                      name={msg.name}
                      message={msg.message}
                      liked={msg.liked}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function CustomerAvatar({ src, className }: { src: string; className: string }) {
  return (
    <motion.div 
      className={`absolute size-fit object-contain ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img src={src} alt="" className="size-10 object-contain" />
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg width="28" height="55" viewBox="0 0 28 55" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-[calc(50%-10px)] top-[30px] -translate-x-1/2">
        <path d="M27 1.16211L27 27.2708C27 30.0322 24.7614 32.2708 22 32.2708L6 32.2708C3.23858 32.2708 1 34.5094 0.999999 37.2708L0.999999 54.1621" stroke="#737678" strokeOpacity="0.44" strokeWidth="0.5" strokeLinecap="square" />
        <path d="M27 1.16211L27 27.2708C27 30.0322 24.7614 32.2708 22 32.2708L6 32.2708C3.23858 32.2708 1 34.5094 0.999999 37.2708L0.999999 54.1621" stroke="#737678" strokeOpacity="0.44" strokeWidth="0.5" strokeLinecap="square" />
      </svg>
    </motion.div>
  )
}

function MessageItem({ avatar, name, message, liked }: { avatar: string; name: string; message: string; liked: boolean }) {
  return (
    <div className="relative flex w-full items-start justify-between gap-x-2 py-3" style={{ zIndex: 3, opacity: 1, willChange: 'auto', transform: 'translateY(0.0123255px)', transformOrigin: '50% 50% 0px' }}>
      <div className="absolute bottom-0 left-1/2 h-px w-[calc(100%+16px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
      <img src={avatar} alt={name} />
      <div className="flex w-full flex-col gap-y-1">
        <p className="text-xs">{name}</p>
        <p className="text-sm">{message}</p>
      </div>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button aria-label={`${liked ? 'Unlike' : 'Like'} Message`} className="shrink-0 focus:outline-none" style={{ transform: 'scale(1.01)', willChange: 'auto' }}>
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 ease-in-out">
          <path
            d="M9.74583 0.715073C11.5842 0.715073 13.074 2.21423 13.074 4.31305C13.074 8.51068 8.5356 10.9093 7.02282 11.8088C5.51003 10.9093 0.97168 8.51068 0.97168 4.31305C0.97168 2.21423 2.48446 0.715073 4.2998 0.715073C5.42532 0.715073 6.4177 1.31473 7.02282 1.9144C7.62793 1.31473 8.62032 0.715073 9.74583 0.715073Z"
            fill={liked ? "#DF1C41" : "none"}
            stroke={liked ? "#DF1C41" : "#CDD0D5"}
            strokeWidth="1"
            className="transition-all duration-300 ease-in-out"
          />
        </svg>
      </button>
    </div>
  )
 }