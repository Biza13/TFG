<?php

namespace App\Command;

use App\Entity\Event;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:clean-old-events',
    description: 'Elimina eventos cuya fecha ya ha pasado',
)]
class CleanOldEventsCommand extends Command
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $old = $this->entityManager->getRepository(Event::class)
            ->createQueryBuilder('e')
            ->where('e.dateTime < :now')
            ->setParameter('now', new \DateTime('-1 week'))
            ->getQuery()
            ->getResult();

        foreach ($old as $event) {
            $this->entityManager->remove($event);
        }

        $this->entityManager->flush();

        $output->writeln(count($old) . ' eventos eliminados.');

        return Command::SUCCESS;
    }
}