<?php

namespace App\Email;

use App\Entity\User;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mime\Address;
use SymfonyCasts\Bundle\VerifyEmail\Model\VerifyEmailSignatureComponents;

class VerificationEmail
{
    public static function create(User $user, VerifyEmailSignatureComponents $signatureComponents): TemplatedEmail
    {
        return (new TemplatedEmail())
            ->from(new Address('begonyaduck@gmail.com', 'AnK9'))
            ->to((string) $user->getEmail())
            ->subject('Confirma tu correo electrónico')
            ->htmlTemplate('emails/verification.html.twig')
            ->context([
                'signedUrl' => $signatureComponents->getSignedUrl(),
                'expiresAt' => $signatureComponents->getExpiresAt(),
                'user' => $user,
            ]);
    }
}