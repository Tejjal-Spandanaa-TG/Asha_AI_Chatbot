import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

interface EventCardProps {
  title: string
  date: string
  time: string
  location: string
  type: "Virtual" | "In-person"
  speakers: string[]
  description: string
}

export function EventCard({ title, date, time, location, type, speakers, description }: EventCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{time}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{location}</span>
              </div>
              <Badge
                variant="outline"
                className={
                  type === "Virtual"
                    ? "bg-blue-900/20 text-blue-400 border-blue-800"
                    : "bg-green-900/20 text-green-400 border-green-800"
                }
              >
                {type}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
            <Users className="h-3 w-3" />
            <span>Speakers:</span>
          </div>
          <ul className="text-sm text-gray-300 space-y-1">
            {speakers.map((speaker, index) => (
              <li key={index} className="line-clamp-1">
                {speaker}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center p-4 bg-gray-850 border-t border-gray-700">
        <Badge variant="outline" className="bg-purple-900/20 text-purple-400 border-purple-800">
          JobsForHer Event
        </Badge>
        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
          Register
        </Button>
      </CardFooter>
    </Card>
  )
}

