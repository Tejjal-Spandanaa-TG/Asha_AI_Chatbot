"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, AlertTriangle, Briefcase, Calendar, Users } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  status?: "sending" | "sent" | "error"
  feedback?: "positive" | "negative" | null
  category?: "job" | "event" | "mentorship" | "general"
}

interface ChatMessageProps {
  message: Message
  onFeedback?: (type: "positive" | "negative") => void
}

export function ChatMessage({ message, onFeedback }: ChatMessageProps) {
  const isUser = message.role === "user"

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getCategoryIcon = () => {
    switch (message.category) {
      case "job":
        return <Briefcase className="h-3 w-3" />
      case "event":
        return <Calendar className="h-3 w-3" />
      case "mentorship":
        return <Users className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="h-8 w-8 bg-purple-900">
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      )}

      <div className={cn("flex flex-col max-w-[80%]", isUser ? "items-end" : "items-start")}>
        <div className="flex items-center gap-2 mb-1 text-xs text-gray-500">
          <span>{isUser ? "You" : "Asha AI"}</span>
          <span>•</span>
          <span>{formatTimestamp(message.timestamp)}</span>
          {!isUser && message.category && getCategoryIcon()}
        </div>

        <Card
          className={cn(
            "px-4 py-3 text-sm",
            isUser ? "bg-purple-600 text-white border-purple-700" : "bg-gray-800 text-gray-100 border-gray-700",
            message.status === "error" && "border-red-600 bg-red-900/20",
          )}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>

          {message.status === "error" && (
            <div className="flex items-center gap-2 mt-2 text-red-400 text-xs">
              <AlertTriangle className="h-3 w-3" />
              <span>Failed to send message. Please try again.</span>
            </div>
          )}
        </Card>

        {!isUser && onFeedback && (
          <div className="flex items-center gap-1 mt-1">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-6 w-6 rounded-full",
                message.feedback === "positive" && "text-green-500 bg-green-900/20",
              )}
              onClick={() => onFeedback("positive")}
            >
              <ThumbsUp className="h-3 w-3" />
              <span className="sr-only">Helpful</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn("h-6 w-6 rounded-full", message.feedback === "negative" && "text-red-500 bg-red-900/20")}
              onClick={() => onFeedback("negative")}
            >
              <ThumbsDown className="h-3 w-3" />
              <span className="sr-only">Not helpful</span>
            </Button>
          </div>
        )}
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 bg-gray-700">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

