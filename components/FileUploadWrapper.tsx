'use client'
import React from 'react'
import FileUpload from './FileUpload'

interface FileUploadWrapperProps {
    onChange: (url?: string) => void
    value: string
    endpoint: "messageFile" | "serverImage"
}

const FileUploadWrapper = (props: FileUploadWrapperProps) => {
    return (
        <div className="uploadthing-wrapper">
            <FileUpload {...props} />
        </div>
    )
}

export default FileUploadWrapper
