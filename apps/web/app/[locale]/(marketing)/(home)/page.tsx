'use client'
import { useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic';
import { FaqSection } from "@marketing/home/components/FaqSection";
import { Hero } from "@marketing/home/components/Hero";
import { Newsletter } from "@marketing/home/components/Newsletter";
import { MarqueeDemo } from "@marketing/home/components/Marquee";
import MarketingLayout from "@marketing/home/components/TabTest"
import NumberTickerDemo from "@marketing/home/components/NumberTickerDemo"

const BentoDemo = dynamic(() => import('@marketing/home/components/BentoGrid').then(mod => mod.default), {
  loading: () => null, // 不显示加载状态
  ssr: false
});

const StepTest = dynamic(() => import('@marketing/home/components/StepTest').then(mod => mod.default), {
  loading: () => null,
  ssr: false
});

export default function Home() {
  const [showTicker, setShowTicker] = useState(false);
  const [showBento, setShowBento] = useState(false);
  const [showStepTest, setShowStepTest] = useState(false);
  const bentoRef = useRef(null);
  const stepTestRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTicker(true);
    }, 1500);

    const observerOptions = {
      root: null,
      rootMargin: '0px', // 当元素刚好进入视口时触发
      threshold: 0.1 // 当10%的元素可见时触发
    };

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === bentoRef.current) {
            setShowBento(true);
          } else if (entry.target === stepTestRef.current) {
            setShowStepTest(true);
          }
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (bentoRef.current) {
      observer.observe(bentoRef.current);
    }
    if (stepTestRef.current) {
      observer.observe(stepTestRef.current);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Hero />
      {showTicker && <NumberTickerDemo />}
      <MarketingLayout />
      <div 
        ref={bentoRef} 
        style={{ 
          minHeight: '100vh', // 设置为全屏高度
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
		  backgroundColor: 'bg-primary/5' 
        }}
      >
        {showBento ? <BentoDemo/> : <div>滚动以加载 BentoDemo</div>}
      </div>
      <div 
        ref={stepTestRef} 
        style={{ 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {showStepTest ? <StepTest /> : <div>滚动以加载 StepTest</div>}
      </div>
      <MarqueeDemo />
      <FaqSection />
      <Newsletter />
    </>
  );
}