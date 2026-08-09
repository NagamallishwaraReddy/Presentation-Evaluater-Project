import React, { useRef, useState } from 'react'
import { UploadCloud, FolderOpen } from 'lucide-react'

const ACCEPTED_EXTENSIONS = ['.ppt', '.pptx', '.pdf', '.mp4']
const ACCEPTED_MIME_TYPES = [
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/pdf',
  'video/mp4',
]
const MAX_SIZE_VIDEO = 200 * 1024 * 1024 // 200MB
const MAX_SIZE_DOC = 20 * 1024 * 1024 // 20MB

function getExtension(fileName) {
  const idx = fileName.lastIndexOf('.')
  return idx === -1 ? '' : fileName.slice(idx).toLowerCase()
}

function UploadBox({ onFileSelected, onError }) {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const validateAndSelectFile = (file) => {
    if (!file) return

    const extension = getExtension(file.name)
    const isValidExtension = ACCEPTED_EXTENSIONS.includes(extension)
    const isValidMime =
      ACCEPTED_MIME_TYPES.includes(file.type) || file.type === ''

    if (!isValidExtension || !isValidMime) {
      onError(
        'Invalid file type. Please upload a PPT, PPTX, PDF, or MP4 file.'
      )
      return
    }

    const isVideo = extension === '.mp4'
    const maxSize = isVideo ? MAX_SIZE_VIDEO : MAX_SIZE_DOC

    if (file.size > maxSize) {
      const limitLabel = isVideo ? '200MB' : '20MB'
      onError(`File is too large. Maximum size allowed is ${limitLabel}.`)
      return
    }

    onError('')
    onFileSelected(file)
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files && e.target.files[0]
    validateAndSelectFile(file)
    e.target.value = ''
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files && e.dataTransfer.files[0]
    validateAndSelectFile(file)
  }

  return (
    <div
      className={`upload-box ${isDragging ? 'upload-box-dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="upload-icon-circle">
        <UploadCloud size={32} strokeWidth={2} />
      </div>

      <p className="upload-title">Drag &amp; drop your file here</p>
      <p className="upload-or">or</p>

      <button className="btn btn-primary" type="button" onClick={handleBrowseClick}>
        <FolderOpen size={16} />
        <span>Browse Files</span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".ppt,.pptx,.pdf,.mp4"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />

      <p className="upload-hint">Supported formats: PPT, PPTX, PDF, MP4</p>
      <p className="upload-hint">
        Max file size: 200MB (Videos) / 20MB (PPT, PDF)
      </p>
    </div>
  )
}

export default UploadBox
