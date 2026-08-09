import React from 'react'
import { Info, FileText, Video, Sparkle, Copy } from 'lucide-react'

const guidelines = [
  {
    icon: FileText,
    title: 'PPT / PPTX / PDF',
    subtitle: 'Max file size: 20MB',
  },
  {
    icon: Video,
    title: 'MP4 Video',
    subtitle: 'Max file size: 200MB',
  },
  {
    icon: Sparkle,
    title: 'Ensure good quality',
    subtitle: 'For better evaluation results',
  },
  {
    icon: Copy,
    title: 'One file at a time',
    subtitle: 'You can upload another after finishing',
  },
]

function UploadGuidelines() {
  return (
    <div className="guidelines-card">
      <div className="guidelines-header">
        <Info size={16} className="guidelines-header-icon" />
        <h3>Upload Guidelines</h3>
      </div>

      <ul className="guidelines-list">
        {guidelines.map((item) => {
          const Icon = item.icon
          return (
            <li className="guideline-item" key={item.title}>
              <span className="guideline-icon">
                <Icon size={16} />
              </span>
              <span>
                <span className="guideline-title">{item.title}</span>
                <span className="guideline-subtitle">{item.subtitle}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default UploadGuidelines
