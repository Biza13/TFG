<?php

namespace App\Entity;

use App\Repository\GalleryRepository;
use Doctrine\ORM\Mapping as ORM;
//uses para la api platform
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Doctrine\DBAL\Types\Types;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: GalleryRepository::class)]
//Para la api platform
#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(),
        new Post(
            // ESTO es lo que soluciona el error 415
            inputFormats: ['multipart' => ['multipart/form-data']]
        ),
    ]
)]
#[Vich\Uploadable]
class Gallery
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $text = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $imgvideo_route = null;

    #[ORM\Column(length: 20)]
    private ?string $type = 'image';

    #[Vich\UploadableField(mapping: 'gallery_images', fileNameProperty: 'imgvideo_route')]
    private ?File $imageFile = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $updatedAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(?string $text): static
    {
        $this->text = $text;

        return $this;
    }

    public function getImgvideoRoute(): ?string
    {
        return $this->imgvideo_route;
    }

    public function setImgvideoRoute(?string $imgvideo_route): static
    {
        $this->imgvideo_route = $imgvideo_route;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function setImageFile(?File $imageFile = null): void
    {
        $this->imageFile = $imageFile;

        if ($imageFile) {
            $this->updatedAt = new \DateTime();
        }
    }

    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }
}
