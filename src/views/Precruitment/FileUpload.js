
import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import 'primeicons/primeicons.css';
import Lottie from 'react-lottie';
import Completd from './Completd.json';


export default function TemplateDemo({ onFileSelect }) {
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [showLottie, setShowLottie] = useState(false);
    
    const lt1={
        animationData: Completd,
      }
    
    
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = Array.from(e.files);
        let duplicateFiles = [];
    
        // Use the functional form of set state to ensure the latest state
        setSelectedFiles(prevSelectedFiles => {
            // Filter out files that are already selected
            files = files.filter((file) => !prevSelectedFiles.some((selectedFile) => selectedFile.name === file.name && selectedFile.size === file.size));
    
            for (const file of files) {
                if (prevSelectedFiles.some((selectedFile) => selectedFile.name === file.name && selectedFile.size === file.size)) {
                    duplicateFiles.push(file);
                }
            }
    
            if (duplicateFiles.length > 0) {
                duplicateFiles.forEach((file) => {
                    toast.current.show({
                        severity: 'warn',
                        summary: 'Warning',
                        detail: `File '${file.name}' Already Selected`,
                    });
                });
    
                return prevSelectedFiles; // Return the previous state to prevent adding duplicate files
            }
    
            // If no duplicates, update the state
            return [...prevSelectedFiles, ...files];
        });
    
        files.forEach((file) => {
            _totalSize += file.size || 0;
        });
    
        setTotalSize(_totalSize);
        onFileSelect(files);
    };

    const onTemplateUpload = (e) => {
        let _totalSize = 0;
        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });
        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
        onFileSelect(files);
    };

   


    const onTemplateRemove = (file, callback) => {
        const updatedFiles = selectedFiles.filter((selectedFile) => !(selectedFile.name === file.name && selectedFile.size === file.size));
        setSelectedFiles(updatedFiles);

        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
        // Set showLottie to true after clearing files
        setShowLottie(true);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };
 

    const itemTemplate = (file, props) => {
       
        return (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span>
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <div>
                    <Tag style={{ marginBottom: '7px' }} value={props.formatSize} severity="warning" className="px-3 py-2" />
                    <Button
                        type="button"
                        icon="pi pi-times"
                        className="p-button-outlined p-button-rounded p-button-danger ml-auto"
                        onClick={() => onTemplateRemove(file, props.onRemove)}
                    />
                </div>
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                {showLottie ? (
                    <Lottie options={lt1} height="100px" width="100px"/>
                ) : (
                    <>
                        <i style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                        <span style={{ fontSize: '1em', color: 'var(--text-color-secondary)' }} className="my-5">
                            Drag and Drop Image Here
                        </span>
                    </>
                )}
            </div>
        );
    };
    

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    // const uploadOptions = {  iconOnly: false };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
   
    return (
        <div>
            <Toast ref={toast}></Toast>
            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <FileUpload ref={fileUploadRef} name="attachments"   maxFileSize={1000000}
                onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions}  cancelOptions={cancelOptions}  style={{ height:'250px', overflowY: 'auto' }} />
        </div>
    )
}
        