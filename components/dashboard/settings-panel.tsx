"use client"

import { useState, useRef, useEffect } from "react"
import { useGithub } from "@/lib/github-context"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Download, Upload, Trash, Save, CheckCircle2, XCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SettingsPanel() {
  const { config, setConfig, user, repositories, branches } = useGithub()
  const [token, setToken] = useState(config.token)
  const [username, setUsername] = useState(config.username)
  const [repo, setRepo] = useState(config.repo)
  const [branch, setBranch] = useState(config.branch)
  const [targetFolder, setTargetFolder] = useState(config.targetFolder)
  const [commitMessage, setCommitMessage] = useState(config.commitMessageTemplate)
  const [testResult, setTestResult] = useState<boolean | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setToken(config.token)
    setUsername(config.username)
    setRepo(config.repo)
    setBranch(config.branch)
    setTargetFolder(config.targetFolder)
    setCommitMessage(config.commitMessageTemplate)
  }, [config])

  const handleSave = () => {
    setConfig({ token, username, repo, branch, targetFolder, commitMessageTemplate: commitMessage })
    toast.success("Pengaturan berhasil disimpan")
  }

  const handleClear = () => {
    setConfig({ token: "", username: "", repo: "", branch: "main", targetFolder: "", commitMessageTemplate: "Upload {filename}" })
    setToken("")
    setUsername("")
    setRepo("")
    setBranch("main")
    setTargetFolder("")
    setCommitMessage("Upload {filename}")
    toast.info("Sesi dihapus")
  }

  const testConnection = async () => {
    if (!token) return toast.error("Token diperlukan")
    try {
      const res = await fetch("https://api.github.com/user", { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) {
        setTestResult(true)
        toast.success("Koneksi berhasil")
      } else {
        setTestResult(false)
        toast.error("Koneksi gagal")
      }
    } catch (e) {
      setTestResult(false)
      toast.error("Koneksi gagal")
    }
  }

  const exportConfig = () => {
    const data = JSON.stringify({ token, username, repo, branch, targetFolder, commitMessageTemplate: commitMessage })
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "github-uploader-config.json"
    a.click()
  }

  const importConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        setToken(data.token || "")
        setUsername(data.username || "")
        setRepo(data.repo || "")
        setBranch(data.branch || "main")
        setTargetFolder(data.targetFolder || "")
        setCommitMessage(data.commitMessageTemplate || "Upload {filename}")
        toast.success("Konfigurasi diimpor")
      } catch (err) {
        toast.error("File konfigurasi tidak valid")
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Konfigurasi</CardTitle>
          <CardDescription>Siapkan koneksi GitHub Anda dan repositori target.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="token">Personal Access Token</Label>
            <Input id="token" type="password" value={token} onChange={e => setToken(e.target.value)} placeholder="ghp_xxxxxxxxxxxx" />
            <div className="w-full aspect-video rounded-md overflow-hidden border border-muted mt-2">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/aGcySeHoOt0" 
                title="Cara mendapatkan API Key GitHub" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-xs text-muted-foreground bg-blue-500/10 p-2 rounded-md border border-blue-500/20 text-blue-600 dark:text-blue-400">
              <strong>🛡️ Keamanan Token (API Key):</strong> Token Anda aman dan 100% tersimpan secara lokal di browser (IndexedDB). Kami tidak menyimpan, melacak, atau mengirimkan token ke server eksternal manapun. Semua komunikasi dilakukan langsung dari browser ke API resmi GitHub.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="github-username" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="repo">Repositori</Label>
              {repositories.length > 0 ? (
                <Select value={repo} onValueChange={setRepo}>
                  <SelectTrigger><SelectValue placeholder="Pilih repositori" /></SelectTrigger>
                  <SelectContent>
                    {repositories.map(r => <SelectItem key={r.name} value={r.name}>{r.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              ) : (
                <Input id="repo" value={repo} onChange={e => setRepo(e.target.value)} placeholder="nama-repositori" />
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="branch">Cabang (Branch)</Label>
              {branches.length > 0 ? (
                <Select value={branch} onValueChange={setBranch}>
                  <SelectTrigger><SelectValue placeholder="Pilih cabang" /></SelectTrigger>
                  <SelectContent>
                    {branches.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              ) : (
                <Input id="branch" value={branch} onChange={e => setBranch(e.target.value)} placeholder="main" />
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="targetFolder">Target Folder (Opsional)</Label>
              <Input id="targetFolder" value={targetFolder} onChange={e => setTargetFolder(e.target.value)} placeholder="misal, assets/images" />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <Button variant="secondary" onClick={testConnection}>Uji Koneksi</Button>
            {testResult === true && <CheckCircle2 className="text-green-500 h-5 w-5" />}
            {testResult === false && <XCircle className="text-red-500 h-5 w-5" />}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t p-6 bg-muted/20">
          <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-start">
            <Button variant="outline" size="icon" title="Ekspor Konfigurasi" onClick={exportConfig}>
              <Download className="h-4 w-4" />
            </Button>
            <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={importConfig} />
            <Button variant="outline" size="icon" title="Impor Konfigurasi" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2 w-full sm:w-auto flex-col sm:flex-row">
            <Button variant="destructive" onClick={handleClear} className="w-full sm:w-auto">
              <Trash className="mr-2 h-4 w-4" /> Hapus Sesi
            </Button>
            <Button onClick={handleSave} className="w-full sm:w-auto">
              <Save className="mr-2 h-4 w-4" /> Simpan Konfigurasi
            </Button>
          </div>
        </CardFooter>
      </Card>
      {user && (
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Detail Akun</h3>
            <p className="text-muted-foreground mb-4">Informasi Profil GitHub</p>
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback>{user.login?.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h4 className="text-xl font-bold">{user.name || user.login}</h4>
            <p className="text-muted-foreground">@{user.login}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
