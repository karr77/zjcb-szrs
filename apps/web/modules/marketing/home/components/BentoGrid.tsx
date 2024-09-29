'use client'
import {
    FileTextIcon,
    GlobeIcon,
    InputIcon,
  } from "@radix-ui/react-icons";
  
import { BentoCard, BentoGrid } from "@ui/components/bento-grid";
import FullText from "./bentogrid/FullText";
import PitchCard from "./bentogrid/PitchCard";
import TabsTest from "./bentogrid/TabsTest";

const features = [
    {
      Icon: FileTextIcon,
      name: "Save your files",
      description: "We automatically save your files as you type.",
      href: "/",
      cta: "Learn more",
      background: <FullText />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-4",
    },
    {
      Icon: InputIcon,
      name: "Full text search",
      description: "Search through all your files in one place.",
      href: "/",
      cta: "Learn more",
      background: <PitchCard />,
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: GlobeIcon,
      name: "Multilingual",
      description: "Supports 100+ languages and counting.",
      href: "/",
      cta: "Learn more",
      // biome-ignore lint/a11y/useAltText: <explanation>
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: FileTextIcon,
      name: "Customer Insights",  // 修改名称以匹配新组件
      description: "Get valuable insights about your customers.",  // 修改描述
      href: "/",
      cta: "Learn more",
      background: <TabsTest />,  // 使用新的 TabsTest 组件
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-4",
    },
  ];
  
export default function BentoDemo() {
    return (
      <div className="max-w-7xl mx-auto py-12 mt-20">
        <div className="text-center">
					<h1 className="font-bold text-4xl lg:text-5xl">
						我们有什么？可以做什么？
					</h1>
					<p className="mt-3 text-foreground/60 text-lg">
						为每一次互动做好准备
					</p>
				</div>
          <BentoGrid className="mt-10 lg:grid-rows-[1fr_1fr_0.7fr] h-[800px] grid-cols-3">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
      </div>
    );
}
