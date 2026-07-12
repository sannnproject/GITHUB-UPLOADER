"use client"

import { useState } from "react"
import { useGithub } from "@/lib/github-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { toast } from "sonner"
import { Lock, Globe, Star, GitFork, BookMarked, Trash2 } from "lucide-react"

export function Repositories() {
  const { config, user, repositories, fetchRepositories } = useGithub()
  const [search, setSearch] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [repoToDelete, setRepoToDelete] = useState<string | null>(null)
  
  const [newRepoName, setNewRepoName] = useState("")
  const [newRepoDesc, setNewRepoDesc] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleCreate = async () => {
    if (!newRepoName) return toast.error("Nama repositori diperlukan")
    setIsCreating(true)
    try {
      const res = await fetch("https://api.github.com/user/repos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: newRepoName,
          description: newRepoDesc,
          private: isPrivate,
          auto_init: true
        })
      })
      if (!res.ok) throw new Error("Gagal membuat repositori")
      toast.success("Repositori berhasil dibuat.")
      setIsCreateOpen(false)
      setNewRepoName("")
      setNewRepoDesc("")
      fetchRepositories()
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setIsCreating(false)
    }
  }

  const handleDelete = async () => {
    if (!repoToDelete) return
    setIsDeleting(true)
    try {
      const owner = config.username.trim()
      const repo = repoToDelete.trim()
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${config.token}`,
          Accept: "application/vnd.github.v3+json"
        }
      })
      if (!res.ok) {
        if (res.status === 403 || res.status === 404) {
          throw new Error("Gagal menghapus. Pastikan token Anda memiliki scope 'delete_repo'.")
        }
        throw new Error("Gagal menghapus repositori")
      }
      toast.success(`Repositori ${repoToDelete} berhasil dihapus.`)
      setRepoToDelete(null)
      fetchRepositories()
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setIsDeleting(false)
    }
  }

  const filteredRepos = repositories.filter(r => r.name.toLowerCase().includes(search.toLowerCase()))

  if (!config.token) {
    return (
      <Card className="bg-destructive/10 border-destructive mt-6 max-w-5xl mx-auto">
        <CardContent className="p-4 text-center">
          Harap konfigurasikan pengaturan GitHub Anda untuk mengelola repositori.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6 mt-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Repositori</h2>
          <p className="text-muted-foreground text-sm">Kelola repositori GitHub Anda.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Input 
            placeholder="Cari repositori..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-64"
          />
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">Buat Repositori</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Buat repositori baru</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Nama repositori *</Label>
                  <Input value={newRepoName} onChange={e => setNewRepoName(e.target.value)} placeholder="my-awesome-project" />
                </div>
                <div className="space-y-2">
                  <Label>Deskripsi</Label>
                  <Input value={newRepoDesc} onChange={e => setNewRepoDesc(e.target.value)} placeholder="Deskripsi singkat" />
                </div>
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center gap-2">
                      {isPrivate ? <Lock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                      Repositori Privat
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {isPrivate ? "Anda memilih siapa yang dapat melihat dan berkontribusi ke repositori ini." : "Siapapun di internet dapat melihat repositori ini."}
                    </p>
                  </div>
                  <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
                </div>
                <Button className="w-full" onClick={handleCreate} disabled={isCreating}>
                  {isCreating ? "Membuat..." : "Buat Repositori"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRepos.map(repo => (
          <Card key={repo.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-bold flex items-center gap-2 truncate flex-1">
                  <BookMarked className="h-4 w-4 text-muted-foreground shrink-0" />
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="hover:underline truncate">{repo.name}</a>
                </CardTitle>
                <div className="flex items-center shrink-0 ml-2">
                  <span className="text-xs border px-2 py-1 rounded-full text-muted-foreground capitalize mr-2">
                    {repo.private ? 'Privat' : 'Publik'}
                  </span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => setRepoToDelete(repo.name)} title="Hapus Repositori">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription className="line-clamp-2 h-10 mt-2">
                {repo.description || "Tidak ada deskripsi."}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-0 flex gap-4 text-sm text-muted-foreground">
              {repo.language && (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-primary/60" /> {repo.language}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3" /> {repo.stargazers_count}
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="h-3 w-3" /> {repo.forks_count}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredRepos.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Tidak ada repositori yang cocok dengan pencarian Anda.
        </div>
      )}

      <Dialog open={!!repoToDelete} onOpenChange={(open) => !open && setRepoToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Repositori</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus <span className="font-bold text-foreground">{repoToDelete}</span>? Tindakan ini tidak dapat dibatalkan.
              <br/><br/>
              <span className="text-destructive font-semibold">Catatan:</span> Personal Access Token Anda harus memiliki scope <code>delete_repo</code>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setRepoToDelete(null)} disabled={isDeleting}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
