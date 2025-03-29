export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-16 md:py-24">
            <div className="container px-4 md:px-6 mx-auto">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">How To Use?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            step: 1,
                            title: "Export Your WhatsApp Chat",
                            description: "Go to the WhatsApp chat where you need to create the backup, and select the 'Export Chat' in the options list."
                        },
                        {
                            step: 2,
                            title: "Upload and Process",
                            description: "Upload the .txt backup file and process it using our API or local processing method. Use API for more sophisticated data cleaning."
                        },
                        {
                            step: 3,
                            title: "Download",
                            description: "Download the JSON file and apply to your project!"
                        }
                    ].map((step, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="rounded-full bg-primary text-primary-foreground w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-4 text-base md:text-lg font-bold">
                                {step.step}
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-center mb-2">{step.title}</h3>
                            <p className="text-center text-sm md:text-base text-gray-500 dark:text-gray-400">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}