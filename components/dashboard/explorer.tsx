"use client"

import { useState, useEffect } from "react"
import { useGithub } from "@/lib/github-context"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Folder, File, ArrowUpLeft, RefreshCw, Trash2 } from "lucide-react"

export function Explorer() {
  const { config, isConfigured } = useGithub()
  const [files, setFiles] = useState<any[]>([])
  const [currentPath, setCurrentPath] = useState("")
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const fetchFiles = async (path: string = "") => {
    if (!isConfigured) return
    setLoading(true)
    try {
      const owner = config.username.trim()
      const repo = config.repo.trim()
      const branch = config.branch.trim()
      
      const apiPath = path ? `/${path}` : ""
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents${apiPath}?ref=${branch}`
      
      const res = await fetch(apiUrl, {
        headers: { 
          Authorization: `Bearer ${config.token}`,
          Accept: "application/vnd.github.v3+json"
        },
        cache: 'no-store'
      })
      if (!res.ok) {
        if (res.status === 404) {
          setFiles([])
          return
        }
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.message || "Gagal mengambil file")
      }
      
      let data = await res.json()
      if (!Array.isArray(data)) data = [data]
      
      // Sort: folders first, then files
      data.sort((a: any, b: any) => {
        if (a.type === b.type) return a.name.localeCompare(b.name)
        return a.type === "dir" ? -1 : 1
      })
      
      setFiles(data)
      setCurrentPath(path)
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isConfigured) fetchFiles()
  }, [isConfigured, config.repo, config.branch])

  const navigateTo = (path: string) => {
    fetchFiles(path)
  }

  const navigateUp = () => {
    if (!currentPath) return
    const parts = currentPath.split("/").filter(Boolean)
    parts.pop()
    fetchFiles(parts.join("/"))
  }

  const handleDelete = async (file: any) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus ${file.name}?`)) return
    
    try {
      const owner = config.username.trim()
      const repo = config.repo.trim()
      const branch = config.branch.trim()
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${file.path}`
      
      const res = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: `Hapus ${file.name}`,
          sha: file.sha,
          branch
        })
      })
      
      if (!res.ok) throw new Error("Gagal menghapus")
      toast.success("Berhasil dihapus")
      fetchFiles(currentPath)
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

  if (!isConfigured) {
    return (
      <Card className="bg-destructive/10 border-destructive mt-6 max-w-5xl mx-auto">
        <CardContent className="p-4 text-center">
          Harap konfigurasikan pengaturan GitHub Anda untuk menjelajahi file.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto sm:flex-1">
          <Button variant="outline" size="icon" onClick={navigateUp} disabled={!currentPath || loading} className="flex-shrink-0">
            <ArrowUpLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-mono truncate bg-muted px-3 py-1.5 rounded-md flex-1 min-w-0 max-w-md">
            {config.repo} / {currentPath || "<root>"}
          </div>
          <Button variant="ghost" size="icon" onClick={() => fetchFiles(currentPath)} disabled={loading} className="flex-shrink-0">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input 
            placeholder="Cari file..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-48 lg:w-64"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border-t overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[500px]">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">Nama</th>
                <th className="px-6 py-3 font-medium">Tipe</th>
                <th className="px-6 py-3 font-medium">Ukuran</th>
                <th className="px-6 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Memuat...</td></tr>
              ) : filteredFiles.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Tidak ada file ditemukan</td></tr>
              ) : (
                filteredFiles.map((file, i) => (
                  <tr key={i} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        {file.type === "dir" ? <Folder className="h-4 w-4 text-blue-500" /> : <File className="h-4 w-4 text-muted-foreground" />}
                        {file.type === "dir" ? (
                          <button onClick={() => navigateTo(file.path)} className="font-medium hover:underline text-left">
                            {file.name}
                          </button>
                        ) : (
                          <a href={file.download_url} target="_blank" rel="noreferrer" className="hover:underline">
                            {file.name}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-muted-foreground capitalize">{file.type}</td>
                    <td className="px-6 py-3 text-muted-foreground">
                      {file.type === "file" ? (file.size > 1024 ? `${(file.size / 1024).toFixed(1)} KB` : `${file.size} B`) : "--"}
                    </td>
                    <td className="px-6 py-3 text-right">
                      {file.type === "file" && (
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(file)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
