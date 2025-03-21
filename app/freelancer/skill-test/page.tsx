"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Code, FileSpreadsheet, Pencil, Lightbulb } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SkillTest() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const skillTests = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Programming Skills",
      description: "Test your coding abilities across different languages and frameworks",
      duration: "45 mins",
      questions: 25,
      path: "/freelancer/skill-test/programming"
    },
    {
      icon: <FileSpreadsheet className="w-6 h-6" />,
      title: "Data Entry",
      description: "Assess your typing speed, accuracy, and data processing abilities",
      duration: "15 mins",
      questions: 11,
      path: "/freelancer/skill-test/data-entry"
    },
    {
      icon: <Pencil className="w-6 h-6" />,
      title: "Communication",
      description: "Assess your written and verbal communication skills",
      duration: "25 mins",
      questions: 15,
      path: "/freelancer/skill-test/communication"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Creativity",
      description: "Showcase your creative thinking and innovation abilities",
      duration: "35 mins",
      questions: 18,
      path: "/freelancer/skill-test/creativity"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <motion.div
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <Link href="/freelancer/signup" className="inline-flex items-center text-muted-foreground hover:text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to signup
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Skill Assessment</h1>
            <p className="text-xl text-muted-foreground">
              Complete these tests to showcase your expertise and unlock better opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {skillTests.map((test, index) => (
              <motion.div
                key={test.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(test.path)}
              >
                <Card className="p-6 h-full cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        {test.icon}
                      </div>
                      <h2 className="text-xl font-semibold">{test.title}</h2>
                    </div>
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {test.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm text-muted-foreground">
                        Duration: {test.duration}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {test.questions} questions
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}