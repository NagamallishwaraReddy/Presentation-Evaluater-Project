import React, { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import Header from './components/Header.jsx'
import UploadBox from './components/UploadBox.jsx'
import UploadGuidelines from './components/UploadGuidelines.jsx'
import SelectedFile from './components/SelectedFile.jsx'
import AcceptedFileTypes from './components/AcceptedFileTypes.jsx'

// Default sample file shown so the page matches the reference design on load.
const DEFAULT_FILE = {
  name: 'Sample Presentation.pptx',
  size: 2.45 * 1024 * 1024,
  type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
}

function App() {
  const [selectedFile, setSelectedFile] = useState(DEFAULT_FILE)
  const [errorMessage, setErrorMessage] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleFileSelected = (file) => {
    setSelectedFile(file)
    setUploadSuccess(false)
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setUploadSuccess(false)
    setErrorMessage('')
  }

  const handleUploadFile = () => {
    if (!selectedFile || isUploading) return
    setIsUploading(true)
    setUploadSuccess(false)

    // Mock upload simulation - no backend involved.
    setTimeout(() => {
      setIsUploading(false)
      setUploadSuccess(true)
    }, 1800)
  }

  return (
    <div className="page">
      <Header />

      <main className="main-content">
        <div className="page-heading">
          <h1>Upload Presentation</h1>
          <p>Upload your presentation file (PPT, PDF) or video (MP4) for evaluation</p>
        </div>

        {errorMessage && (
          <div className="error-banner">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="upload-section">
          <UploadBox onFileSelected={handleFileSelected} onError={setErrorMessage} />
          <UploadGuidelines />
        </div>

        <SelectedFile
          file={selectedFile}
          onRemove={handleRemoveFile}
          onUpload={handleUploadFile}
          isUploading={isUploading}
          uploadSuccess={uploadSuccess}
        />

        <AcceptedFileTypes />
      </main>
    </div>
  )
}

export default App
