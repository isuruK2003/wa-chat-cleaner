"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Loader2, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploaderProps {
  onFileUpload: (file: File) => void
  isProcessing: boolean
}

export function FileUploader({ onFileUpload, isProcessing }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        if (file.type === "text/plain" || file.name.endsWith(".txt")) {
          onFileUpload(file)
        }
      }
    },
    [onFileUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
    },
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all",
        isDragActive
          ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
          : "border-border hover:border-secondary/50 hover:bg-secondary/5",
      )}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center justify-center gap-4">
        {isProcessing ? (
          <>
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent animate-spin blur-md opacity-70"></div>
              <div className="relative bg-background rounded-full p-4">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
              </div>
            </div>
            <p className="text-lg font-medium gradient-text">Processing your WhatsApp chat...</p>
          </>
        ) : (
          <>
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal via-blue to-purple blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white rounded-full p-6">
                <MessageSquare className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div>
              <p className="text-xl font-medium gradient-text">Drag & drop your WhatsApp chat export</p>
              <p className="text-sm text-muted-foreground mt-2">
                or click to browse files (only .txt files are supported)
              </p>
            </div>
            <Button className="mt-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              Select File
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

