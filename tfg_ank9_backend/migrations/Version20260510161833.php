<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260510161833 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE gallery DROP FOREIGN KEY `FK_472B783A634DFEB`');
        $this->addSql('DROP INDEX IDX_472B783A634DFEB ON gallery');
        $this->addSql('ALTER TABLE gallery ADD updated_at DATETIME DEFAULT NULL, DROP dog_id, CHANGE imgvideo_route imgvideo_route VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE gallery ADD dog_id INT DEFAULT NULL, DROP updated_at, CHANGE imgvideo_route imgvideo_route VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE gallery ADD CONSTRAINT `FK_472B783A634DFEB` FOREIGN KEY (dog_id) REFERENCES dog (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_472B783A634DFEB ON gallery (dog_id)');
    }
}
