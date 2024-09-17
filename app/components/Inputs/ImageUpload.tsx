"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

function ImageUpload({ onChange, value }: ImageUploadProps) {
    const handleUpload = (imgObj: any) => {
        onChange(imgObj.info.secure_url);
    };

    return (
        <CldUploadWidget
            uploadPreset="tz75dxvw"
            onSuccess={(result, { widget }) => {
                handleUpload(result);
                widget.close();
            }}
        >
            {({ open }) => {
                return (
                    <button
                        className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                        onClick={() => open?.()}
                    >
                        <TbPhotoPlus size={50} />
                        <div className="font-semibold text-lg">
                            Clock to upload
                        </div>
                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    src={value}
                                    alt="Upload"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </button>
                );
            }}
        </CldUploadWidget>
    );
}

export default ImageUpload;
