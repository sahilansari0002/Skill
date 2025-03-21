"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BriefcaseIcon,
  Users,
  Clock,
  Bell,
  MessageSquare,
  Search,
  ChevronDown,
  Phone,
  CheckCircle2,
  Building2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function ClientDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const [jobPostData, setJobPostData] = useState({
    title: "",
    description: "",
    budget: "",
    rateType: "fixed",
    skills: []
  });
  const [postedJobs, setPostedJobs] = useState<any[]>([]);
  const [showProfile, setShowProfile] = useState(false);

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

  const verifyPhone = () => {
    if (otp === "123456") {
      setIsPhoneVerified(true);
      toast({
        title: "Phone Verified",
        description: "Your phone number has been verified successfully.",
      });
      setShowPhoneVerification(false);
      handlePostJobAfterVerification();
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP.",
        variant: "destructive"
      });
    }
  };

  const handlePostJobAfterVerification = () => {
    const newJob = {
      ...jobPostData,
      id: Date.now(),
      status: "Active",
      proposals: 0,
      datePosted: new Date().toISOString(),
    };

    setPostedJobs([newJob, ...postedJobs]);
    setShowJobDialog(false);
    setJobPostData({
      title: "",
      description: "",
      budget: "",
      rateType: "fixed",
      skills: []
    });

    toast({
      title: "Job Posted Successfully",
      description: "Your job has been posted. You'll be notified when skilled freelancers apply.",
    });
  };

  const handlePostJob = () => {
    if (!isPhoneVerified) {
      setShowPhoneVerification(true);
      return;
    }
    handlePostJobAfterVerification();
  };

  const handleNavigation = (section: string) => {
    switch (section) {
      case "jobPosts":
        setActiveTab("active");
        break;
      case "proposals":
        setActiveTab("proposals");
        break;
      case "postJob":
        setShowJobDialog(true);
        break;
      case "profile":
        setShowProfile(true);
        break;
      case "messages":
        router.push("/client/messages");
        break;
    }
  };

  const topFreelancers = [
    {
      name: "Sarah Chen",
      title: "Full Stack Developer",
      rating: 4.9,
      skills: ["React", "Node.js", "TypeScript"],
      hourlyRate: "₹2,500"
    },
    {
      name: "Michael Kumar",
      title: "UI/UX Designer",
      rating: 4.8,
      skills: ["Figma", "Adobe XD", "Web Design"],
      hourlyRate: "₹2,000"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <motion.div
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Navigation */}
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  Hire Talent <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleNavigation("jobPosts")}>
                  Job Posts
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("proposals")}>
                  Proposals
                </DropdownMenuItem>
                <DropdownMenuItem>Pending Offers</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  Find Freelancers <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleNavigation("postJob")}>
                  Post a Job
                </DropdownMenuItem>
                <DropdownMenuItem>Search Freelancers</DropdownMenuItem>
                <DropdownMenuItem>Hired Freelancers</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  Manage Work <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Your Contracts</DropdownMenuItem>
                <DropdownMenuItem>Time Sheets</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleNavigation("messages")}>
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleNavigation("profile")}>
              <Building2 className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="md:col-span-2">
            <Card className="p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Post a New Job</h2>
                <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <BriefcaseIcon className="mr-2 h-4 w-4" />
                      Post Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create a New Job Post</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Job Title</Label>
                        <Input
                          placeholder="E.g., Full Stack Developer Needed"
                          value={jobPostData.title}
                          onChange={(e) => setJobPostData({ ...jobPostData, title: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Job Description</Label>
                        <Textarea
                          placeholder="Describe your project requirements..."
                          value={jobPostData.description}
                          onChange={(e) => setJobPostData({ ...jobPostData, description: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Rate Type</Label>
                        <RadioGroup
                          value={jobPostData.rateType}
                          onValueChange={(value) => setJobPostData({ ...jobPostData, rateType: value })}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="fixed" id="fixed" />
                            <Label htmlFor="fixed">Fixed Rate</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="hourly" id="hourly" />
                            <Label htmlFor="hourly">Hourly Rate</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>Budget (₹)</Label>
                        <Input
                          type="number"
                          placeholder="Enter your budget"
                          value={jobPostData.budget}
                          onChange={(e) => setJobPostData({ ...jobPostData, budget: e.target.value })}
                        />
                      </div>

                      <Button className="w-full" onClick={handlePostJob}>
                        Post Job
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                <Input
                  className="w-full"
                  placeholder="Search for skills or job titles..."
                  prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                />
              </div>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="active">Active Jobs</TabsTrigger>
                <TabsTrigger value="proposals">Proposals</TabsTrigger>
                <TabsTrigger value="contracts">Contracts</TabsTrigger>
              </TabsList>

              <TabsContent value="active">
                <Card className="p-6">
                  {postedJobs.length > 0 ? (
                    <div className="space-y-4">
                      {postedJobs.map((job) => (
                        <div key={job.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">{job.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                Posted {new Date(job.datePosted).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">₹{job.budget}</p>
                              <p className="text-sm text-muted-foreground">{job.rateType} Rate</p>
                            </div>
                          </div>
                          <p className="text-sm mb-4">{job.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              {job.proposals} Proposals
                            </span>
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      No active jobs. Post your first job to get started!
                    </div>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="proposals">
                <Card className="p-6">
                  <div className="text-center text-muted-foreground">
                    No proposals yet.
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="contracts">
                <Card className="p-6">
                  <div className="text-center text-muted-foreground">
                    No active contracts.
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Top Skilled Freelancers</h3>
              <div className="space-y-4">
                {topFreelancers.map((freelancer, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{freelancer.name}</h4>
                        <p className="text-sm text-muted-foreground">{freelancer.title}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{freelancer.rating}</span>
                        <CheckCircle2 className="h-4 w-4 text-green-500 ml-1" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 my-2">
                      {freelancer.skills.map((skill, idx) => (
                        <span key={idx} className="text-xs bg-secondary px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">
                        {freelancer.hourlyRate}/hr
                      </span>
                      <Button variant="outline" size="sm">View Profile</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Phone Verification Dialog */}
        <Dialog open={showPhoneVerification} onOpenChange={setShowPhoneVerification}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verify Your Phone Number</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <Button onClick={() => toast({
                    title: "OTP Sent",
                    description: "Please check your phone for the verification code.",
                  })}>
                    Send OTP
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Enter OTP</Label>
                <Input
                  placeholder="Enter the 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={verifyPhone}>
                Verify
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Profile Dialog */}
        <Dialog open={showProfile} onOpenChange={setShowProfile}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Company Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-10 w-10" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">TechCorp Solutions</h2>
                  <p className="text-muted-foreground">Technology Services</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Company Description</Label>
                  <Textarea
                    placeholder="Tell freelancers about your company..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Input placeholder="e.g., Information Technology" />
                </div>

                <div className="space-y-2">
                  <Label>Company Size</Label>
                  <Input placeholder="e.g., 50-100 employees" />
                </div>

                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input placeholder="https://www.example.com" />
                </div>

                <Button className="w-full">Save Profile</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}