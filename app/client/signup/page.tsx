"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ClientSignup() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    company: "",
    email: "",
    password: "",
    referralCode: ""
  });
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      if (!formData.company || !formData.email || !formData.password) {
        throw new Error("Please fill in all required fields");
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Password validation
      if (formData.password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      // Simulate account creation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate referral link
      const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const referralLink = `${window.location.origin}/signup?ref=${referralCode}`;

      toast({
        title: "Account created successfully!",
        description: "Welcome to SkillFirst. Your referral link has been generated.",
      });

      // Show referral link in a separate toast
      toast({
        title: "Your Referral Link",
        description: referralLink,
        duration: 10000,
      });

      // Redirect to dashboard
      router.push("/client/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
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
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold mb-2">Create a Client Account</h1>
                <p className="text-muted-foreground">Find and hire talented freelancers for your projects</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    placeholder="Enter your company name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Work Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="referral">Referral Code (Optional)</Label>
                  <Input
                    id="referral"
                    placeholder="Enter referral code"
                    value={formData.referralCode}
                    onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                  />
                </div>

                <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                By creating an account, you agree to our{" "}
                <Button variant="link" className="p-0 h-auto">Terms of Service</Button> and{" "}
                <Button variant="link" className="p-0 h-auto">Privacy Policy</Button>
              </p>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}