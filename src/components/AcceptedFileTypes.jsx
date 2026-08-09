import React from 'react'
import { FileCheck2, FileText, Video } from 'lucide-react'

const fileTypes = [
  { label: 'PPT', extension: '.ppt', colorClass: 'icon-bg-orange' },
  { label: 'PPTX', extension: '.pptx', colorClass: 'icon-bg-green' },
  { label: 'PDF', extension: '.pdf', colorClass: 'icon-bg-red' },
  { label: 'MP4', extension: '.mp4', colorClass: 'icon-bg-blue' },
]

function AcceptedFileTypes() {
  return (
    <section className="accepted-card">
      <div className="accepted-header">
        <FileCheck2 size={16} className="accepted-header-icon" />
        <h3>Accepted File Types</h3>
      </div>

      <div className="accepted-grid">
        {fileTypes.map((item) => {
          const Icon = item.extension === '.mp4' ? Video : FileText
          return (
            <div className="accepted-item" key={item.label}>
              <span className={`accepted-icon ${item.colorClass}`}>
                <Icon size={18} />
              </span>
              <span>
                <span className="accepted-title">{item.label}</span>
                <span className="accepted-subtitle">{item.extension}</span>
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default AcceptedFileTypes
