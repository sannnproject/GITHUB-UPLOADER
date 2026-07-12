"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'
import { get, set } from 'idb-keyval'

export interface GitHubConfig {
  token: string
  username: string
  repo: string
  branch: string
  targetFolder: string
  commitMessageTemplate: string
}

export interface UploadHistory {
  [date: string]: number
}

export interface GithubContextType {
  config: GitHubConfig
  setConfig: (config: GitHubConfig) => void
  user: any
  repositories: any[]
  branches: string[]
  isConfigured: boolean
  fetchRepositories: () => void
  uploadHistory: UploadHistory
  recordUploads: (count: number) => void
}

const defaultConfig: GitHubConfig = {
  token: '',
  username: '',
  repo: '',
  branch: 'main',
  targetFolder: '',
  commitMessageTemplate: 'Upload {filename}'
}

const GithubContext = createContext<GithubContextType | undefined>(undefined)

export function GithubProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfigState] = useState<GitHubConfig>(defaultConfig)
  const [user, setUser] = useState<any>(null)
  const [repositories, setRepositories] = useState<any[]>([])
  const [branches, setBranches] = useState<string[]>([])
  const [uploadHistory, setUploadHistory] = useState<UploadHistory>({})

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedConfig = await get('github-uploader-config')
        if (savedConfig) {
          setConfigState(savedConfig)
        }
        
        const savedHistory = await get('github-upload-history')
        if (savedHistory) {
          setUploadHistory(savedHistory)
        }
      } catch (e) {
        console.error("Failed to load data from IndexedDB", e)
      }
    }
    loadData()
  }, [])

  const setConfig = async (newConfig: GitHubConfig) => {
    setConfigState(newConfig)
    try {
      await set('github-uploader-config', newConfig)
    } catch (e) {
      console.error("Failed to save config to IndexedDB", e)
    }
  }

  const recordUploads = async (count: number) => {
    if (count <= 0) return
    const date = new Date().toISOString().split('T')[0]
    setUploadHistory(prev => {
      const newHistory = { ...prev, [date]: (prev[date] || 0) + count }
      set('github-upload-history', newHistory).catch(e => console.error("Failed to save history", e))
      return newHistory
    })
  }

  useEffect(() => {
    if (config.token) {
      fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${config.token}` },
        cache: 'no-store'
      })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(console.error)
    } else {
      setUser(null)
    }
  }, [config.token])

  const fetchRepositories = () => {
    if (config.token && (config.username || user?.login)) {
      const targetUser = (config.username || user?.login || '').trim()
      if (targetUser) {
        fetch(`https://api.github.com/users/${targetUser}/repos?per_page=100&sort=updated`, {
          headers: { Authorization: `Bearer ${config.token}` },
          cache: 'no-store'
        })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setRepositories(data)
        })
        .catch(console.error)
      }
    } else {
      setRepositories([])
    }
  }

  useEffect(() => {
    fetchRepositories()
  }, [config.token, config.username, user?.login])

  useEffect(() => {
    if (config.token && config.repo) {
      const owner = (config.username || user?.login || '').trim()
      const repo = config.repo.trim()
      if (owner && repo) {
        fetch(`https://api.github.com/repos/${owner}/${repo}/branches`, {
          headers: { Authorization: `Bearer ${config.token}` },
          cache: 'no-store'
        })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setBranches(data.map(b => b.name))
        })
        .catch(console.error)
      }
    } else {
      setBranches([])
    }
  }, [config.token, config.repo, config.username, user?.login])

  const isConfigured = Boolean(config.token && config.repo && config.branch)

  return (
    <GithubContext.Provider value={{ config, setConfig, user, repositories, branches, isConfigured, fetchRepositories, uploadHistory, recordUploads }}>
      {children}
    </GithubContext.Provider>
  )
}

export function useGithub() {
  const context = useContext(GithubContext)
  if (!context) throw new Error("useGithub must be used within GithubProvider")
  return context
}
