import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <div className="relative overflow-hidden rounded-2xl py-12 px-8 mb-8">
      <div className="absolute inset-0 gradient-bg opacity-90"></div>
      <div className="absolute inset-0 opacity-10 bubble-pattern"></div>

      <div className="relative text-center z-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-white drop-shadow-md">
          WA Export Cleaner
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-white/90">
          Convert your WhatsApp chat exports to clean, structured JSON with just a few clicks. Upload your .txt file and
          we'll process it through our API.
        </p>

        <div className="flex items-center justify-center gap-4 mt-8 text-sm">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
            <span>Upload .txt</span>
            <ArrowRight className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
            <span>Process</span>
            <ArrowRight className="h-4 w-4" />
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
            <span>Download JSON</span>
          </div>
        </div>
      </div>
    </div>
  )
}

