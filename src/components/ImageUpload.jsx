import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, X } from 'lucide-react';

const ImageUpload = ({ onUpload, existingImages = [] }) => {
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState(existingImages);

    const handleUpload = async (event) => {
        try {
            setUploading(true);
            const files = event.target.files;
            if (!files || files.length === 0) return;

            const newImages = [];

            for (const file of files) {
                if (file.size > 5 * 1024 * 1024) {
                    alert(`File ${file.name} is too big (max 5MB)`);
                    continue;
                }

                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `properties/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('properties')
                    .upload(filePath, file);

                if (uploadError) {
                    throw uploadError;
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('properties')
                    .getPublicUrl(filePath);

                newImages.push(publicUrl);
            }

            const updatedImages = [...images, ...newImages];
            setImages(updatedImages);
            onUpload(updatedImages);
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        onUpload(updatedImages);
    };

    return (
        <div>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                    </div>
                    <input type="file" className="hidden" multiple accept="image/png, image/jpeg" onChange={handleUpload} disabled={uploading} />
                </label>
            </div>

            {uploading && <p className="mt-2 text-sm text-blue-600">Uploading...</p>}

            <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4">
                {images.map((url, index) => (
                    <div key={index} className="relative group">
                        <img src={url} alt={`Uploaded ${index}`} className="h-24 w-full object-cover rounded-md" />
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUpload;
