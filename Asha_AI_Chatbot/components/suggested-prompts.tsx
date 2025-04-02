"use client"

import { Button } from "@/components/ui/button"
import { Briefcase, Calendar, Users, Search } from "lucide-react"

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void
}

export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  const prompts = [
    {
      icon: <Briefcase className="h-3 w-3" />,
      text: "Show me job opportunities in tech",
    },
    {
      icon: <Calendar className="h-3 w-3" />,
      text: "What events are happening this month?",
    },
    {
      icon: <Users className="h-3 w-3" />,
      text: "How can I find a mentor in marketing?",
    },
    {
      icon: <Search className="h-3 w-3" />,
      text: "What resources do you have for career transitions?",
    },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((prompt, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
          onClick={() => onSelect(prompt.text)}
        >
          {prompt.icon}
          <span className="ml-2">{prompt.text}</span>
        </Button>
      ))}
    </div>
  )
}

