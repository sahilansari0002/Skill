"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MessageSquare,
  Search,
  ChevronDown,
  Send,
  Paperclip,
  User,
  Building2,
  MoreHorizontal,
  Phone,
  Video,
  Sparkles
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isAI?: boolean;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  avatar?: string;
  isClient?: boolean;
  isActive?: boolean;
}

export default function MessagesPage() {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      name: "Sarah Chen",
      lastMessage: "I've reviewed your proposal for the landing page project.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      unread: 2,
      isClient: true,
      isActive: true
    },
    {
      id: "2",
      name: "TechCorp Solutions",
      lastMessage: "When can you start on the React project?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unread: 0,
      isClient: true
    },
    {
      id: "3",
      name: "Michael Kumar",
      lastMessage: "Thanks for your help with the UI design!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unread: 0
    }
  ]);
  
  const [activeConversation, setActiveConversation] = useState<string>("1");
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    "1": [
      {
        id: "1-1",
        sender: "Sarah Chen",
        content: "Hi there! I'm interested in your proposal for our landing page redesign project.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
      },
      {
        id: "1-2",
        sender: "me",
        content: "Hello Sarah! Thank you for considering my proposal. I'm excited about the opportunity to work on your landing page.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5)
      },
      {
        id: "1-3",
        sender: "Sarah Chen",
        content: "Your portfolio looks impressive. I particularly liked the e-commerce site you designed last month.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60)
      },
      {
        id: "1-4",
        sender: "Sarah Chen",
        content: "I've reviewed your proposal for the landing page project. Can we discuss your approach to responsive design?",
        timestamp: new Date(Date.now() - 1000 * 60 * 5)
      }
    ],
    "2": [
      {
        id: "2-1",
        sender: "TechCorp Solutions",
        content: "We're looking for a React developer for our new project.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
      },
      {
        id: "2-2",
        sender: "me",
        content: "I'd be interested in learning more about the project requirements.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.5)
      },
      {
        id: "2-3",
        sender: "TechCorp Solutions",
        content: "Great! We're building a dashboard for data visualization. When can you start on the React project?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
      }
    ],
    "3": [
      {
        id: "3-1",
        sender: "Michael Kumar",
        content: "Hey, I need some help with a UI design for my portfolio.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)
      },
      {
        id: "3-2",
        sender: "me",
        content: "Sure, I'd be happy to help. What kind of portfolio are you building?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
      },
      {
        id: "3-3",
        sender: "Michael Kumar",
        content: "A photography portfolio. I want it to be minimal but impactful.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.5)
      },
      {
        id: "3-4",
        sender: "me",
        content: "I've sent you some mockups for the portfolio design. Let me know what you think!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1)
      },
      {
        id: "3-5",
        sender: "Michael Kumar",
        content: "Thanks for your help with the UI design!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
      }
    ]
  });
  
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [useAI, setUseAI] = useState(true);
  const [isAITyping, setIsAITyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
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

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const messageId = `${activeConversation}-${messages[activeConversation].length + 1}`;
    const newMsg: Message = {
      id: messageId,
      sender: "me",
      content: newMessage,
      timestamp: new Date()
    };
    
    // Update messages
    const updatedMessages = {
      ...messages,
      [activeConversation]: [...messages[activeConversation], newMsg]
    };
    setMessages(updatedMessages);
    setNewMessage("");
    
    // Update conversation last message
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation) {
        return {
          ...conv,
          lastMessage: newMessage,
          timestamp: new Date(),
          unread: 0
        };
      }
      return conv;
    });
    setConversations(updatedConversations);
    
    // If AI assistant is enabled, generate a response
    if (useAI) {
      setIsAITyping(true);
      try {
        const aiResponse = await generateAIResponse(newMessage, activeConversation);
        setTimeout(() => {
          const aiMessageId = `${activeConversation}-${updatedMessages[activeConversation].length + 1}`;
          const aiMsg: Message = {
            id: aiMessageId,
            sender: conversations.find(c => c.id === activeConversation)?.name || "Assistant",
            content: aiResponse,
            timestamp: new Date(),
            isAI: true
          };
          
          setMessages(prev => ({
            ...prev,
            [activeConversation]: [...prev[activeConversation], aiMsg]
          }));
          
          setConversations(prev => prev.map(conv => {
            if (conv.id === activeConversation) {
              return {
                ...conv,
                lastMessage: aiResponse,
                timestamp: new Date()
              };
            }
            return conv;
          }));
          
          setIsAITyping(false);
        }, 1500);
      } catch (error) {
        console.error("Error generating AI response:", error);
        setIsAITyping(false);
        toast({
          title: "AI Assistant Error",
          description: "Could not generate a response. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const generateAIResponse = async (message: string, conversationId: string): Promise<string> => {
    // In a real implementation, this would call the Gemini API
    // For now, we'll simulate responses based on message content
    
    // This is where you would integrate the Gemini API
    // const API_KEY = "YOUR_GEMINI_API_KEY";
    // const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     contents: [{ role: "user", parts: [{ text: message }] }],
    //     generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 1024 }
    //   })
    // });
    // const data = await response.json();
    // return data.candidates[0].content.parts[0].text;
    
    // For now, simulate responses based on keywords
    if (message.toLowerCase().includes("proposal") || message.toLowerCase().includes("project")) {
      return "I've reviewed your message regarding the proposal. Your approach looks promising! Could you provide more details about your timeline and specific deliverables? I'd like to ensure we're aligned on expectations before proceeding.";
    } else if (message.toLowerCase().includes("payment") || message.toLowerCase().includes("budget")) {
      return "Thank you for discussing the budget. Our payment terms are net-15 after milestone completion. We can set up milestone payments through the platform to ensure a smooth process. Does this payment structure work for you?";
    } else if (message.toLowerCase().includes("design") || message.toLowerCase().includes("ui")) {
      return "Your design ideas sound excellent! I particularly appreciate your focus on user experience. For our brand, we prefer a clean, modern aesthetic with our primary colors (blue #1a73e8 and gray #f8f9fa). Could you create a mockup based on these guidelines?";
    } else if (message.toLowerCase().includes("deadline") || message.toLowerCase().includes("timeline")) {
      return "Regarding the timeline, we're aiming to launch by the end of next month. Can you confirm if you'll be able to complete all deliverables by the 25th? This would give us a week for final revisions and testing before the public launch.";
    } else {
      return "Thank you for your message. I'll review it and get back to you shortly with more detailed feedback. In the meantime, please feel free to share any additional information that might help move our discussion forward.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <motion.div
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Communicate with clients and freelancers</p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Conversations List */}
          <Card className="p-4 md:col-span-1 h-[calc(100vh-200px)] flex flex-col">
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                className="pl-10"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="overflow-y-auto flex-grow">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                    activeConversation === conversation.id
                      ? "bg-primary/10"
                      : "hover:bg-secondary"
                  }`}
                  onClick={() => {
                    setActiveConversation(conversation.id);
                    // Mark as read
                    setConversations(
                      conversations.map((c) =>
                        c.id === conversation.id ? { ...c, unread: 0 } : c
                      )
                    );
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar>
                        {conversation.avatar ? (
                          <img src={conversation.avatar} alt={conversation.name} />
                        ) : conversation.isClient ? (
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Building2 className="h-5 w-5" />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5" />
                          </div>
                        )}
                      </Avatar>
                      {conversation.isActive && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-medium truncate">{conversation.name}</h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {formatTime(conversation.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread > 0 && (
                      <div className="ml-2 bg-primary text-primary-foreground rounded-full h-5 min-w-5 flex items-center justify-center text-xs px-1">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="p-4 md:col-span-2 h-[calc(100vh-200px)] flex flex-col">
            {activeConversation && (
              <>
                {/* Chat Header */}
                <div className="flex justify-between items-center pb-4 border-b">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      {conversations.find(c => c.id === activeConversation)?.isClient ? (
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-5 w-5" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5" />
                        </div>
                      )}
                    </Avatar>
                    <div>
                      <h3 className="font-medium">
                        {conversations.find(c => c.id === activeConversation)?.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {conversations.find(c => c.id === activeConversation)?.isActive 
                          ? "Online" 
                          : "Last seen recently"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Search in Conversation</DropdownMenuItem>
                        <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Block Contact</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-grow overflow-y-auto py-4 space-y-4">
                  {messages[activeConversation].map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] ${
                          message.sender === "me"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary"
                        } rounded-lg px-4 py-2 shadow-sm`}
                      >
                        {message.isAI && (
                          <div className="flex items-center text-xs mb-1 text-primary-foreground/70">
                            <Sparkles className="h-3 w-3 mr-1" />
                            <span>AI Assistant</span>
                          </div>
                        )}
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70 text-right">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-secondary rounded-lg px-4 py-2 shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "600ms" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  {isAITyping && (
                    <div className="flex justify-start">
                      <div className="bg-secondary rounded-lg px-4 py-2 shadow-sm">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "600ms" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* AI Assistant Toggle */}
                <div className="flex items-center space-x-2 mb-2">
                  <Switch
                    id="ai-assistant"
                    checked={useAI}
                    onCheckedChange={setUseAI}
                  />
                  <Label htmlFor="ai-assistant" className="flex items-center text-sm">
                    <Sparkles className="h-4 w-4 mr-1 text-primary" />
                    AI Assistant
                  </Label>
                </div>

                {/* Message Input */}
                <div className="border-t pt-4">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Textarea
                      className="flex-grow min-h-[60px] max-h-[120px]"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}