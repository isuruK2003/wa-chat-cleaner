"use client"

import { useState } from "react"
import { Download, Check, Copy, FileJson } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProcessedDataProps {
  data: any
}

export function ProcessedData({ data }: ProcessedDataProps) {
  const [copied, setCopied] = useState(false)

  // Handle empty or invalid data
  const jsonString =
    data && typeof data === "object" && Object.keys(data).length > 0
      ? JSON.stringify(data, null, 2)
      : JSON.stringify({ error: "No valid data received" }, null, 2)

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
              <FileJson className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-medium">Processed JSON</h2>
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
      </div>

      <div className="p-5">
        <div className="max-h-96 overflow-y-auto border rounded-xl p-4 bg-gradient-to-r from-primary/5 to-secondary/5">
          <pre className="text-xs whitespace-pre-wrap">{jsonString}</pre>
        </div>
      </div>
    </div>
  )
}

