import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image'

export default function Component() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', { email })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[url('/placeholder.svg?height=2160&width=3840')] bg-cover bg-center bg-fixed">
      <nav className="w-full backdrop-blur-lg bg-white/30 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Image src="/placeholder.svg?height=40&width=40" alt="Logo" width={40} height={40} className="rounded-2xl" />
          <div className="space-x-4">
            <Button variant="ghost" className="text-black hover:text-gray-700">Home</Button>
            <Button variant="ghost" className="text-black hover:text-gray-700">About</Button>
            <Button variant="ghost" className="text-black hover:text-gray-700">Contact</Button>
          </div>
        </div>
      </nav>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-8 backdrop-blur-lg bg-white/30 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black mb-2" style={{ fontFamily: 'SF Pro Expanded, system-ui, sans-serif' }}>Get in Touch</h2>
              <p className="text-gray-700" style={{ fontFamily: 'SF Pro Expanded, system-ui, sans-serif' }}>We'd love to hear from you!</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-black" style={{ fontFamily: 'SF Pro Expanded, system-ui, sans-serif' }}>Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/50 border-gray-300 focus:border-black focus:ring-black text-black placeholder-gray-500 rounded-xl shadow-sm"
                style={{ fontFamily: 'SF Pro Expanded, system-ui, sans-serif' }}
              />
            </div>
            <div className="flex space-x-4">
              <Button 
                type="submit" 
                className="flex-1 bg-black text-white font-semibold py-2 px-4 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl shadow-lg"
                style={{ fontFamily: 'SF Pro Expanded, system-ui, sans-serif' }}
              >
                Send Message
              </Button>
              <Button 
                type="button" 
                className="flex-1 bg-white text-black font-semibold py-2 px-4 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl shadow-lg border border-black"
                style={{ fontFamily: 'SF Pro Expanded, system-ui, sans-serif' }}
              >
                Try it out
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}