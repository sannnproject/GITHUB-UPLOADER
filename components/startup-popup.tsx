"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function StartupPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Register Service Worker for PWA
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log("Service Worker registration successful with scope: ", registration.scope)
          },
          (err) => {
            console.log("Service Worker registration failed: ", err)
          }
        )
      })
    }

    // Show popup every time the app is opened
    setIsOpen(true)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">Gabung Saluran Pengembang!</DialogTitle>
          <DialogDescription className="text-center">
            Dapatkan update terbaru dan bergabung dengan komunitas kami.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-col gap-2">
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white" 
            onClick={() => {
              window.open("https://whatsapp.com/channel/0029Vb6ukqnHQbS4mKP0j80L", "_blank")
              setIsOpen(false)
            }}
          >
            Gabung Saluran WhatsApp
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setIsOpen(false)}
          >
            Nanti Saja
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
