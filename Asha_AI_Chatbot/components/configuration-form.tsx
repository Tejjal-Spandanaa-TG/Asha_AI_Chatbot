"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Save, CylinderIcon as TestCylinder } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { testConnection, saveConfiguration } from "@/lib/api-client"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  apiUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
  apiKey: z.string().min(1, {
    message: "API key is required.",
  }),
  pollingInterval: z.string().min(1, {
    message: "Polling interval is required.",
  }),
  authType: z.enum(["basic", "oauth", "apikey"]),
  customHeaders: z.string().optional(),
  enabled: z.boolean().default(true),
})

export function ConfigurationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [testStatus, setTestStatus] = useState<"idle" | "success" | "error">("idle")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      apiUrl: "",
      apiKey: "",
      pollingInterval: "300",
      authType: "apikey",
      customHeaders: "",
      enabled: true,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      await saveConfiguration(values)
      toast({
        title: "Configuration saved",
        description: "Your integration configuration has been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save configuration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleTestConnection() {
    setIsLoading(true)
    setTestStatus("idle")
    try {
      const values = form.getValues()
      const result = await testConnection(values)
      if (result.success) {
        setTestStatus("success")
        toast({
          title: "Connection successful",
          description: "Successfully connected to the API endpoint.",
        })
      } else {
        setTestStatus("error")
        toast({
          title: "Connection failed",
          description: result.message || "Failed to connect to the API endpoint.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setTestStatus("error")
      toast({
        title: "Connection failed",
        description: "An error occurred while testing the connection.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Configuration</CardTitle>
        <CardDescription>
          Configure your authentication events collector to connect with your SaaS application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Integration Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Auth Events Collector" {...field} />
                  </FormControl>
                  <FormDescription>A descriptive name for this integration.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apiUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Endpoint URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://api.example.com/auth/events" {...field} />
                  </FormControl>
                  <FormDescription>The URL of the authentication events API.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Authentication Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select authentication type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="apikey">API Key</SelectItem>
                      <SelectItem value="oauth">OAuth 2.0</SelectItem>
                      <SelectItem value="basic">Basic Auth</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>The authentication method to use for API requests.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key / Secret</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>Your API key or authentication token.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pollingInterval"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Polling Interval (seconds)</FormLabel>
                  <FormControl>
                    <Input type="number" min="60" {...field} />
                  </FormControl>
                  <FormDescription>How frequently to collect new events (minimum 60 seconds).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customHeaders"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Headers (JSON)</FormLabel>
                  <FormControl>
                    <Textarea placeholder='{"X-Custom-Header": "value"}' className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>Optional custom headers to include with API requests.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Enabled</FormLabel>
                    <FormDescription>Enable or disable this integration.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={handleTestConnection} disabled={isLoading}>
                <TestCylinder className="mr-2 h-4 w-4" />
                Test Connection
              </Button>
              <Button type="submit" disabled={isLoading}>
                <Save className="mr-2 h-4 w-4" />
                Save Configuration
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

