"use client"

import { useGithub } from "@/lib/github-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export function UploadHistoryChart() {
  const { uploadHistory, isConfigured } = useGithub()

  if (!isConfigured) return null

  const data = Object.keys(uploadHistory || {}).map(date => ({
    date,
    count: uploadHistory[date]
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <Card className="max-w-5xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>Riwayat Unggahan</CardTitle>
        <CardDescription>Jumlah file yang berhasil diunggah setiap harinya.</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        {data.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Belum ada data unggahan.
          </div>
        ) : (
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="date" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip 
                  cursor={{ fill: 'var(--muted)' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                />
                <Bar 
                  dataKey="count" 
                  fill="currentColor" 
                  radius={[4, 4, 0, 0]} 
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
