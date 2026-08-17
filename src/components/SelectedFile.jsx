import React from 'react'
import {
  FileText,
  Trash2,
  UploadCloud,
  HardDrive,
  FileType,
  Loader2,
  CheckCircle2,
} from 'lucide-react'

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function getFileLabel(fileName) {
  const extension = fileName.slice(fileName.lastIndexOf('.') + 1).toUpperCase()
  switch (extension) {
    case 'PPT':
      return 'PPT Presentation'
    case 'PPTX':
      return 'PPTX Presentation'
    case 'PDF':
      return 'PDF Document'
    case 'MP4':
      return 'MP4 Video'
    default:
      return 'File'
  }
}

function SelectedFile({ file, onRemove, onUpload, isUploading, uploadSuccess }) {
  if (!file) return null

  return (
    <section className="selected-file-section">
      <h3 className="section-label">Selected File</h3>

      <div className="selected-file-card">
        <div className="selected-file-info">
          <div className="selected-file-icon">
            <FileText size={22} />
          </div>
          <div className="selected-file-meta">
            <p className="selected-file-name">{file.name}</p>
            <p className="selected-file-type-label">{getFileLabel(file.name)}</p>
            <div className="selected-file-details">
              <span>
                <HardDrive size={12} />
                Size: {formatFileSize(file.size)}
              </span>
              <span>
                <FileType size={12} />
                Type: {file.type}
              </span>
            </div>
          </div>
        </div>

        <button
          className="btn btn-danger-outline"
          type="button"
          onClick={onRemove}
          disabled={isUploading}
        >
          <Trash2 size={14} />
          <span>Remove</span>
        </button>
      </div>

      <div className="selected-file-actions">
        <button
          className="btn btn-primary"
          type="button"
          onClick={onUpload}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 size={16} className="spin-icon" />
              <span>Uploading...</span>
            </>
          ) : uploadSuccess ? (
            <>
              <CheckCircle2 size={16} />
              <span>Uploaded</span>
            </>
          ) : (
            <>
              <UploadCloud size={16} />
              <span>Upload File</span>
            </>
          )}
        </button>
      </div>
    </section>
  )
}

export default SelectedFile
