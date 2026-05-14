<?php

namespace App\Controller;

use App\Entity\Gallery;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class CreateGalleryAction extends AbstractController
{
    public function __invoke(Request $request, EntityManagerInterface $em): JsonResponse
    {
        // Extraemos el archivo que viene de React (La imagen)
        $uploadedFile = $request->files->get('imageFile');

        if (!$uploadedFile) {
            throw new BadRequestHttpException('El archivo "imageFile" es obligatorio.');
        }

        // Creamos una nueva instancia
        $gallery = new Gallery();

        // Rellenamos los datos con lo que viene de react
        $gallery->setImageFile($uploadedFile);
        $gallery->setText($request->request->get('text'));
        $gallery->setType($request->request->get('type', 'image'));
        
        // Sincronizamos la fecha de actualización
        $gallery->setUpdatedAt(new \DateTime());

        // Como API Platform no sabe qué estamos haciendo (porque desactivamos el deserialize, por las imagenes),
        // tenemos que decirle a Doctrine que guarde este objeto.
        try {
            $em->persist($gallery); 
            $em->flush();           
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Error en la base de datos: ' . $e->getMessage()], 500);
        }

        // F. RESPUESTA MANUAL
        // Devolvemos un JSON que React pueda entender con un código 201 (Creado)
        return new JsonResponse([
            'message' => '¡Imagen añadida con éxito!',
            'id' => $gallery->getId()
        ], 201);
    }
}