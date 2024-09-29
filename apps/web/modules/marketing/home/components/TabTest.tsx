'use client'
import { useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/tabs";
import { Button } from "@ui/components/button";
import {
  ArrowRightIcon,
  BarChartIcon,
  BrainCircuitIcon,
  FileCheckIcon,
  RocketIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react";

const featureData = [
  {
    id: 'dashboard',
    title: '仪表盘',
    description: '提供用户整体运营情况的快速概览，显示关键指标、最近发布的内容表现和待处理任务提醒。',
    imageSrc: '/images/hero.svg',
    imageDarkSrc: '/images/hero-dark.svg',
    subFeatures: [
      {
        icon: <BrainCircuitIcon className="size-6 text-3xl text-highlight" />,
        title: '关键指标',
        description: '显示粉丝总数、内容总浏览量、总互动量、近7天增长趋势等'
      },
      {
        icon: <SparklesIcon className="size-6 text-3xl text-highlight" />,
        title: '热门内容',
        description: '推荐热门内容和热点话题'
      }
    ]
  },
  {
    id: 'planning',
    title: '账号规划',
    description: '通过AI对话采集用户信息，为用户生成个性化的小红书IP运营策略。',
    imageSrc: '/images/hero.svg',
    imageDarkSrc: '/images/hero-dark.svg',
    subFeatures: [
      {
        icon: <FileCheckIcon className="size-6 text-3xl text-highlight" />,
        title: 'IP定位分析',
        description: '生成初步IP定位'
      },
      {
        icon: <UsersIcon className="size-6 text-3xl text-highlight" />,
        title: '运营策略',
        description: '生成全面的IP运营策略文档'
      }
    ]
  },
  {
    id: 'content',
    title: '内容选题',
    description: '帮助用户发现和选择适合的内容主题。',
    imageSrc: '/images/hero.svg',
    imageDarkSrc: '/images/hero-dark.svg',
    subFeatures: [
      {
        icon: <SparklesIcon className="size-6 text-3xl text-highlight" />,
        title: '热点追踪',
        description: '实时抓取和分析小红书平台的热门话题和趋势'
      },
      {
        icon: <BarChartIcon className="size-6 text-3xl text-highlight" />,
        title: '爆款分析',
        description: '分析平台内高性能内容，提取可复制的成功要素'
      }
    ]
  },
  {
    id: 'creation',
    title: '内容创作',
    description: '提供专为小红书平台优化的内容创作工具，包括图文编辑器、视频制作和AI写作助手。',
    imageSrc: '/images/hero.svg',
    imageDarkSrc: '/images/hero-dark.svg',
    subFeatures: [
      {
        icon: <RocketIcon className="size-6 text-3xl text-highlight" />,
        title: '图文编辑器',
        description: '富文本编辑功能和图片编辑'
      },
      {
        icon: <BarChartIcon className="size-6 text-3xl text-highlight" />,
        title: 'AI写作助手',
        description: '智能生成内容大纲和文案'
      }
    ]
  },
  {
    id: 'publish',
    title: '发布管理',
    description: '管理所有待发布和已发布的内容。',
    imageSrc: '/images/hero.svg',
    imageDarkSrc: '/images/hero-dark.svg',
    subFeatures: [
      {
        icon: <SparklesIcon className="size-6 text-3xl text-highlight" />,
        title: '发布队列',
        description: '显示待发布内容列表，定时发布功能，发布状态跟踪'
      },
      {
        icon: <BarChartIcon className="size-6 text-3xl text-highlight" />,
        title: '矩阵发布',
        description: '支持同一内容在多个账号上发布，内容微调功能，发布时间错峰设置'
      }
    ]
  },
  {
    id: 'leads',
    title: '线索管理',
    description: '集中管理和回复所有内容的评论和私信，并深入分析内容表现和账号增长情况。',
    imageSrc: '/images/hero.svg',
    imageDarkSrc: '/images/hero-dark.svg',
    subFeatures: [
      {
        icon: <SparklesIcon className="size-6 text-3xl text-highlight" />,
        title: '评论管理',
        description: '评论汇总和分类，AI辅助快速回复，评论者画像分析，评论情感分析'
      },
      {
        icon: <BarChartIcon className="size-6 text-3xl text-highlight" />,
        title: '私信管理',
        description: '多账号私信汇总，智能分类和优先级排序，快速回复模板，私信用户画像分析'
      }
    ]
  }
];

export function TabbedFeatureCards() {
  const [activeTab, setActiveTab] = useState(featureData[0].id);

  return (
    <section className="py-24 text-card-foreground bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-bold text-4xl lg:text-5xl">
            强大功能，助您轻松管理公众号
          </h1>
          <p className="mt-3 text-foreground/60 text-lg">
            我们的平台提供全方位的功能，满足您的所有需求
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-8 border-b-transparent">
            {featureData.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="px-4 py-3 text-lg font-semibold transition-all duration-200 hover:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent"
                onMouseEnter={() => setActiveTab(feature.id)}
              >
                {feature.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {featureData.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="mt-6">
              <div className="grid items-center gap-8 rounded-2xl border bg-card/50 p-8 lg:grid-cols-2 lg:gap-16">
                <div className="overflow-hidden rounded-xl bg-primary/10 p-12">
                  <Image
                    src={feature.imageSrc}
                    className="block dark:hidden"
                    alt={feature.title}
                    width={400}
                    height={300}
                  />
                  <Image
                    src={feature.imageDarkSrc}
                    className="hidden dark:block"
                    alt={feature.title}
                    width={400}
                    height={300}
                  />
                </div>

                <div>
                  <h3 className="font-bold text-3xl">{feature.title}</h3>
                  <p className="mt-2 text-foreground/60 leading-normal">
                    {feature.description}
                  </p>
                  <Button variant="secondary" size="sm" className="mt-4">
                    了解更多
                    <ArrowRightIcon className="ml-2 size-4" />
                  </Button>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {feature.subFeatures.map((subFeature, index) => (
                      <div key={index} className="text-card-foreground">
                        {subFeature.icon}
                        <strong className="mt-2 block">{subFeature.title}</strong>
                        <p className="text-foreground/60">{subFeature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export default TabbedFeatureCards;