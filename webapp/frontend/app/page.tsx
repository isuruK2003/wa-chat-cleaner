"use client"

import { useState } from "react"
import { FileUploader } from "@/components/file-uploader"
import { ProcessedData } from "@/components/processed-data"
import { Hero } from "@/components/hero"
import { parseWhatsAppChat } from "@/lib/parser"

export default function Home() {
  const [processedData, setProcessedData] = useState<any[] | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (file: File) => {
    try {
      setIsProcessing(true)
      setError(null)

      // Simulate processing time for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const text = await file.text()
      const parsedData = parseWhatsAppChat(text)

      setProcessedData(parsedData)
    } catch (err) {
      setError("Failed to process the file. Please make sure it's a valid WhatsApp chat export.")
      console.error(err)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <Hero />

        <div className="mt-8">
          <FileUploader onFileUpload={handleFileUpload} isProcessing={isProcessing} />
        </div>

        {error && (
          <div className="mt-6 p-4 bg-destructive/10 text-destructive rounded-xl border border-destructive/20">
            {error}
          </div>
        )}

        {processedData && !error && (
          <div className="mt-8">
            <ProcessedData data={processedData} />
          </div>
        )}
      </div>
    </main>
  )
}

