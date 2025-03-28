"use client"

import { useState } from "react"
import { Download, Check, Copy, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProcessedDataProps {
  data: any[]
}

export function ProcessedData({ data }: ProcessedDataProps) {
  const [copied, setCopied] = useState(false)

  const jsonString = JSON.stringify(data, null, 2)

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "whatsapp-chat.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-card border rounded-2xl shadow-lg overflow-hidden">
      <div className="p-5 border-b bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-teal to-blue rounded-full p-2">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-medium">Processed Data</h2>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="border-primary/20 hover:bg-primary/10 transition-colors"
            >
              {copied ? <Check className="h-4 w-4 mr-1 text-teal" /> : <Copy className="h-4 w-4 mr-1 text-primary" />}
              {copied ? "Copied" : "Copy JSON"}
            </Button>
            <Button
              size="sm"
              onClick={handleDownload}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              <Download className="h-4 w-4 mr-1" />
              Download JSON
            </Button>
          </div>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">{data.length} messages processed successfully</div>
      </div>

      <Tabs defaultValue="preview" className="p-5">
        <TabsList className="mb-4 bg-muted/50 p-1">
          <TabsTrigger
            value="preview"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-secondary/80 data-[state=active]:text-white"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="json"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-secondary/80 data-[state=active]:text-white"
          >
            JSON
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <div className="max-h-96 overflow-y-auto border rounded-xl p-4 bg-muted/20">
            {data.slice(0, 20).map((message, index) => (
              <div
                key={index}
                className="mb-3 pb-3 border-b last:border-0 hover:bg-muted/10 p-2 rounded-lg transition-colors"
              >
                <div className="flex justify-between">
                  <span className="font-medium text-primary">{message.sender}</span>
                  <span className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-full">
                    {message.timestamp}
                  </span>
                </div>
                <p className="mt-1">{message.message}</p>
              </div>
            ))}
            {data.length > 20 && (
              <div className="text-center text-sm bg-gradient-to-r from-primary/20 to-secondary/20 py-2 px-4 rounded-full mt-4">
                + {data.length - 20} more messages
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="json">
          <div className="max-h-96 overflow-y-auto border rounded-xl p-4 bg-gradient-to-r from-primary/5 to-secondary/5">
            <pre className="text-xs whitespace-pre-wrap">{jsonString}</pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

