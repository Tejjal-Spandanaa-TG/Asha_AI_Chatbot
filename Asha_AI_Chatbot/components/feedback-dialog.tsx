"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface FeedbackDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (feedback: string) => void
}

export function FeedbackDialog({ open, onOpenChange, onSubmit }: FeedbackDialogProps) {
  const [feedbackType, setFeedbackType] = useState<string>("incorrect")
  const [feedbackText, setFeedbackText] = useState<string>("")

  const handleSubmit = () => {
    onSubmit(`Type: ${feedbackType}, Details: ${feedbackText}`)
    setFeedbackType("incorrect")
    setFeedbackText("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Provide Feedback</DialogTitle>
          <DialogDescription className="text-gray-400">
            Help us improve Asha AI by sharing what went wrong with this response.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <RadioGroup value={feedbackType} onValueChange={setFeedbackType} className="space-y-3">
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="incorrect" id="incorrect" className="border-gray-600" />
              <Label htmlFor="incorrect" className="font-normal text-gray-200">
                The information is incorrect
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="biased" id="biased" className="border-gray-600" />
              <Label htmlFor="biased" className="font-normal text-gray-200">
                The response contains bias or stereotypes
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="irrelevant" id="irrelevant" className="border-gray-600" />
              <Label htmlFor="irrelevant" className="font-normal text-gray-200">
                The response is not relevant to my question
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="other" id="other" className="border-gray-600" />
              <Label htmlFor="other" className="font-normal text-gray-200">
                Other issue
              </Label>
            </div>
          </RadioGroup>

          <Textarea
            placeholder="Please provide more details about the issue..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white resize-none"
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700" disabled={!feedbackText.trim()}>
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

