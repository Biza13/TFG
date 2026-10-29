<?php

namespace App\Service;

use Cloudinary\Cloudinary;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/* Este archivo es para que se guarden los archivos como las fotos y videos */
class CloudinaryService
{
    private Cloudinary $cloudinary;

    public function __construct()
    {
        $this->cloudinary = new Cloudinary();
    }

    public function upload(UploadedFile $file, string $folder = 'ank9'): string
    {
        $result = $this->cloudinary->uploadApi()->upload($file->getPathname(), [
            'folder'        => $folder,
            'resource_type' => 'auto',
        ]);

        return $result['secure_url'];
    }
}