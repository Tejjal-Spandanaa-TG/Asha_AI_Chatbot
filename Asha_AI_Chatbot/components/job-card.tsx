import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, DollarSign, BookmarkPlus } from "lucide-react"

interface JobCardProps {
  title: string
  company: string
  location: string
  type: string
  salary: string
  skills: string[]
  postedDate: string
  description: string
}

export function JobCard({ title, company, location, type, salary, skills, postedDate, description }: JobCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-gray-300">{company}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{type}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                <span>{salary}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <BookmarkPlus className="h-4 w-4" />
            <span className="sr-only">Save job</span>
          </Button>
        </div>

        <div className="mt-3">
          <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
        </div>

        <div className="mt-4">
          <p className="text-xs text-gray-400 mb-2">Skills:</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center p-4 bg-gray-850 border-t border-gray-700">
        <span className="text-xs text-gray-400">Posted {postedDate}</span>
        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  )
}

