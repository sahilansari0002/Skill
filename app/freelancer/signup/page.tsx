"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FreelancerSignup() {
  const router = useRouter();
  const [experienceLevel, setExperienceLevel] = useState<string>("");

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

  const handleContinue = () => {
    if (experienceLevel === "new") {
      router.push("/freelancer/skill-test");
    } else {
      router.push("/freelancer/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <motion.div
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
          <Card className="p-8">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Join as a Freelancer</h1>
                <p className="text-muted-foreground">Tell us about your experience level</p>
              </div>

              <RadioGroup
                className="grid gap-4"
                value={experienceLevel}
                onValueChange={setExperienceLevel}
              >
                <Label
                  htmlFor="new"
                  className="cursor-pointer"
                >
                  <div className={`flex items-start space-x-4 p-4 rounded-lg border ${
                    experienceLevel === "new" ? "border-primary bg-primary/5" : "border-border"
                  }`}>
                    <RadioGroupItem value="new" id="new" className="mt-1" />
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        <span className="font-medium">New Freelancer</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        I'm new to freelancing and want to start my journey
                      </p>
                    </div>
                  </div>
                </Label>

                <Label
                  htmlFor="experienced"
                  className="cursor-pointer"
                >
                  <div className={`flex items-start space-x-4 p-4 rounded-lg border ${
                    experienceLevel === "experienced" ? "border-primary bg-primary/5" : "border-border"
                  }`}>
                    <RadioGroupItem value="experienced" id="experienced" className="mt-1" />
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <span className="font-medium">Experienced Freelancer</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        I have freelancing experience and want to find more work
                      </p>
                    </div>
                  </div>
                </Label>
              </RadioGroup>

              <Button
                className="w-full"
                size="lg"
                disabled={!experienceLevel}
                onClick={handleContinue}
              >
                Continue
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}