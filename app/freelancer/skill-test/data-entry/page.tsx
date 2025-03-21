"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { ArrowLeft, Timer, Target, Activity, AlertTriangle, Trophy } from "lucide-react";
import Link from "next/link";

interface TestLevel {
  id: string;
  name: string;
  timeLimit: number;
  text: string;
  requiredWPM: number;
  requiredAccuracy: number;
  badgeThreshold: number;
}

export default function DataEntryTest() {
  const router = useRouter();
  const [level, setLevel] = useState<"easy" | "medium" | "hard">("easy");
  const [step, setStep] = useState<"level" | "typing" | "mcq">("level");
  const [typedText, setTypedText] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [testComplete, setTestComplete] = useState(false);
  const [currentMcq, setCurrentMcq] = useState(0);
  const [mcqTimeLeft, setMcqTimeLeft] = useState(30);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const levels: Record<string, TestLevel> = {
    easy: {
      id: "easy",
      name: "Entry Level",
      timeLimit: 120,
      requiredWPM: 30,
      requiredAccuracy: 90,
      badgeThreshold: 98,
      text: `In 2024, a groundbreaking study revealed that 73% of global companies adopted AI-driven solutions, resulting in a $2.5 trillion economic impact. Dr. Sarah Chen, leading the research at MIT, surveyed 1,842 organizations across 52 countries. The findings showed that companies implementing AI saw a 45% increase in productivity and reduced operational costs by $847 million collectively. Furthermore, 89% of employees reported improved job satisfaction, while customer satisfaction rates rose by 67%.`
    },
    medium: {
      id: "medium",
      name: "Intermediate Level",
      timeLimit: 180,
      requiredWPM: 45,
      requiredAccuracy: 95,
      badgeThreshold: 95,
      text: `The integration of artificial intelligence in modern healthcare systems has revolutionized patient care and medical diagnostics. A comprehensive study conducted by the International Medical Research Institute analyzed data from 2,547 hospitals across 87 countries between 2020 and 2024. The research revealed that AI-powered diagnostic tools achieved a remarkable 94.3% accuracy rate in detecting early-stage diseases, particularly in oncology and cardiovascular conditions. Additionally, machine learning algorithms reduced diagnostic time by 68% while simultaneously decreasing false-positive rates by 42%. The implementation of AI-driven administrative systems resulted in a 35% reduction in paperwork, allowing healthcare professionals to dedicate more time to direct patient care. These improvements led to a significant 28% increase in patient satisfaction scores and a 15% reduction in overall healthcare costs.`
    },
    hard: {
      id: "hard",
      name: "Advanced Level",
      timeLimit: 240,
      requiredWPM: 60,
      requiredAccuracy: 98,
      badgeThreshold: 90,
      // Split the text into sections for better readability
      text: `The unprecedented convergence of quantum computing and artificial intelligence has ushered in a transformative era in computational science and data processing capabilities. A groundbreaking research initiative, spanning from 2022 to 2024, conducted by an international consortium of quantum physicists and computer scientists from 15 leading research institutions, has demonstrated remarkable achievements in solving previously intractable computational problems.|The study, which utilized a 1000-qubit quantum processor integrated with advanced machine learning algorithms, successfully simulated complex molecular interactions for drug discovery 10,000 times faster than traditional supercomputers. This breakthrough has immediate applications in pharmaceutical research, climate modeling, and cryptography.|The research team documented that the quantum-AI hybrid system achieved a computational complexity reduction of O(2^n) to O(n^2) for certain NP-hard problems, representing a paradigm shift in algorithmic efficiency. Furthermore, the system demonstrated unprecedented accuracy in predicting protein folding patterns, achieving 99.9% accuracy in under 3 minutes for structures that traditionally required months of computational time.|The economic implications of this technological convergence are equally staggering, with market analysts projecting a $47 billion impact on the global economy by 2026, primarily driven by applications in drug discovery, financial modeling, and climate change mitigation strategies. The research also highlighted potential challenges in quantum error correction and decoherence, suggesting that maintaining quantum coherence beyond 100 milliseconds remains a critical obstacle for scaling these systems to more complex applications.`
    }
  };

  const mcqQuestions = [
    // Easy Questions
    {
      level: "easy",
      questions: [
        {
          question: "What is the most efficient way to organize large datasets?",
          options: [
            "Random arrangement",
            "Alphabetical order",
            "Categorical grouping with clear labeling",
            "By date only"
          ],
          correct: "Categorical grouping with clear labeling"
        },
        {
          question: "Which formula is used to calculate percentage in Excel?",
          options: [
            "=SUM(value/total)",
            "=(value/total)*100",
            "=PERCENTAGE(value,total)",
            "=DIV(value,total)"
          ],
          correct: "=(value/total)*100"
        }
      ]
    },
    // Medium Questions
    {
      level: "medium",
      questions: [
        {
          question: "In a database with multiple related tables, what is the most efficient way to update connected records?",
          options: [
            "Update each table individually",
            "Use cascading updates with proper foreign key constraints",
            "Delete and reinsert all records",
            "Ignore related tables"
          ],
          correct: "Use cascading updates with proper foreign key constraints"
        },
        {
          question: "When dealing with time-series data across multiple time zones, what is the best practice?",
          options: [
            "Store all times in local format",
            "Store in UTC and convert when displaying",
            "Ignore time zones completely",
            "Use only the system's time zone"
          ],
          correct: "Store in UTC and convert when displaying"
        }
      ]
    },
    // Hard Questions
    {
      level: "hard",
      questions: [
        {
          question: "In a distributed system handling millions of records per second, what is the most efficient way to maintain data consistency while maximizing throughput?",
          options: [
            "Use single-node processing",
            "Implement eventual consistency with conflict resolution",
            "Disable consistency checks",
            "Process all data synchronously"
          ],
          correct: "Implement eventual consistency with conflict resolution"
        },
        {
          question: "When implementing a real-time data processing pipeline with multiple data sources and varying data quality, what is the most robust approach to ensure data integrity?",
          options: [
            "Process all data synchronously",
            "Implement a multi-stage validation pipeline with error handling and recovery",
            "Skip validation for performance",
            "Store raw data only"
          ],
          correct: "Implement a multi-stage validation pipeline with error handling and recovery"
        }
      ]
    }
  ];

  const calculateMetrics = useCallback(() => {
    if (!startTime || !typedText) return;

    const timeElapsed = (Date.now() - startTime) / 1000;
    const words = typedText.trim().split(/\s+/).length;
    const newWpm = Math.round((words / timeElapsed) * 60);

    const characters = typedText.length;
    const correctCharacters = typedText.split('').filter(
      (char, index) => char === getCurrentText()[index]
    ).length;
    const newAccuracy = Math.round((correctCharacters / characters) * 100) || 100;

    setWpm(newWpm);
    setAccuracy(newAccuracy);
  }, [typedText, startTime]);

  const getCurrentText = () => {
    if (level === 'hard') {
      const sections = levels[level].text.split('|');
      return sections[currentTextIndex];
    }
    return levels[level].text;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "typing" && timeLeft > 0 && !testComplete) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (level === 'hard' && currentTextIndex < levels[level].text.split('|').length - 1) {
              setCurrentTextIndex(prev => prev + 1);
              setTypedText('');
              setStartTime(null);
              return levels[level].timeLimit / levels[level].text.split('|').length;
            }
            setTestComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft, testComplete, level, currentTextIndex]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "mcq" && mcqTimeLeft > 0 && !showResult) {
      timer = setInterval(() => {
        setMcqTimeLeft((prev) => {
          if (prev <= 1) {
            handleMcqTimeout();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, mcqTimeLeft, currentMcq]);

  useEffect(() => {
    if (typedText && !startTime) {
      setStartTime(Date.now());
    }
    if (startTime) {
      calculateMetrics();
    }
  }, [typedText, startTime, calculateMetrics]);

  const handleLevelSelect = (selectedLevel: "easy" | "medium" | "hard") => {
    setLevel(selectedLevel);
    setTimeLeft(levels[selectedLevel].timeLimit);
    setStep("typing");
    setCurrentTextIndex(0);
  };

  const handleTypingComplete = () => {
    if (level === 'hard' && currentTextIndex < levels[level].text.split('|').length - 1) {
      setCurrentTextIndex(prev => prev + 1);
      setTypedText('');
      setStartTime(null);
      setTimeLeft(levels[level].timeLimit / levels[level].text.split('|').length);
    } else {
      setTestComplete(true);
      calculateMetrics();
      setTimeout(() => {
        setStep("mcq");
        setMcqTimeLeft(30);
      }, 2000);
    }
  };

  const getCurrentLevelQuestions = () => {
    return mcqQuestions.find(q => q.level === level)?.questions || [];
  };

  const handleMcqAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    const currentLevelQuestions = getCurrentLevelQuestions();

    if (currentMcq < currentLevelQuestions.length - 1) {
      setCurrentMcq(prev => prev + 1);
      setMcqTimeLeft(30);
    } else {
      const typingScore = Math.min(
        ((wpm / levels[level].requiredWPM) * 0.5 + (accuracy / levels[level].requiredAccuracy) * 0.5) * 100,
        100
      );
      
      const mcqScore = (newAnswers.filter(
        (ans, idx) => ans === currentLevelQuestions[idx].correct
      ).length / currentLevelQuestions.length) * 100;
      
      setScore(Math.round((typingScore * 0.6 + mcqScore * 0.4)));
      setShowResult(true);
    }
  };

  const handleMcqTimeout = () => {
    handleMcqAnswer("");
  };

  const handleRedirectToDashboard = () => {
    router.push("/freelancer/dashboard");
  };

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

  const getBadgeTitle = () => {
    switch (level) {
      case 'easy':
        return 'Entry Level Expert';
      case 'medium':
        return 'Intermediate Master';
      case 'hard':
        return 'Advanced Professional';
      default:
        return 'Achievement Badge';
    }
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
          {step === "level" ? (
            <Card className="p-8">
              <h1 className="text-2xl font-bold mb-6">Select Test Level</h1>
              <div className="grid gap-4">
                {Object.entries(levels).map(([key, value]) => (
                  <Button
                    key={key}
                    onClick={() => handleLevelSelect(key as "easy" | "medium" | "hard")}
                    className="h-auto p-6 flex flex-col items-start space-y-2"
                    variant={key === "hard" ? "destructive" : "default"}
                  >
                    <div className="flex items-center w-full justify-between">
                      <span className="text-lg font-semibold">{value.name}</span>
                      {key === "hard" && <AlertTriangle className="w-5 h-5" />}
                    </div>
                    <div className="text-sm opacity-80">
                      <div>Required WPM: {value.requiredWPM}</div>
                      <div>Required Accuracy: {value.requiredAccuracy}%</div>
                      <div>Time Limit: {value.timeLimit}s</div>
                      <div>Badge Threshold: {value.badgeThreshold}%</div>
                    </div>
                  </Button>
                ))}
              </div>
            </Card>
          ) : !showResult ? (
            <Card className="p-8">
              {step === "typing" ? (
                <>
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2">
                      Typing Test - {levels[level].name}
                    </h1>
                    <p className="text-muted-foreground">
                      Type the following text as accurately and quickly as possible.
                      {level === 'hard' && ` (Section ${currentTextIndex + 1} of ${levels[level].text.split('|').length})`}
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Timer className="w-4 h-4 text-muted-foreground" />
                          <span>{timeLeft}s</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-muted-foreground" />
                          <span>{wpm} WPM</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-muted-foreground" />
                          <span>{accuracy}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-secondary/50 rounded-lg mb-4">
                      <p className="font-mono text-muted-foreground">{getCurrentText()}</p>
                    </div>

                    <textarea
                      className="w-full h-40 p-4 rounded-lg border focus:ring-2 focus:ring-primary font-mono"
                      value={typedText}
                      onChange={(e) => setTypedText(e.target.value)}
                      disabled={testComplete}
                      placeholder="Start typing here..."
                    />

                    <Button
                      onClick={handleTypingComplete}
                      disabled={testComplete || typedText.length < 10}
                    >
                      {level === 'hard' && currentTextIndex < levels[level].text.split('|').length - 1
                        ? 'Next Section'
                        : 'Submit Typing Test'}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2">
                      Data Entry MCQ - {levels[level].name}
                    </h1>
                    <p className="text-muted-foreground">
                      Answer the following questions about data entry best practices.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Question {currentMcq + 1} of {getCurrentLevelQuestions().length}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Time left: {mcqTimeLeft}s
                      </span>
                    </div>

                    <Progress value={(mcqTimeLeft / 30) * 100} className="h-2" />

                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <h2 className="font-semibold mb-4">
                        {getCurrentLevelQuestions()[currentMcq].question}
                      </h2>
                      <div className="grid gap-3">
                        {getCurrentLevelQuestions()[currentMcq].options.map((option) => (
                          <Button
                            key={option}
                            variant="outline"
                            className="justify-start"
                            onClick={() => handleMcqAnswer(option)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Card>
          ) : (
            <motion.div
              variants={itemVariants}
              className="text-center space-y-6"
            >
              <Card className="p-8">
                <h1 className="text-3xl font-bold mb-4">Assessment Complete!</h1>
                <div className="text-6xl font-bold text-primary mb-4">
                  {score}%
                </div>
                {score >= levels[level].badgeThreshold && (
                  <div className="flex flex-col items-center space-y-4 mb-6">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Trophy className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-center">
                      <h2 className="text-xl font-semibold mb-2">{getBadgeTitle()}</h2>
                      <p className="text-muted-foreground">
                        Congratulations! You've earned the {getBadgeTitle()} badge.
                        This badge recognizes your exceptional skills in {levels[level].name} data entry tasks!
                      </p>
                    </div>
                  </div>
                )}
                <div className="space-y-2 mb-6">
                  <p className="text-muted-foreground">Level: {levels[level].name}</p>
                  <p className="text-muted-foreground">Typing Speed: {wpm} WPM</p>
                  <p className="text-muted-foreground">Accuracy: {accuracy}%</p>
                  <p className="text-muted-foreground">
                    MCQ Score: {Math.round((answers.filter(
                      (ans, idx) => ans === getCurrentLevelQuestions()[idx].correct
                    ).length / getCurrentLevelQuestions().length) * 100)}%
                  </p>
                </div>
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