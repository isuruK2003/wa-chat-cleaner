"use client"

import { useState } from "react"
import { FileUploader } from "@/components/file-uploader"
import { ProcessedData } from "@/components/processed-data"
import { Hero } from "@/components/hero"
import { parseWhatsAppChat } from "@/lib/parser"
import HowItWorks from "@/components/how-it-works"
import Footer from "@/components/footer"

export default function Home() {
  const [processedData, setProcessedData] = useState<any[] | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [useLocalProcessing, setUseLocalProcessing] = useState(false)

  const handleFileUpload = async (file: File) => {
    try {
      setIsProcessing(true)
      setError(null)

      // If using local processing or if API calls have failed before
      if (useLocalProcessing) {
        await processLocally(file)
        return
      }

      // Try API first
      try {
        await processWithAPI(file)
      } catch (apiError) {
        console.error("API processing failed, falling back to local processing:", apiError)
        setError("API is unreachable. Using local processing instead.")
        setUseLocalProcessing(true)
        await processLocally(file)
      }
    } catch (err) {
      console.error("Error details:", err)
      setError(`Failed to process the file: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const processWithAPI = async (file: File) => {
    // Create a FormData object to send the file
    const formData = new FormData()
    formData.append("file", file)

    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (apiUrl === undefined) {
      throw new Error(`API URL cannot be retrieved from environment variables`)
    }
    const response = await fetch(apiUrl, { method: "POST", body: formData });

    console.log("Response status:", response.status)

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    console.log("Response data:", data)

    // Check if the response is empty or invalid
    if (!data || (typeof data === "object" && Object.keys(data).length === 0)) {
      throw new Error("API returned empty or invalid data")
    }

    setProcessedData(data)
  }

  const processLocally = async (file: File) => {
    console.log("Processing file locally")
    // Read the file content
    const text = await file.text()

    // Parse the WhatsApp chat locally
    const parsedData = parseWhatsAppChat(text)

    setProcessedData(parsedData)
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <section id="how-to-use">
        <HowItWorks />
      </section>
      <section id="use-now" className="container mx-auto px-4 max-w-5xl py-[24px]">

        <FileUploader
          onFileUpload={handleFileUpload}
          isProcessing={isProcessing}
          useLocalProcessing={useLocalProcessing}
          onToggleProcessing={() => setUseLocalProcessing(!useLocalProcessing)}
        />

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
      </section>
      <Footer />
    </div>
  )
}