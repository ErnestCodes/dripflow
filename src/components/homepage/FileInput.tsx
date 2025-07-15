'use client';

import { UploadCloud, File as FileIcon, X } from 'lucide-react';

interface FileInputProps {
  files: File[];
  onFilesChange: (files: File[], dataUris: string[]) => void;
  accept?: string;
}

export function FileInput({ files, onFilesChange, accept }: FileInputProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedFiles = event.target.files;
    if (newSelectedFiles) {
      const newFiles = Array.from(newSelectedFiles);
      const allFiles = [...files, ...newFiles].filter(
        (file, index, self) =>
          index ===
          self.findIndex((f) => f.name === file.name && f.size === file.size)
      );

      const filePromises = allFiles.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(filePromises).then((dataUris) => {
        onFilesChange(allFiles, dataUris);
      });
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);

    const filePromises = newFiles.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises).then((dataUris) => {
      onFilesChange(newFiles, dataUris);
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor={accept}
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          </div>
          <input
            id={accept}
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
            accept={accept}
          />
        </label>
      </div>
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Selected Files:</h4>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-2 text-sm rounded-md bg-muted"
              >
                <div className="flex items-center gap-2 truncate">
                  <FileIcon className="w-4 h-4" />
                  <span className="truncate">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 rounded-full hover:bg-muted-foreground/20"
                >
                  <X className="w-4 h-4" />
                  <span className="sr-only">Remove file</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
