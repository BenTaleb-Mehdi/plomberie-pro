<?php
namespace Database\Seeders;

use App\Models\ServiceType;
use Illuminate\Database\Seeder;

class ServiceTypeSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['name' => 'Fuite d\'eau', 'description' => 'Détection et réparation de fuites sur canalisations, joints et robinetterie.', 'duration_minutes' => 60, 'icon' => 'droplets', 'is_active' => true],
            ['name' => 'Débouchage', 'description' => 'Débouchage de canalisations, évier, douche, WC et colonnes.', 'duration_minutes' => 90, 'icon' => 'wrench', 'is_active' => true],
            ['name' => 'Installation sanitaire', 'description' => 'Installation et remplacement de lavabo, douche, baignoire, WC.', 'duration_minutes' => 120, 'icon' => 'zap', 'is_active' => true],
            ['name' => 'Chauffe-eau', 'description' => 'Installation, réparation et entretien de chauffe-eau électrique ou solaire.', 'duration_minutes' => 90, 'icon' => 'thermometer', 'is_active' => true],
            ['name' => 'Robinetterie', 'description' => 'Réparation et remplacement de robinets, mitigeurs et accessoires.', 'duration_minutes' => 45, 'icon' => 'wrench', 'is_active' => true],
            ['name' => 'Détection de fuite', 'description' => 'Inspection professionnelle pour localiser les fuites cachées.', 'duration_minutes' => 60, 'icon' => 'search', 'is_active' => true],
        ];

        foreach ($services as $service) {
            ServiceType::updateOrCreate(['name' => $service['name']], $service);
        }
    }
}
