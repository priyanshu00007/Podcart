import React from "react"
import { useRouter } from "next/router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Import createContext and useContext
import { createContext, useContext, useState } from "react"

// Create AudioPlayerContext
const AudioPlayerContext = createContext(null)

// Create useAudioPlayer hook
function useAudioPlayer() {
  const context = useContext(AudioPlayerContext)
  if (!context) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider")
  }
  return context
}

const categories = [
  { id: 1, name: "News & Politics", icon: "Mic", color: "bg-red-100 text-red-600" },
  { id: 2, name: "Technology", icon: "Headphones", color: "bg-blue-100 text-blue-600" },
  { id: 3, name: "Business", icon: "Briefcase", color: "bg-green-100 text-green-600" },
  { id: 4, name: "Science", icon: "Atom", color: "bg-yellow-100 text-yellow-600" },
  { id: 5, name: "Arts", icon: "Palette", color: "bg-pink-100 text-pink-600" },
  { id: 6, name: "Sports", icon: "Trophy", color: "bg-purple-100 text-purple-600" },
]

const podcasts = {
  1: [
    { id: 101, title: "Global News Roundup", host: "Sarah Johnson", image: "/placeholder.svg?height=200&width=200" },
    { id: 102, title: "Political Discourse", host: "Michael Brown", image: "/placeholder.svg?height=200&width=200" },
    { id: 103, title: "Current Affairs Analysis", host: "Emma Thompson", image: "/placeholder.svg?height=200&width=200" },
  ],
  2: [
    { id: 201, title: "Tech Talk", host: "Alex Chen", image: "/placeholder.svg?height=200&width=200" },
    { id: 202, title: "Future Gadgets", host: "Lila Patel", image: "/placeholder.svg?height=200&width=200" },
    { id: 203, title: "Coding Chronicles", host: "David Kim", image: "/placeholder.svg?height=200&width=200" },
  ],
  3: [
    { id: 301, title: "Market Movers", host: "Jennifer Lee", image: "/placeholder.svg?height=200&width=200" },
    { id: 302, title: "Entrepreneurial Journeys", host: "Robert Garcia", image: "/placeholder.svg?height=200&width=200" },
    { id: 303, title: "Financial Futures", host: "Sophia Martinez", image: "/placeholder.svg?height=200&width=200" },
  ],
  4: [
    { id: 401, title: "Science Simplified", host: "Dr. Emily Clark", image: "/placeholder.svg?height=200&width=200" },
    { id: 402, title: "Astronomy Today", host: "Neil Stevens", image: "/placeholder.svg?height=200&width=200" },
    { id: 403, title: "Biology Breakthroughs", host: "Dr. Maria Rodriguez", image: "/placeholder.svg?height=200&width=200" },
  ],
  5: [
    { id: 501, title: "Creative Canvas", host: "Olivia Wright", image: "/placeholder.svg?height=200&width=200" },
    { id: 502, title: "Music Musings", host: "Jazz Harper", image: "/placeholder.svg?height=200&width=200" },
    { id: 503, title: "Theater Talk", host: "Daniel Foster", image: "/placeholder.svg?height=200&width=200" },
  ],
  6: [
    { id: 601, title: "Sports Center", host: "Chris Johnson", image: "/placeholder.svg?height=200&width=200" },
    { id: 602, title: "Athlete Interviews", host: "Lisa Thompson", image: "/placeholder.svg?height=200&width=200" },
    { id: 603, title: "Game Analysis", host: "Mark Davis", image: "/placeholder.svg?height=200&width=200" },
  ],
}

// Create AudioPlayerProvider component
function AudioPlayerProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPodcast, setCurrentPodcast] = useState(null)

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const value = {
    isPlaying,
    currentPodcast,
    togglePlayPause,
    setCurrentPodcast,
  }

  return <AudioPlayerContext.Provider value={value}>{children}</AudioPlayerContext.Provider>
}

export default function CategoryPage() {
  const router = useRouter()
  const { id } = router.query

  const category = categories.find(cat => cat.id === Number(id))
  const categoryPodcasts = podcasts[id]

  if (!category || !categoryPodcasts) {
    return <div>Category not found</div>
  }

  return (
    <AudioPlayerProvider>
      <CategoryPageContent category={category} categoryPodcasts={categoryPodcasts} />
    </AudioPlayerProvider>
  )
}

function CategoryPageContent({ category, categoryPodcasts }) {
  const { isPlaying, currentPodcast, togglePlayPause, setCurrentPodcast } = useAudioPlayer()

  const handlePlayPause = (podcast) => {
    if (currentPodcast && currentPodcast.id === podcast.id) {
      togglePlayPause()
    } else {
      setCurrentPodcast(podcast)
    }
  }

  return (
    <div className={`min-h-screen ${category.color} p-8`}>
      <div className="max-w-6xl mx-auto">
        <Link href="/categories" className="text-lg font-semibold mb-4 inline-block hover:underline">
          ← Back to Categories
        </Link>
        <h1 className="text-4xl font-bold mb-8">{category.name} Podcasts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryPodcasts.map((podcast) => (
            <Card key={podcast.id} className="bg-white bg-opacity-90 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Image
                  src={podcast.image}
                  alt={podcast.title}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-semibold mb-2">{podcast.title}</CardTitle>
                <p className="text-gray-600 mb-4">Hosted by {podcast.host}</p>
                <Button
                  onClick={() => handlePlayPause(podcast)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {currentPodcast && currentPodcast.id === podcast.id && isPlaying ? (
                    <><Pause className="mr-2 h-4 w-4" /> Pause</>
                  ) : (
                    <><Play className="mr-2 h-4 w-4" /> Play</>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {currentPodcast && (
        <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 border-t p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{currentPodcast.title}</h3>
              <p className="text-sm text-gray-600">Now playing</p>
            </div>
            <Button onClick={togglePlayPause} variant="ghost">
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}