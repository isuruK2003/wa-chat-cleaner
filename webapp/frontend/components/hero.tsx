import Image from 'next/image';

export function Hero() {
  return (
    <div className="relative w-full min-h-[60vh] md:h-[100vh] flex items-center justify-center overflow-hidden py-12 md:py-0">

      <div className="absolute inset-0 z-0">
        <Image src="/93822.jpg" alt="Background" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className='relative flex flex-col items-center px-6 sm:px-8 md:px-4 mx-auto max-w-6xl'>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 md:mb-6 text-center">Convert WhatsApp Chat Exports to JSON</h1>

        <p className="opacity-70 text-white mb-8 md:mb-10 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl text-center text-base">
          Need a JSON version of your WhatsApp chat? This is the tool for it. Upload your text version of your WhatsApp chat and transform it into a JSON version. Then you can use it for your project.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md justify-center'>
          <a href='#how-to-use' className="px-6 sm:px-8 py-3 text-sm text-center cursor-pointer bg-transparent hover:bg-white/10 text-white border border-white font-medium rounded-lg transition-colors w-full">Learn More</a>
          <a href='#use-now' className="px-6 sm:px-8 py-3 text-sm text-center cursor-pointer hover:bg-white/10 text-white border border-white bg-white/35 font-medium rounded-lg transition-colors w-full">Use Now</a>
        </div>

      </div>
    </div>
  );
}