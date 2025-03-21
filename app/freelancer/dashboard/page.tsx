"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  BellDot,
  Briefcase,
  Clock,
  DollarSign,
  MessageSquare,
  Search,
  Star,
  TrendingUp,
  User,
  FileCheck,
  GraduationCap,
  Trophy,
  Pencil,
  Home,
  Settings,
  HelpCircle,
  X,
  Plus
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function FreelancerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [timeOnSite, setTimeOnSite] = useState(0);
  const [profileViews, setProfileViews] = useState(0);
  const [rate, setRate] = useState("");
  const [days, setDays] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New job matching your skills!", time: "1h ago" },
    { id: 2, text: "Your application was viewed", time: "2h ago" },
    { id: 3, text: "Complete your profile to get more jobs", time: "3h ago" }
  ]);
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    title: "Full Stack Developer",
    bio: "Experienced full stack developer with 5+ years of experience in web development and data management. Passionate about creating efficient and user-friendly solutions.",
    skills: ["React", "Node.js", "TypeScript", "Data Entry"]
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnSite(prev => prev + 1);
    }, 60000);

    const viewTimer = setInterval(() => {
      if (Math.random() > 0.7) {
        setProfileViews(prev => prev + 1);
      }
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(viewTimer);
    };
  }, []);

  const formatTimeOnSite = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const handleSignOut = () => {
    router.push("/freelancer/signup");
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const stats = [
    { icon: <DollarSign className="w-5 h-5" />, label: "Available Balance", value: "₹0" },
    { icon: <Star className="w-5 h-5" />, label: "Job Success Score", value: "Coming Soon", description: "First project guaranteed within 2 weeks!" },
    { icon: <Clock className="w-5 h-5" />, label: "Time Online", value: formatTimeOnSite(timeOnSite) },
    { icon: <TrendingUp className="w-5 h-5" />, label: "Profile Views", value: profileViews.toString() }
  ];

  const jobs = [
    {
      title: "React Landing Page Development",
      company: "TechStart Solutions",
      budget: "₹25,000",
      posted: "1h ago",
      description: "Need a modern, responsive landing page built with React and Next.js. Must include animations and be mobile-friendly.",
      requirements: ["React", "Next.js", "Tailwind CSS", "Responsive Design"],
      type: "Programming"
    },
    {
      title: "Data Entry Specialist Needed",
      company: "Global Data Corp",
      budget: "₹15,000",
      posted: "2h ago",
      description: "Looking for an experienced data entry specialist to handle large datasets with high accuracy.",
      requirements: ["Data Entry", "Excel", "Attention to Detail", "Fast Typing"],
      type: "Data Entry"
    },
    {
      title: "Landing Page Designer",
      company: "Creative Agency",
      budget: "₹20,000",
      posted: "3h ago",
      description: "Design and develop a modern landing page for a SaaS product.",
      requirements: ["UI/UX", "HTML/CSS", "JavaScript", "Design Skills"],
      type: "Design"
    },
    {
      title: "Full Stack Developer for E-commerce Platform",
      company: "ShopTech India",
      budget: "₹45,000",
      posted: "30m ago",
      description: "Looking for a full stack developer to build custom features for our e-commerce platform. Experience with payment integration required.",
      requirements: ["Node.js", "React", "MongoDB", "Payment Integration", "API Development"],
      type: "Programming"
    },
    {
      title: "Content Writer for Tech Blog",
      company: "TechBlog Media",
      budget: "₹20,000",
      posted: "4h ago",
      description: "Need an experienced content writer to create engaging technical articles and tutorials. Strong understanding of web development required.",
      requirements: ["Content Writing", "Technical Writing", "SEO", "Web Development Knowledge"],
      type: "Writing"
    }
  ];

  const skillTestResults = [
    {
      test: "Programming Skills",
      score: 92,
      completedDate: "2024-03-20",
      badge: "Skilled Developer"
    },
    {
      test: "Data Entry",
      score: 85,
      completedDate: "2024-03-19"
    }
  ];

  const recentApplications = [
    {
      jobTitle: "React Landing Page Development",
      company: "TechStart Solutions",
      appliedDate: "2024-03-20",
      status: "Under Review",
      proposedRate: "₹20,000",
      estimatedDays: 14
    },
    {
      jobTitle: "Data Entry Specialist",
      company: "Global Solutions Inc.",
      appliedDate: "2024-03-19",
      status: "Shortlisted",
      proposedRate: "₹500/hr",
      estimatedDays: 30
    }
  ];

  const handleApply = (job: any) => {
    if (!rate || !days || !coverLetter) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting your application.",
        variant: "destructive"
      });
      return;
    }

    const newApplication = {
      jobTitle: job.title,
      company: job.company,
      appliedDate: new Date().toISOString().split('T')[0],
      status: "Under Review",
      proposedRate: `₹${rate}`,
      estimatedDays: parseInt(days),
      coverLetter: coverLetter
    };
    
    setApplications(prev => [newApplication, ...prev]);
    toast({
      title: "Application Submitted",
      description: "Your application has been successfully submitted. You can track its status in the Recent Applications section.",
    });

    setRate("");
    setDays("");
    setCoverLetter("");
  };

  const handleProfileSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Settings page is coming soon!",
    });
  };

  const handleHelp = () => {
    toast({
      title: "Help Center",
      description: "Help center is coming soon!",
    });
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Navigation Bar */}
      <nav className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/freelancer/dashboard" className="text-xl font-bold hover:text-primary transition-colors">
                SkillFirst
              </Link>
              <div className="hidden md:flex space-x-4">
                <Button
                  variant={activeTab === "dashboard" ? "default" : "ghost"}
                  className="flex items-center"
                  onClick={() => setActiveTab("dashboard")}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Button
                  variant={activeTab === "jobs" ? "default" : "ghost"}
                  className="flex items-center"
                  onClick={() => setActiveTab("jobs")}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Jobs
                </Button>
                <Button
                  variant={activeTab === "messages" ? "default" : "ghost"}
                  className="flex items-center"
                  onClick={() => setActiveTab("messages")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Messages
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleSettings}
              >
                <Settings className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleHelp}
              >
                <HelpCircle className="w-5 h-5" />
              </Button>
              <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <BellDot className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Notifications</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-center justify-between p-3 hover:bg-secondary rounded-lg">
                        <p className="text-sm">{notification.text}</p>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={showProfile} onOpenChange={setShowProfile}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <div className="flex justify-between items-center">
                      <DialogTitle>Profile</DialogTitle>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </div>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center">
                          <User className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <div>
                          {isEditing ? (
                            <div className="space-y-2">
                              <Input
                                value={profileData.name}
                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                              />
                              <Input
                                value={profileData.title}
                                onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                              />
                            </div>
                          ) : (
                            <>
                              <h2 className="text-xl font-semibold">{profileData.name}</h2>
                              <p className="text-muted-foreground">{profileData.title}</p>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Badges & Achievements</Label>
                        <div className="flex flex-wrap gap-3">
                          {skillTestResults.map((result, index) => (
                            result.score >= 90 && (
                              <div key={index} className="flex items-center space-x-2 bg-primary/10 rounded-full px-3 py-1">
                                <Trophy className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">{result.badge}</span>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Skills</Label>
                        <div className="flex flex-wrap gap-2">
                          {profileData.skills.map((skill, index) => (
                            <div key={index} className="flex items-center px-2 py-1 bg-secondary rounded-full text-sm">
                              {skill}
                              {isEditing && (
                                <button
                                  onClick={() => handleRemoveSkill(skill)}
                                  className="ml-2 text-destructive hover:text-destructive/80"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          ))}
                          {isEditing && (
                            <div className="flex gap-2">
                              <Input
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Add new skill"
                                className="w-32"
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleAddSkill}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Skill Test Results</Label>
                        <div className="space-y-2">
                          {skillTestResults.map((result, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-sm">{result.test}</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">{result.score}%</span>
                                {result.score >= 90 && (
                                  <Trophy className="w-4 h-4 text-primary" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Bio</Label>
                        {isEditing ? (
                          <Textarea
                            value={profileData.bio}
                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground">{profileData.bio}</p>
                        )}
                      </div>

                      {isEditing && (
                        <Button className="w-full" onClick={handleProfileSave}>
                          Save Changes
                        </Button>
                      )}

                      <div className="space-y-2">
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={handleSignOut}
                        >
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </nav>

      <motion.div
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {activeTab === "dashboard" ? (
          <>
            <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">Welcome back, {profileData.name}!</h1>
                <p className="text-muted-foreground">Let's find your next opportunity</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <Card key={stat.label} className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      {stat.description && (
                        <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <Card className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-grow relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      className="pl-10"
                      placeholder="Search for jobs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button className="flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Find Work
                  </Button>
                </div>
              </Card>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="md:col-span-2">
                <Tabs defaultValue="jobs" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="jobs" className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Available Jobs
                    </TabsTrigger>
                    <TabsTrigger value="applications" className="flex items-center">
                      <FileCheck className="w-4 h-4 mr-2" />
                      Recent Applications
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="jobs">
                    <Card className="p-6">
                      <div className="space-y-6">
                        {filteredJobs.map((job, index) => (
                          <div
                            key={index}
                            className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold">{job.title}</h3>
                                <p className="text-sm text-muted-foreground">{job.company}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{job.budget}</p>
                                <p className="text-sm text-muted-foreground">{job.posted}</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {job.requirements.map((req, idx) => (
                                <span key={idx} className="text-xs bg-secondary px-2 py-1 rounded-full">
                                  {req}
                                </span>
                              ))}
                            </div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  onClick={() => setSelectedJob(job)}
                                >
                                  Apply Now
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Apply for {job.title}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label>Your Rate (₹)</Label>
                                    <Input 
                                      type="number" 
                                      placeholder="Enter your rate"
                                      value={rate}
                                      onChange={(e) => setRate(e.target.value)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Expected Completion Time (days)</Label>
                                    <Input 
                                      type="number" 
                                      placeholder="Enter number of days"
                                      value={days}
                                      onChange={(e) => setDays(e.target.value)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Cover Letter</Label>
                                    <Textarea
                                      className="min-h-[100px]"
                                      placeholder="Why are you the best fit for this role?"
                                      value={coverLetter}
                                      onChange={(e) => setCoverLetter(e.target.value)}
                                    />
                                  </div>
                                  <Button 
                                    className="w-full"
                                    onClick={() => handleApply(job)}
                                  >
                                    Submit Application
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="applications">
                    <Card className="p-6">
                      <div className="space-y-6">
                        {[...applications, ...recentApplications].map((application, index) => (
                          <div
                            key={index}
                            className="p-4 rounded-lg border border-border"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold">{application.jobTitle}</h3>
                                <p className="text-sm text-muted-foreground">{application.company}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{application.proposedRate}</p>
                                <p className="text-sm text-muted-foreground">
                                  Applied on {application.appliedDate}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <span className="text-sm">
                                Estimated: {application.estimatedDays} days
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                application.status === "Shortlisted" 
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}>
                                {application.status}
                              </span>
                            </div>
                            {application.coverLetter && (
                              <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
                                <p className="text-sm text-muted-foreground">{application.coverLetter}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>

              <motion.div variants={itemVariants} className="md:col-span-1 space-y-6">
                <Card className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <GraduationCap className="w-5 h-5" />
                    <h2 className="text-xl font-semibold">Skills & Tests</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Data Entry Test</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full">
                        <div className="w-[85%] h-full bg-primary rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Programming Skills</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full">
                        <div className="w-[92%] h-full bg-primary rounded-full" />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <BarChart3 className="w-5 h-5" />
                    <h2 className="text-xl font-semibold">Activity</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Profile Completion</p>
                      <div className="w-full h-2 bg-secondary rounded-full">
                        <div className="w-[85%] h-full bg-primary rounded-full" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">85% - Add a portfolio to reach 100%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Proposal Success Rate</p>
                      <div className="w-full h-2 bg-secondary rounded-full">
                        <div className="w-[70%] h-full bg-primary rounded-full" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">70% acceptance rate</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </>
        ) : activeTab === "jobs" ? (
          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <div className="space-y-6">
                {filteredJobs.map((job, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{job.budget}</p>
                        <p className="text-sm text-muted-foreground">{job.posted}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requirements.map((req, idx) => (
                        <span key={idx} className="text-xs bg-secondary px-2 py-1 rounded-full">
                          {req}
                        </span> ))}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedJob(job)}
                        >
                          Apply Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Apply for {job.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Your Rate (₹)</Label>
                            <Input 
                              type="number" 
                              placeholder="Enter your rate"
                              value={rate}
                              onChange={(e) => setRate(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Expected Completion Time (days)</Label>
                            <Input 
                              type="number" 
                              placeholder="Enter number of days"
                              value={days}
                              onChange={(e) => setDays(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Cover Letter</Label>
                            <Textarea
                              className="min-h-[100px]"
                              placeholder="Why are you the best fit for this role?"
                              value={coverLetter}
                              onChange={(e) => setCoverLetter(e.target.value)}
                            />
                          </div>
                          <Button 
                            className="w-full"
                            onClick={() => handleApply(job)}
                          >
                            Submit Application
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Messages</h2>
              <p className="text-muted-foreground">No messages yet.</p>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}