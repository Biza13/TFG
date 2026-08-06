<?php

namespace App\Email;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class BrevoMailer
{
    public function __construct(private HttpClientInterface $httpClient, private string $apiKey) {}

    public function send(string $toEmail, string $toName, string $subject, string $htmlContent): void
    {
        $this->httpClient->request('POST', 'https://api.brevo.com/v3/smtp/email', [
            'headers' => [
                'api-key' => $this->apiKey,
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'sender' => ['name' => 'AnK9', 'email' => 'begonyaduck@gmail.com'],
                'to' => [['email' => $toEmail, 'name' => $toName]],
                'subject' => $subject,
                'htmlContent' => $htmlContent,
            ],
        ]);
    }
}