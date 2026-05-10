<?php

namespace App\Controller;

use App\Entity\Service;
use App\Repository\ServiceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

#[Route('/api/services')]
final class ServiceController extends AbstractController
{
    #[Route('', name: 'app_service', methods: ['GET'])]
    public function index(ServiceRepository $serviceRepository): JsonResponse
    {
        $services = $serviceRepository->findAll();
        return $this->json($services, Response::HTTP_OK, [], ['groups' => 'service:read']);
    }

    /* Para añadir un servicio */
    #[Route('/create-service', name: 'create_service', methods: ['POST'])]
    public function createService(Request $request, EntityManagerInterface $em): JsonResponse
    {

        error_log("Nombre recibido: " . $request->request->get('name'));
        error_log("Archivo recibido: " . ($request->files->get('icon') ? 'SÍ' : 'NO'));

        $service = new Service();

        // Extraemos los datos del formData de React
        $service->setName($request->request->get('name'));
        $service->setShortDescription($request->request->get('shortDescription'));
        $service->setDescription($request->request->get('description'));
        $service->setTitleFeatures($request->request->get('titleFeatures'));
        $service->setFeatures($request->request->get('features'));
        $service->setTitleFeatures2($request->request->get('titleFeatures2'));
        $service->setFeatures2($request->request->get('features2'));
        $service->setUpdatedAt(new \DateTime());

        // Extraemos el icono del forData
        $file = $request->files->get('icon');

        if ($file) {
            $service->setImageFile($file);
        }

        // Persistir en la bd
        try {
            $em->persist($service);
            $em->flush();
            return new JsonResponse(['mensaje' => '¡Servicio creado con éxito!'], 201);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/edit-service/{id}', name: 'edit_service', methods: ['POST'])]
    public function editService(int $id, Request $request, ServiceRepository $serviceRepository, EntityManagerInterface $em): JsonResponse{

        $service = $serviceRepository->find($id);

        if (!$service){
            return new JsonResponse(['error' => 'Servicio no encontrado'], 404);
        }

        // Actualizar los campos des servicio actual con los datos que nos manda React (request)
        $service->setName($request->request->get('name'));
        $service->setShortDescription($request->request->get('shortDescription'));
        $service->setDescription($request->request->get('description'));
        $service->setTitleFeatures($request->request->get('titleFeatures'));
        $service->setFeatures($request->request->get('features'));
        $service->setTitleFeatures2($request->request->get('titleFeatures2'));
        $service->setFeatures2($request->request->get('features2'));

        // cambio del Icono (solo si se ha enviado uno nuevo)
        $file = $request->files->get('icon');

        if ($file){
            // Borramos el icono antiguo el vichUploaderBundle lo hace automatico
            $service->setImageFile($file);

            // Forzar la actualización de la fecha de la edición
            $service->setUpdatedAt(new \DateTimeImmutable());
        }

        $em->flush();

        return new JsonResponse(['message' => 'Servicio actualizado con éxito'], 200);

    }

    #[Route('/delete-service/{id}', name: 'delete_service', methods: ['DELETE'])]
    public function deleteService(int $id, Request $request, ServiceRepository $serviceRepository, EntityManagerInterface $em): JsonResponse{

        $service = $serviceRepository->find($id);

        if (!$service){
            return new JsonResponse(['error' => 'Servicio no encontrado'], 404);
        }

        // Preparamos el servicio para ser borrado
        $em->remove($service);
        // Lo borramos
        $em->flush();

        return new JsonResponse(['message' => 'Servicio eliminado con éxito'], 200);

    }
}
