<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;

// Este Listener es para que el jwt nos devuelva los datos que le pidamos a parte del token
class AuthenticationSuccessListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        // Aquí añadimos los campos que queremos que React reciba
        $data['email'] = $user->getUserIdentifier();
        $data['name'] = $user->getName();
        $data['lastName'] = $user->getLastName();
        $data['role'] = $user->getRoles();

        // Usamos una comprobación de seguridad para la foto
        $data['picture_route'] = method_exists($user, 'getPictureRoute') ? $user->getPictureRoute() : "";

        $event->setData($data);
    }
}