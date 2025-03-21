"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { ArrowLeft, Timer, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface ProgrammingQuestion {
  id: number;
  title: string;
  description: string;
  timeLimit: number; // in seconds
  requirements: string[];
  testCases?: { input: string; output: string }[];
}

export default function ProgrammingTest() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [code, setCode] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [answers, setAnswers] = useState<{ code: string; completed: boolean }[]>([]);
  const [isSkilled, setIsSkilled] = useState<boolean>(false);

  const programmingQuestions: ProgrammingQuestion[] = [
    {
      id: 1,
      title: "Addition Program",
      description: "Write a C program that takes two numbers as input and prints their sum.",
      timeLimit: 210, // 3 minutes 30 seconds
      requirements: [
        "Use scanf() to get input",
        "Use printf() to display the result",
        "Include proper variable declarations",
        "Handle integer inputs only"
      ]
    },
    {
      id: 4,
      title: "Addition Program",
      description: "Write a C program that takes two numbers as input and prints their sum.",
      timeLimit: 210, // 3 minutes 30 seconds
      requirements: [
        "Use scanf() to get input",
        "Use printf() to display the result",
        "Include proper variable declarations",
        "Handle integer inputs only"
      ]
    },
    {
      id: 2,
      title: "Student and Course Management",
      description: "Create two structures: 'Student' and 'Course'. The Student structure should contain roll number, name, and age. The Course structure should contain course code, name, and credits. Write functions to input and display details of 3 students and their enrolled courses.",
      timeLimit: 420, // 7 minutes
      requirements: [
        "Create Student structure with roll_no, name, age",
        "Create Course structure with code, name, credits",
        "Implement input function for both structures",
        "Display function to show all details",
        "Handle at least 3 students and their courses"
      ]
    },
    {
      id: 3,
      title: "Bank Account Management System",
      description: "Create a mini banking system that allows users to check balance, deposit, and withdraw money. Use structures to store account information and implement functions for each operation.",
      timeLimit: 1500, // 25 minutes
      requirements: [
        "Create Account structure with account_no, name, balance",
        "Implement deposit function",
        "Implement withdrawal function",
        "Add balance inquiry feature",
        "Maintain transaction history",
        "Handle insufficient balance cases",
        "Format currency display properly"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
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

  // Initialize the test
  useEffect(() => {
    // Initialize answers array with empty entries for all questions
    const initialAnswers = new Array(programmingQuestions.length).fill({ code: "", completed: false });
    setAnswers(initialAnswers);
    // Set initial time for first question
    setTimeLeft(programmingQuestions[0].timeLimit);
    // Reset current question index to ensure we start from the first question
    setCurrentQuestionIndex(0);
    setCode("");
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle results
  useEffect(() => {
    if (showResult) {
      const totalScore = (answers.filter(a => a.completed).length / programmingQuestions.length) * 100;
      setScore(totalScore);
      setIsSkilled(totalScore >= 70);

      if (totalScore >= 70) {
        toast({
          title: "Congratulations! 🎉",
          description: "You've earned the Skilled Developer badge! You're guaranteed to receive your first freelancing project within 2 weeks.",
          duration: 5000,
        });
      }
    }
  }, [showResult, answers, toast, programmingQuestions.length]);

  const validateCode = (code: string, questionId: number) => {
    // Basic validation based on question requirements
    switch (questionId) {
      case 1:
        return code.toLowerCase().includes("scanf") && 
               code.toLowerCase().includes("printf") && 
               code.toLowerCase().includes("int") &&
               code.includes("+");
               case 4:
                return code.toLowerCase().includes("scanf") && 
                       code.toLowerCase().includes("printf") && 
                       code.toLowerCase().includes("int") &&
                       code.includes("+");
      case 2:
        return code.toLowerCase().includes("struct") && 
               code.toLowerCase().includes("student") &&
               code.toLowerCase().includes("course");
      case 3:
        return code.toLowerCase().includes("struct") && 
               code.toLowerCase().includes("account") &&
               code.toLowerCase().includes("balance") &&
               code.toLowerCase().includes("deposit") &&
               code.toLowerCase().includes("withdraw");
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    const isValid = validateCode(code, programmingQuestions[currentQuestionIndex].id);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = { code, completed: isValid };
    setAnswers(newAnswers);
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < programmingQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCode(answers[nextIndex]?.code || "");
      setTimeLeft(programmingQuestions[nextIndex].timeLimit);
    } else {
      setShowResult(true);
    }
  };

  const handleRedirectToDashboard = () => {
    router.push("/freelancer/dashboard");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <motion.div
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <Link href="/freelancer/skill-test" className="inline-flex items-center text-muted-foreground hover:text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to tests
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
          {!showResult ? (
            <Card className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Programming Challenge</h1>
                <div className="flex items-center space-x-2">
                  <Timer className="w-5 h-5" />
                  <span className="font-mono">{formatTime(timeLeft)}</span>
                </div>
              </div>

              <Progress 
                value={(timeLeft / programmingQuestions[currentQuestionIndex].timeLimit) * 100} 
                className="mb-6"
              />

              <div className="space-y-6">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <h2 className="font-semibold mb-2">
                    Question {currentQuestionIndex + 1} of {programmingQuestions.length}:
                    {" "}{programmingQuestions[currentQuestionIndex].title}
                  </h2>
                  <p className="mb-4">{programmingQuestions[currentQuestionIndex].description}</p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Requirements:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {programmingQuestions[currentQuestionIndex].requirements.map((req, index) => (
                        <li key={index} className="text-sm text-muted-foreground">{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Textarea
                  className="font-mono min-h-[300px]"
                  placeholder="#include <stdio.h>..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />

                <div className="flex justify-end">
                  <Button onClick={handleSubmit}>
                    Submit Solution
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="p-8 text-center">
                <h1 className="text-3xl font-bold mb-6">Assessment Complete!</h1>
                <div className="text-6xl font-bold text-primary mb-6">
                  {score}%
                </div>
                {isSkilled && (
                  <div className="flex flex-col items-center space-y-4 mb-6">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Trophy className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-center">
                      <h2 className="text-xl font-semibold mb-2">Skilled Badge Earned!</h2>
                      <p className="text-muted-foreground">
                        Congratulations! You've earned the Skilled Developer badge.
                        You're guaranteed to receive your first freelancing project within 2 weeks!
                      </p>
                    </div>
                  </div>
                )}
                <p className="text-muted-foreground mb-8">
                  Questions Completed: {answers.filter(a => a.completed).length} of {programmingQuestions.length}
                </p>
                <Button 
                  onClick={handleRedirectToDashboard}
                  className="w-full max-w-xs mx-auto"
                >
                  Go to Dashboard
                </Button>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}