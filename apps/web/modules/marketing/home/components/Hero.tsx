"use client";

import { useState, useEffect } from 'react';
import { Link } from "@i18n";
import { Button } from "@ui/components/button";
import { ArrowRightIcon, CheckCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import heroImageDark from "../../../../public/images/hero-image-dark.png";
import heroImage from "../../../../public/images/hero-image.png";

export function Hero() {
  const [initialElementsVisible, setInitialElementsVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState([false, false, false, false]);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [interfaceVisible, setInterfaceVisible] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    const featureTimers = visibleFeatures.map((_, index) => 
      setTimeout(() => {
        setVisibleFeatures(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, 1100 + index * 200)
    );

    const buttonTimer = setTimeout(() => {
      setButtonsVisible(true);
    }, 2000);

    const interfaceTimer = setTimeout(() => {
      setInterfaceVisible(true);
      setInitialElementsVisible(true)
    }, 2500); // Interface appears 500ms after buttons

    return () => {
      clearTimeout(titleTimer);
      featureTimers.forEach(clearTimeout);
      clearTimeout(buttonTimer);
      clearTimeout(interfaceTimer);
    };
  }, []);

  const features = ["IP 打造", "内容创作", "矩阵分发", "商机发现"];

  return (
    <div className="container pt-40 pb-16 text-center relative">
      {/* 新功能标签 */}
      <div className={`mb-6 flex justify-center transition-all duration-1000 ${
        initialElementsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className="mx-auto flex flex-wrap items-center justify-center rounded-full border border-highlight bg-highlight/10 p-px px-4 py-1 font-normal text-highlight text-sm backdrop-blur-sm dark:bg-highlight/5 dark:text-highlight/90">
          <Sparkles className="mr-2 h-4 w-4" />
          <span className="font-semibold">新功能:</span>
          <span className="ml-1 block">AI 驱动的智能文案生成器</span>
        </div>
      </div>

      {/* 品牌名和产品名 */}
      <h1 className={`mx-auto max-w-3xl text-balance font-bold text-6xl lg:text-8xl relative mb-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
          招财进宝
        </span>
      </h1>
      <h2 className={`text-3xl lg:text-5xl font-semibold relative mb-6 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
          小红书公域自媒体IP打造工具
        </span>
      </h2>

      {/* 主要特点 */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {features.map((feature, index) => (
          <div
            key={feature}
            className={`flex items-center transition-all duration-500 ${
              visibleFeatures[index]
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-4'
            }`}
          >
            <CheckCircle className="mr-2 h-5 w-5 text-green-500 dark:text-green-400" />
            <span className="dark:text-gray-300">{feature}</span>
          </div>
        ))}
      </div>

      {/* 按钮 */}
      <div className={`mt-10 flex flex-col items-center justify-center gap-4 md:flex-row transition-all duration-500 ${
        buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <Button
          size="lg"
          className="w-full md:w-auto px-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-all duration-300 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600"
          asChild
        >
          <Link href="/auth/login">
            免费试用 14 天
            <ArrowRightIcon className="ml-2 size-4" />
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full md:w-auto px-8 border-foreground/20 hover:bg-foreground/5 transition-all duration-300 dark:border-gray-600 dark:hover:bg-gray-800"
          asChild
        >
          <Link href="/docs">查看演示视频</Link>
        </Button>
      </div>

      {/* 界面展示图片 */}
      <div className={`mt-16 rounded-2xl border border-foreground/10 bg-card/50 p-2 shadow-2xl dark:shadow-accent/10 relative overflow-hidden transition-all duration-1000 ${
        interfaceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } dark:bg-gray-800/50 dark:border-gray-700`}>
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background/20 z-10 dark:from-transparent dark:to-gray-900/20"></div>
        <Image
          src={heroImage}
          alt="招财进宝 小红书公域自媒体IP打造工具界面展示"
          className="block rounded-xl dark:hidden"
        />
        <Image
          src={heroImageDark}
          alt="招财进宝 小红书公域自媒体IP打造工具界面展示"
          className="hidden rounded-xl dark:block"
        />
      </div>
    </div>
  );
}