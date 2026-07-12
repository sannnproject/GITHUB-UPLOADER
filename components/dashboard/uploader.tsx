"use client"

import { useState, useRef, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { useGithub } from "@/lib/github-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { UploadCloud, FolderUp, FileArchive, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import JSZip from "jszip"

export function Uploader() {
  const { config, isConfigured, recordUploads } = useGithub()
  const [queue, setQueue] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const folderInputRef = useRef<HTMLInputElement>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setQueue(prev => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setQueue(prev => [...prev, ...Array.from(e.target.files!)])
    }
  }

  const handleZipExtract = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    toast.info("Mengekstrak file ZIP...")
    try {
      const zip = new JSZip()
      const contents = await zip.loadAsync(file)
      const extractedFiles: File[] = []
      
      const validEntries = Object.entries(contents.files).filter(
        ([name]) => !name.startsWith('__MACOSX/') && !name.includes('/.DS_Store') && !name.endsWith('.DS_Store')
      );

      let rootFolder = null;
      let isSingleRoot = true;
      
      for (const [filename, entry] of validEntries) {
        if (entry.dir) continue;
        const parts = filename.split('/');
        if (parts.length === 1) {
           isSingleRoot = false;
           break;
        }
        if (parts.length > 1) {
           if (rootFolder === null) {
              rootFolder = parts[0];
           } else if (rootFolder !== parts[0]) {
              isSingleRoot = false;
              break;
           }
        }
      }

      const prefixToRemove = isSingleRoot && rootFolder ? `${rootFolder}/` : "";

      for (const [filename, zipEntry] of validEntries) {
        if (!zipEntry.dir) {
          const blob = await zipEntry.async("blob")
          let finalName = filename;
          if (prefixToRemove && finalName.startsWith(prefixToRemove)) {
             finalName = finalName.substring(prefixToRemove.length);
          }
          const extractedFile = new File([blob], finalName)
          Object.defineProperty(extractedFile, 'webkitRelativePath', { value: finalName });
          extractedFiles.push(extractedFile)
        }
      }
      setQueue(prev => [...prev, ...extractedFiles])
      toast.success(`Berhasil mengekstrak ${extractedFiles.length} file`)
    } catch (err) {
      toast.error("Gagal mengekstrak ZIP")
    }
  }

  const removeFile = (index: number) => {
    setQueue(prev => prev.filter((_, i) => i !== index))
  }

  const clearQueue = () => setQueue([])

  const startUpload = async () => {
    if (!isConfigured) return toast.error("Harap konfigurasikan pengaturan GitHub terlebih dahulu")
    if (queue.length === 0) return toast.error("Tidak ada file dalam antrean")
    
    setIsUploading(true)
    setProgress(0)
    let uploadedCount = 0

    for (let i = 0; i < queue.length; i++) {
      const file = queue[i]
      try {
        const content = await file.arrayBuffer()
        const base64Content = Buffer.from(content).toString("base64")
        
        let path = file.webkitRelativePath || file.name
        if (config.targetFolder) {
          path = `${config.targetFolder}/${path}`
        }

        const owner = config.username.trim()
        const repo = config.repo.trim()
        const branch = config.branch.trim()
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`

        // Check if file exists first to get sha for update
        let sha
        try {
          const checkRes = await fetch(apiUrl, {
            headers: { Authorization: `Bearer ${config.token}` },
            cache: 'no-store'
          })
          if (checkRes.ok) {
            const data = await checkRes.json()
            sha = data.sha
          }
        } catch (e) {}

        const message = config.commitMessageTemplate.replace("{filename}", file.name)
        
        const res = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${config.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message,
            content: base64Content,
            branch,
            ...(sha ? { sha } : {})
          })
        })

        if (!res.ok) throw new Error(`Gagal mengunggah ${file.name}`)
        
        uploadedCount++
        setProgress((uploadedCount / queue.length) * 100)
      } catch (err: any) {
        toast.error(err.message)
      }
    }

    if (uploadedCount > 0) {
      toast.success(`Berhasil mengunggah ${uploadedCount} file`)
      recordUploads(uploadedCount)
      setQueue([])
    }
    setIsUploading(false)
    setProgress(0)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto mt-6">
      {!isConfigured && (
        <Card className="bg-destructive/10 border-destructive">
          <CardContent className="p-4 text-center">
            Harap konfigurasikan pengaturan GitHub Anda di tab Pengaturan sebelum mengunggah.
          </CardContent>
        </Card>
      )}

      {isConfigured && (
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="text-sm font-medium whitespace-nowrap text-muted-foreground">Unggah ke:</div>
            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-background px-3 py-2 border rounded-md text-sm">{config.repo}</div>
              <div className="bg-background px-3 py-2 border rounded-md text-sm">{config.branch}</div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <div
          {...getRootProps()}
          className={`flex-1 border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"}`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium">Seret & lepas file ke sini, atau klik untuk memilih</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="w-full sm:w-auto">
          <input 
            type="file" 
            ref={folderInputRef} 
            className="hidden" 
            {...({ webkitdirectory: "true", directory: "true" } as any)}
            multiple 
            onChange={handleFolderSelect} 
          />
          <Button variant="outline" className="w-full" onClick={() => folderInputRef.current?.click()}>
            <FolderUp className="mr-2 h-4 w-4" /> Pilih Folder
          </Button>
        </div>
        <div className="w-full sm:w-auto">
          <input 
            type="file" 
            id="zipExtract"
            className="hidden" 
            accept=".zip"
            onChange={handleZipExtract} 
          />
          <Button variant="outline" className="w-full" onClick={() => document.getElementById("zipExtract")?.click()}>
            <FileArchive className="mr-2 h-4 w-4" /> Ekstrak & Unggah ZIP
          </Button>
        </div>
      </div>

      {queue.length > 0 && (
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Antrean Unggahan</CardTitle>
              <CardDescription>{queue.length} file dalam antrean</CardDescription>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" className="flex-1 sm:flex-none" onClick={clearQueue} disabled={isUploading}>Bersihkan</Button>
              <Button onClick={startUpload} className="flex-1 sm:flex-none" disabled={isUploading}>
                {isUploading ? "Mengunggah..." : "Mulai Unggah"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {isUploading && <Progress value={progress} />}
            <div className="max-h-64 overflow-y-auto border rounded-md">
              {queue.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-3 border-b last:border-0 hover:bg-muted/50">
                  <div className="truncate flex-1 mr-4">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{file.webkitRelativePath || "Root"}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(i)} disabled={isUploading}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
