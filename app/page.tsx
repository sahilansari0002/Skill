"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BriefcaseIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <motion.div
        className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Welcome to SkillFirst
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your gateway to professional freelancing. Connect with top talent and opportunities worldwide.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          <Card className="p-6 hover:shadow-lg transition-shadow group cursor-pointer">
            <motion.div
              className="flex flex-col items-center text-center space-y-4"
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push('/freelancer/signup')}
            >
              <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <BriefcaseIcon className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">I'm a Freelancer</h2>
              <p className="text-muted-foreground">
                Find work, showcase your skills, and connect with clients worldwide
              </p>
              <Button className="w-full">Get Started</Button>
            </motion.div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow group cursor-pointer">
            <motion.div
              className="flex flex-col items-center text-center space-y-4"
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push('/client/signup')}
            >
              <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <UserIcon className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">I'm a Client</h2>
              <p className="text-muted-foreground">
                Hire top talent, post projects, and grow your business
              </p>
              <Button className="w-full">Start Hiring</Button>
            </motion.div>
          </Card>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 text-center text-muted-foreground"
        >
          <p>Already have an account? <Button variant="link" className="text-primary">Sign In</Button></p>
        </motion.div>
      </motion.div>
    </div>
  );
}