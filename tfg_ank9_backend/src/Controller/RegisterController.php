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
#use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Attribute\Route;

class RegisterController extends AbstractController{

    // 1. FUNCIÓN PARA REGISTRAR SOLO AL USUARIO
    #[Route('/api/register-user', name: 'app_register_user', methods: ['POST'])]
    public function registerUser(Request $request, UserPasswordHasherInterface $hasher, EntityManagerInterface $em): Response
    {
        // Extraemos los textos del formData de react ($request->request)
        $email = $request->request->get('email');
        $password = preg_replace('/\s+/', '', $request->request->get('password'));
        $name = $request->request->get('fullName');

        // Extraemos los archivos del formData de react ($request->files)
        //Para lo que necesitaremos instalar VichUploaderBundle, sino hay que hacerlo de forma manual (mucho mas código)
        $personImg = $request->files->get('imageFile');

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

        // Validar que estan todos los datos obligatorios
        if (!$email || !$password || !$name) {
            return new JsonResponse(['error' => 'Faltan datos obligatorios del usuario'], 400);
        }

        // Crar y configurar la entidad User
        $user = new User();
        $user->setEmail($email);
        $user->setName($name);
        $user->setRoles(['ROLE_USER']);

        // Hashear la contraseña
        $hashedPassword = $hasher->hashPassword($user, $password);
        $user->setPassword($hashedPassword);

        if ($personImg) {
            $user->setImageFile($personImg);
        }

        // Guardad Usuario en la BD
        try {
            $em->persist($user);
            $em->flush();
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'El email ya está registrado o hubo un error'], 409);
        }

        return new JsonResponse([
            'status' => 'Usuario registrado!',
            'userId' => $user->getId() 
        ], 201);
    }

    // FUNCIÓN PARA REGISTRAR AL PERRO Y VINCULARLO
    #[Route('/api/register-dog', name: 'app_register_dog', methods: ['POST'])]
    public function registerDog(Request $request, EntityManagerInterface $em): Response
    {

        // Conseguit el id del usuario con el token
        /** @var User $user */
        $user = $this->getUser();

        // Si el token no es válido o no existe, $user será null
        if (!$user) {
            return new JsonResponse(['error' => 'No autorizado. Debes estar logueado.'], 401);
        }

        // Extraer los datos del formulario de React
        $dogName = $request->request->get('dogName');
        $breed = $request->request->get('breed');
        $dogImg = $request->files->get('dogImageFile');

        if (!$dogName) {
            return new JsonResponse(['error' => 'Faltan el nombre del perro'], 400);
        }

        $dog = new Dog();
        $dog->setName($dogName);
        $dog->setBreed($request->request->get('breed'));
        $dog->setUser($user); // Le asignamos el dueño con el token

        if ($dogImg) {
            $dog->setImageFile($dogImg);
        }

        $em->persist($dog);
        $em->flush();

        return new JsonResponse(['status' => 'Perro registrado con éxito!'], 201);
    }

    // Función para borrar usuario
    #[Route('/api/user/{id}', name: 'app_user_delete', methods: ['DELETE'])]
    public function deleteUser(int $id, EntityManagerInterface $em): Response
    {
        $user = $em->getRepository(User::class)->find($id);

        if (!$user) {
            return new JsonResponse(['error' => 'Usuario no encontrado'], 404);
        }

        $em->remove($user);
        $em->flush();

        return new JsonResponse(['status' => 'Usuario y datos eliminados correctamente!'], 200);
    }

    // Metodo temporal para comprobar el hasher
    /* #[Route('/api/test-password', name: 'test_password')]
    public function testPassword(UserPasswordHasherInterface $hasher): Response
    {
        $user = new User();
        $passwordQueYoEscribo = "123456"; // Pon aquí lo que escribes en el input
        
        // El hash que ves en el JSON de la API para Pepito (CÓPIALO TAL CUAL)
        $hashDeLaBD = '$2y$13$f5.C7cLw083jnN05iqciDOag3Gc4e3OsMAZFPxP1peYxDhban5v7i'; 

        $esValida = $hasher->isPasswordValid($user, $passwordQueYoEscribo, $hashDeLaBD);

        return new JsonResponse([
            'coincide' => $esValida,
            'algoritmo_esperado' => 'bcrypt/auto',
            'hash_en_bd' => $hashDeLaBD
        ]);
    } */
}