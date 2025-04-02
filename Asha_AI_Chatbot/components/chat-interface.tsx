"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Loader2, Send, Calendar, Briefcase, Users } from "lucide-react"
import { ChatMessage } from "@/components/chat-message"
import { SuggestedPrompts } from "@/components/suggested-prompts"
import { FeedbackDialog } from "@/components/feedback-dialog"
import { JobCard } from "@/components/job-card"
import { EventCard } from "@/components/event-card"
import { MentorCard } from "@/components/mentor-card"

type Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  status?: "sending" | "sent" | "error"
  feedback?: "positive" | "negative" | null
  category?: "job" | "event" | "mentorship" | "general"
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi, I'm Asha, your AI assistant for JobsForHer Foundation. I can help you explore women's career opportunities, job listings, community events, mentorship programs, and more. How can I assist you today?",
      timestamp: new Date(),
      category: "general",
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(inputValue),
        timestamp: new Date(),
        category: getCategoryFromQuery(inputValue),
      }

      setMessages((prev) => [...prev, responseMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFeedback = (messageId: string, type: "positive" | "negative") => {
    if (type === "negative") {
      setSelectedMessageId(messageId)
      setFeedbackDialogOpen(true)
    } else {
      setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, feedback: type } : msg)))
    }
  }

  const handleFeedbackSubmit = (messageId: string, feedback: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, feedback: "negative" } : msg)))
    setFeedbackDialogOpen(false)
    // In a real app, you would send this feedback to your backend
    console.log(`Feedback for message ${messageId}: ${feedback}`)
  }

  const handlePromptSelect = (prompt: string) => {
    setInputValue(prompt)
    inputRef.current?.focus()
  }

  // Mock function to generate responses based on input
  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("job") || lowerQuery.includes("career") || lowerQuery.includes("work")) {
      return "I found several job opportunities that might interest you:\n\n1. Senior Product Manager at TechCorp - Remote\n2. Marketing Director at GrowthCo - Bangalore\n3. UX Designer at DesignHub - Hybrid\n4. Data Scientist at AnalyticsPro - Remote\n5. HR Manager at GlobalHR - Mumbai\n\nWould you like more details about any of these positions?"
    } else if (lowerQuery.includes("event") || lowerQuery.includes("workshop") || lowerQuery.includes("webinar")) {
      return "Here are upcoming events from JobsForHer Foundation:\n\n1. Women in Tech Leadership Summit - June 15, 2023\n2. Resume Building Workshop - May 28, 2023\n3. Networking Mixer for Women Professionals - June 3, 2023\n4. Work-Life Balance Webinar - June 10, 2023\n5. Career Transition Masterclass - June 20, 2023\n\nWould you like to register for any of these events?"
    } else if (lowerQuery.includes("mentor") || lowerQuery.includes("guidance") || lowerQuery.includes("advice")) {
      return "Our mentorship program connects you with experienced professionals across various industries. Currently, we have mentors available in:\n\n- Technology & Software Development\n- Marketing & Communications\n- Finance & Investment\n- Leadership & Management\n- Healthcare & Life Sciences\n- Creative Arts & Design\n\nWhat area are you looking for mentorship in?"
    } else {
      return "I'm here to help you with information about women's career opportunities, job listings, community events, and mentorship programs. Could you please specify what you're looking for?"
    }
  }

  // Determine message category based on query
  const getCategoryFromQuery = (query: string): "job" | "event" | "mentorship" | "general" => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("job") || lowerQuery.includes("career") || lowerQuery.includes("work")) {
      return "job"
    } else if (lowerQuery.includes("event") || lowerQuery.includes("workshop") || lowerQuery.includes("webinar")) {
      return "event"
    } else if (lowerQuery.includes("mentor") || lowerQuery.includes("guidance") || lowerQuery.includes("advice")) {
      return "mentorship"
    } else {
      return "general"
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      <Tabs defaultValue="chat" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="chat" className="data-[state=active]:bg-purple-600">
              Chat
            </TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-purple-600">
              <Briefcase className="w-4 h-4 mr-2" />
              Jobs
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-purple-600">
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="mentors" className="data-[state=active]:bg-purple-600">
              <Users className="w-4 h-4 mr-2" />
              Mentors
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="mt-0 flex flex-col h-full">
          <Card className="flex-1 bg-gray-900 border-gray-800 mb-4 p-4 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    onFeedback={(type) => handleFeedback(message.id, type)}
                  />
                ))}
                {isLoading && (
                  <div className="flex items-center gap-3 text-gray-400 py-2">
                    <Avatar className="h-8 w-8 bg-purple-900">
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Asha is thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </Card>

          <div className="flex flex-col gap-4">
            <SuggestedPrompts onSelect={handlePromptSelect} />

            <div className="flex gap-2">
              <Input
                ref={inputRef}
                placeholder="Ask about jobs, events, mentorship programs..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="mt-0">
          <Card className="bg-gray-900 border-gray-800 p-4">
            <h2 className="text-xl font-semibold text-white mb-4">Featured Job Opportunities</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <JobCard
                title="Senior Product Manager"
                company="TechCorp"
                location="Remote"
                type="Full-time"
                salary="₹18-25 LPA"
                skills={["Product Strategy", "Agile", "User Research"]}
                postedDate="2 days ago"
                description="Lead product development for our SaaS platform. Collaborate with engineering, design, and marketing teams to define product roadmap and drive execution."
              />
              <JobCard
                title="Marketing Director"
                company="GrowthCo"
                location="Bangalore"
                type="Full-time"
                salary="₹20-30 LPA"
                skills={["Digital Marketing", "Team Leadership", "Brand Strategy"]}
                postedDate="1 week ago"
                description="Oversee all marketing initiatives to drive business growth. Develop and implement comprehensive marketing strategies across digital and traditional channels."
              />
              <JobCard
                title="UX Designer"
                company="DesignHub"
                location="Hybrid"
                type="Full-time"
                salary="₹12-18 LPA"
                skills={["Figma", "User Testing", "Wireframing"]}
                postedDate="3 days ago"
                description="Create intuitive user experiences for web and mobile applications. Conduct user research, develop wireframes, and collaborate with developers to implement designs."
              />
              <JobCard
                title="Finance Manager"
                company="GlobalFinance"
                location="Mumbai"
                type="Full-time"
                salary="₹16-22 LPA"
                skills={["Financial Analysis", "Budgeting", "Forecasting"]}
                postedDate="5 days ago"
                description="Manage financial planning, budgeting, and analysis. Prepare financial reports, oversee accounting operations, and ensure compliance with regulations."
              />
              <JobCard
                title="Data Scientist"
                company="AnalyticsPro"
                location="Remote"
                type="Full-time"
                salary="₹15-22 LPA"
                skills={["Python", "Machine Learning", "SQL", "Data Visualization"]}
                postedDate="1 day ago"
                description="Develop machine learning models to extract insights from large datasets. Work with cross-functional teams to implement data-driven solutions for business problems."
              />
              <JobCard
                title="HR Manager"
                company="GlobalHR"
                location="Mumbai"
                type="Full-time"
                salary="₹14-20 LPA"
                skills={["Recruitment", "Employee Relations", "HR Policies"]}
                postedDate="4 days ago"
                description="Lead HR operations including recruitment, onboarding, performance management, and employee engagement. Develop and implement HR policies and procedures."
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="mt-0">
          <Card className="bg-gray-900 border-gray-800 p-4">
            <h2 className="text-xl font-semibold text-white mb-4">Upcoming Events</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <EventCard
                title="Women in Tech Leadership Summit"
                date="June 15, 2023"
                time="10:00 AM - 4:00 PM"
                location="Bangalore"
                type="In-person"
                speakers={[
                  "Priya Sharma, CTO at TechInnovate",
                  "Anita Desai, VP Engineering at CloudSystems",
                  "Meera Patel, Director of Product at GlobalTech",
                ]}
                description="Join us for a day of inspiring talks, panel discussions, and networking opportunities focused on women's leadership in the technology sector. Learn from successful women leaders about navigating challenges and advancing your career."
              />
              <EventCard
                title="Resume Building Workshop"
                date="May 28, 2023"
                time="2:00 PM - 4:00 PM"
                location="Online"
                type="Virtual"
                speakers={["Meera Patel, HR Director at TalentFirst", "Rahul Singh, Career Coach"]}
                description="Learn how to craft a compelling resume that highlights your skills and experiences effectively. This workshop will cover resume formats, content optimization, and strategies to pass ATS screening."
              />
              <EventCard
                title="Networking Mixer for Women Professionals"
                date="June 3, 2023"
                time="6:00 PM - 8:00 PM"
                location="Mumbai"
                type="In-person"
                speakers={["Various Industry Leaders from Finance, Tech, and Healthcare"]}
                description="Expand your professional network at this casual mixer designed for women across industries. Connect with peers, mentors, and potential employers in a supportive environment."
              />
              <EventCard
                title="Work-Life Balance Webinar"
                date="June 10, 2023"
                time="11:00 AM - 12:30 PM"
                location="Online"
                type="Virtual"
                speakers={["Dr. Leela Rao, Wellness Coach", "Sanjana Kapoor, HR Director"]}
                description="Discover practical strategies for maintaining work-life balance in today's demanding professional environment. Learn techniques for setting boundaries, managing stress, and prioritizing self-care."
              />
              <EventCard
                title="Career Transition Masterclass"
                date="June 20, 2023"
                time="3:00 PM - 5:00 PM"
                location="Online"
                type="Virtual"
                speakers={["Anjali Menon, Career Transition Specialist", "Vikram Desai, Industry Expert"]}
                description="Planning a career change? This masterclass will guide you through assessing your transferable skills, identifying new opportunities, and positioning yourself effectively for a successful transition."
              />
              <EventCard
                title="Financial Independence for Women"
                date="June 25, 2023"
                time="10:00 AM - 12:00 PM"
                location="Delhi"
                type="In-person"
                speakers={["Nisha Sharma, Financial Advisor", "Priya Jain, Investment Specialist"]}
                description="Take control of your financial future with this workshop covering investment strategies, retirement planning, and building long-term wealth. Designed specifically for women at all career stages."
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="mentors" className="mt-0">
          <Card className="bg-gray-900 border-gray-800 p-4">
            <h2 className="text-xl font-semibold text-white mb-4">Mentorship Programs</h2>
            <div className="grid gap-6">
              <MentorCard
                category="Technology & Software Development"
                description="Connect with experienced tech leaders who can guide you through career growth in software development, data science, cybersecurity, and more."
                skills={["Software Engineering", "Data Science", "Cybersecurity", "Product Management"]}
                mentors={[
                  {
                    name: "Priya Sharma",
                    role: "CTO at TechInnovate",
                    experience: "15+ years",
                    expertise: "Software Architecture, Leadership, Cloud Computing",
                  },
                  {
                    name: "Rahul Mehta",
                    role: "Senior Engineering Manager at CloudTech",
                    experience: "12+ years",
                    expertise: "Backend Development, Team Management, Microservices",
                  },
                  {
                    name: "Anita Desai",
                    role: "Data Science Director at AnalyticsPro",
                    experience: "10+ years",
                    expertise: "Machine Learning, AI Ethics, Data Strategy",
                  },
                ]}
              />

              <MentorCard
                category="Marketing & Communications"
                description="Learn from marketing professionals with expertise in digital marketing, content strategy, brand management, and public relations."
                skills={["Digital Marketing", "Content Strategy", "Brand Management", "Public Relations"]}
                mentors={[
                  {
                    name: "Deepa Krishnan",
                    role: "Marketing Director at GlobalBrands",
                    experience: "14+ years",
                    expertise: "Brand Strategy, Digital Transformation, Marketing Analytics",
                  },
                  {
                    name: "Vikram Singh",
                    role: "Content Head at MediaFirst",
                    experience: "9+ years",
                    expertise: "Content Strategy, Storytelling, SEO",
                  },
                  {
                    name: "Shalini Kapoor",
                    role: "PR Manager at ReputeFirst",
                    experience: "11+ years",
                    expertise: "Media Relations, Crisis Management, Corporate Communications",
                  },
                ]}
              />

              <MentorCard
                category="Leadership & Management"
                description="Get guidance from experienced leaders on career advancement, team management, executive presence, and leadership skills."
                skills={["Executive Leadership", "Team Management", "Career Advancement", "Work-Life Balance"]}
                mentors={[
                  {
                    name: "Anjali Menon",
                    role: "CEO at GrowthVentures",
                    experience: "18+ years",
                    expertise: "Strategic Leadership, Business Transformation, Executive Coaching",
                  },
                  {
                    name: "Rajiv Khanna",
                    role: "COO at GlobalOperations",
                    experience: "16+ years",
                    expertise: "Operational Excellence, Change Management, Team Building",
                  },
                  {
                    name: "Meera Patel",
                    role: "HR Director at TalentFirst",
                    experience: "13+ years",
                    expertise: "Talent Development, Organizational Culture, Leadership Training",
                  },
                ]}
              />

              <MentorCard
                category="Finance & Investment"
                description="Receive guidance on financial career paths, investment strategies, and advancing in the finance sector."
                skills={["Financial Analysis", "Investment Banking", "Wealth Management", "FinTech"]}
                mentors={[
                  {
                    name: "Nisha Sharma",
                    role: "Investment Director at CapitalGrowth",
                    experience: "15+ years",
                    expertise: "Investment Strategy, Portfolio Management, Market Analysis",
                  },
                  {
                    name: "Arjun Kapoor",
                    role: "CFO at TechGlobal",
                    experience: "17+ years",
                    expertise: "Corporate Finance, Financial Planning, Risk Management",
                  },
                  {
                    name: "Priya Jain",
                    role: "FinTech Lead at InnovateFinance",
                    experience: "9+ years",
                    expertise: "Digital Banking, Blockchain, Financial Innovation",
                  },
                ]}
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <FeedbackDialog
        open={feedbackDialogOpen}
        onOpenChange={setFeedbackDialogOpen}
        onSubmit={(feedback) => selectedMessageId && handleFeedbackSubmit(selectedMessageId, feedback)}
      />
    </div>
  )
}

