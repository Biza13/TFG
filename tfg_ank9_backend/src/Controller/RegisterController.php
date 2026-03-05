<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Dog;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegisterController extends AbstractController{

    #[Route('/api/register-family', name: 'app_register_family', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $hasher, EntityManagerInterface $em): Response
    {
        // Extraemos los textos del formData de react ($request->request)
        $email = $request->request->get('email');
        $password = $request->request->get('password');
        $name = $request->request->get('fullName');
        
        // Extraemos los archivos del formData de react ($request->files)
        //Para lo que necesitaremos instalar VichUploaderBundle, sino hay que hacerlo de forma manual (mucho mas código)
        $personImg = $request->files->get('imageFile');
        $dogImg = $request->files->get('dogImageFile');

        // De no tener el VichUploaderBundle instalado deberiamos de hacer esto:
        /* if ($personImg) {
            // Generar un nombre único: e3f1...jpg
            $newFilename = uniqid().'.'.$personImg->guessExtension();

            // Movemos el archivo a la carpeta public/uploads/users en este caso porque es la imagen del usuario
            $personImg->move(
                $this->getParameter('kernel.project_dir').'/public/uploads/users',
                $newFilename
            );

            // Guardamos SOLO el nombre (string) en la base de datos
            $user->setImageName($newFilename); 
        } */

        // 3. Crear y configurar la entidad USER
        $user = new User();
        $user->setEmail($email);
        $user->setName($name);
        $user->setPassword($hasher->hashPassword($user, $password));

        if ($personImg) {
            $user->setImageFile($personImg);
        }
        
        // 4. Crear y configurar la entidad DOG
        $dog = new Dog();
        $dog->setName($request->request->get('dogName'));
        $dog->setBreed($request->request->get('breed'));
        $dog->setUser($user); // Establecemos la relación

        if ($dogImg) {
            $dog->setImageFile($dogImg);
        }

        // 5. Guardar todo en la BD
        $em->persist($user);
        $em->persist($dog);
        $em->flush();

        return new JsonResponse(['status' => 'Familia registrada!'], 201);
    }

}