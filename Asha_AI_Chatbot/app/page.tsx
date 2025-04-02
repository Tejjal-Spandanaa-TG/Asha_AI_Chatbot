import { ChatInterface } from "@/components/chat-interface"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <header className="border-b border-gray-800 bg-gray-900 py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
              A
            </div>
            <h1 className="text-xl font-semibold text-white">Asha AI</h1>
          </div>
          <div className="text-sm text-gray-400">JobsForHer Foundation</div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4">
        <ChatInterface />
      </main>

      
    </div>
  )
}

