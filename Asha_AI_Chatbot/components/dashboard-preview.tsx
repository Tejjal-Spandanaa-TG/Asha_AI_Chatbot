"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function DashboardPreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard Preview</CardTitle>
        <CardDescription>Preview of how your authentication data will appear in Splunk.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="schema">Schema</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
          </TabsList>
          <TabsContent value="events" className="space-y-4">
            <div className="rounded-md border">
              <div className="bg-muted px-4 py-2 font-mono text-sm">Authentication Events</div>
              <pre className="p-4 text-xs overflow-auto max-h-[300px]">
                {`{
  "timestamp": "2023-10-15T14:32:45Z",
  "event_type": "login_success",
  "user_id": "user123",
  "ip_address": "192.168.1.1",
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "location": {
    "country": "United States",
    "city": "San Francisco"
  },
  "auth_method": "password"
}

{
  "timestamp": "2023-10-15T14:35:12Z",
  "event_type": "login_failure",
  "user_id": "user456",
  "ip_address": "203.0.113.42",
  "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  "location": {
    "country": "Canada",
    "city": "Toronto"
  },
  "auth_method": "password",
  "failure_reason": "invalid_credentials"
}`}
              </pre>
            </div>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                Events will be collected according to your polling interval and indexed in Splunk with the sourcetype{" "}
                <code>auth_events</code>.
              </AlertDescription>
            </Alert>
          </TabsContent>
          <TabsContent value="schema" className="space-y-4">
            <div className="rounded-md border">
              <div className="bg-muted px-4 py-2 font-mono text-sm">Event Schema</div>
              <div className="p-4 text-sm">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr>
                      <th className="px-2 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Field
                      </th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">timestamp</td>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">string (ISO 8601)</td>
                      <td className="px-2 py-2 text-xs">Event timestamp</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">event_type</td>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">string</td>
                      <td className="px-2 py-2 text-xs">Type of authentication event</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">user_id</td>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">string</td>
                      <td className="px-2 py-2 text-xs">User identifier</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">ip_address</td>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">string</td>
                      <td className="px-2 py-2 text-xs">Source IP address</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">user_agent</td>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">string</td>
                      <td className="px-2 py-2 text-xs">Browser/client user agent</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">location</td>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">object</td>
                      <td className="px-2 py-2 text-xs">Geographic location data</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">auth_method</td>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">string</td>
                      <td className="px-2 py-2 text-xs">Authentication method used</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="search" className="space-y-4">
            <div className="rounded-md border">
              <div className="bg-muted px-4 py-2 font-mono text-sm">Example Splunk Searches</div>
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Find failed login attempts:</h3>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    {`sourcetype="auth_events" event_type="login_failure" | stats count by user_id, ip_address`}
                  </pre>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Detect brute force attacks:</h3>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    {`sourcetype="auth_events" event_type="login_failure" 
| bucket _time span=5m 
| stats count as attempts by ip_address, _time 
| where attempts > 5`}
                  </pre>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Geographic login anomalies:</h3>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    {`sourcetype="auth_events" event_type="login_success" 
| stats dc(location.country) as countries by user_id 
| where countries > 1`}
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

