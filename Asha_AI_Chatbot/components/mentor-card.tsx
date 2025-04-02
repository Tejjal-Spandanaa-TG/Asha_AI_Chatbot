"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Users } from "lucide-react"
import { useState } from "react"

interface Mentor {
  name: string
  role: string
  experience: string
  expertise: string
}

interface MentorCardProps {
  category: string
  description: string
  skills: string[]
  mentors: Mentor[]
}

export function MentorCard({ category, description, skills, mentors }: MentorCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="bg-gray-800 rounded-lg border border-gray-700">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium text-white mb-2">{category}</h3>
        <p className="text-gray-300 mb-3">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <Badge key={index} className="bg-purple-900 hover:bg-purple-800">
              {skill}
            </Badge>
          ))}
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Users className="h-4 w-4" />
              <span>Available Mentors ({mentors.length})</span>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
                <span className="sr-only">Toggle mentors</span>
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="mt-3 space-y-3">
            {mentors.map((mentor, index) => (
              <div key={index} className="bg-gray-750 rounded-md p-3 border border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-white">{mentor.name}</h4>
                    <p className="text-sm text-gray-300">{mentor.role}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span>Experience: {mentor.experience}</span>
                    </div>
                    <p className="mt-2 text-xs text-gray-300">
                      <span className="text-gray-400">Expertise: </span>
                      {mentor.expertise}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <div className="mt-4">
          <Button variant="outline" className="w-full border-purple-600 text-purple-400 hover:bg-purple-900/20">
            Find a {category.split("&")[0]} Mentor
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

