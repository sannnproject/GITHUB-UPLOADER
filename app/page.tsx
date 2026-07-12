"use client"

import { Uploader } from "@/components/dashboard/uploader"
import { SettingsPanel } from "@/components/dashboard/settings-panel"
import { Explorer } from "@/components/dashboard/explorer"
import { Repositories } from "@/components/dashboard/repositories"
import { UploadHistoryChart } from "@/components/dashboard/upload-history-chart"
import { ThemeToggle } from "@/components/theme-toggle"
import { Github, FolderGit2, Settings, UploadCloud, BookMarked, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { StartupPopup } from "@/components/startup-popup"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <StartupPopup />
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="h-6 w-6" />
            <span className="font-bold text-lg">githubupps</span>
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" title="Panduan Penggunaan">
                  <BookOpen className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Cara Pemakaian githubupps</DialogTitle>
                  <DialogDescription>Panduan lengkap penggunaan aplikasi step-by-step</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 text-sm text-muted-foreground">
                  <div className="space-y-2">
                    <h3 className="font-bold text-foreground">1. Konfigurasi Awal (Settings)</h3>
                    <p>Buka tab <strong>Settings</strong>. Masukkan <strong>Personal Access Token</strong> (PAT) dari GitHub Anda. Pastikan token memiliki izin untuk membaca dan menulis repository (scope `repo`).</p>
                    <div className="bg-muted/50 p-3 rounded-md text-xs mt-2 border-l-4 border-blue-500 text-foreground">
                      <strong>🛡️ Keamanan API Key Terjamin:</strong> Personal Access Token (API Key) Anda 100% aman. Token hanya disimpan secara lokal di dalam memori browser Anda (IndexedDB) dan tidak akan pernah dikirim ke server kami atau pihak ketiga. Seluruh proses request ke GitHub dilakukan langsung dari browser Anda menuju <code>api.github.com</code>.
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-foreground">2. Pilih Repository</h3>
                    <p>Masukkan <strong>Username</strong> GitHub Anda. Sistem akan otomatis memuat daftar repository. Pilih repository yang dituju dan cabang (branch) seperti `main` atau `master`.</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-foreground">3. Tentukan Target Folder</h3>
                    <p>Jika Anda ingin mengunggah file ke folder tertentu dalam repository, isi <strong>Target Folder</strong> (contoh: `assets/images`). Jika ingin mengunggah ke root, biarkan kosong. Klik <strong>Save Configuration</strong>.</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-foreground">4. Mengunggah File (Upload)</h3>
                    <p>Buka tab <strong>Upload</strong>. Anda bisa drag & drop file, memilih folder penuh (Select Folder), atau mengekstrak file dari dalam ZIP (Extract & Upload ZIP). Setelah file masuk antrean, klik <strong>Start Upload</strong>.</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-foreground">5. Manajemen File & Repository</h3>
                    <p>Gunakan tab <strong>Explorer</strong> untuk melihat, mencari, dan menghapus file dari repository. Gunakan tab <strong>Repositories</strong> untuk melihat daftar repositori dan membuat repositori baru langsung dari aplikasi.</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="upload" className="w-full">
            <div className="flex justify-center mb-8 overflow-x-auto pb-2">
              <TabsList className="flex w-max min-w-full sm:min-w-0 sm:grid sm:grid-cols-4 h-auto p-1">
                <TabsTrigger value="upload" className="flex gap-2 py-2.5 px-5 sm:px-4 sm:py-2">
                  <UploadCloud className="h-5 w-5 sm:h-4 sm:w-4" /> <span className="hidden sm:inline">Unggah</span>
                </TabsTrigger>
                <TabsTrigger value="explorer" className="flex gap-2 py-2.5 px-5 sm:px-4 sm:py-2">
                  <FolderGit2 className="h-5 w-5 sm:h-4 sm:w-4" /> <span className="hidden sm:inline">Penjelajah</span>
                </TabsTrigger>
                <TabsTrigger value="repositories" className="flex gap-2 py-2.5 px-5 sm:px-4 sm:py-2">
                  <BookMarked className="h-5 w-5 sm:h-4 sm:w-4" /> <span className="hidden sm:inline">Repositori</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex gap-2 py-2.5 px-5 sm:px-4 sm:py-2">
                  <Settings className="h-5 w-5 sm:h-4 sm:w-4" /> <span className="hidden sm:inline">Pengaturan</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="upload" forceMount className="data-[state=inactive]:hidden fade-in-50 animate-in slide-in-from-bottom-2 duration-300">
              <Uploader />
              <UploadHistoryChart />
            </TabsContent>
            
            <TabsContent value="explorer" forceMount className="data-[state=inactive]:hidden fade-in-50 animate-in slide-in-from-bottom-2 duration-300">
              <Explorer />
            </TabsContent>

            <TabsContent value="repositories" forceMount className="data-[state=inactive]:hidden fade-in-50 animate-in slide-in-from-bottom-2 duration-300">
              <Repositories />
            </TabsContent>
            
            <TabsContent value="settings" forceMount className="data-[state=inactive]:hidden fade-in-50 animate-in slide-in-from-bottom-2 duration-300">
              <SettingsPanel />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      <Toaster />
      <footer className="border-t py-6 text-center text-sm text-muted-foreground bg-muted/20">
        Dibuat oleh <span className="font-bold text-foreground">SANN404 FORUM GROUP</span>
      </footer>
    </div>
  )
}
