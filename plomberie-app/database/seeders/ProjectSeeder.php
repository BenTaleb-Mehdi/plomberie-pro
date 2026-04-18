<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Rénovation Résidence Tanger',
                'description' => 'Installation complète d\'un système de plomberie moderne avec tuyauterie multicouche et robinetterie de luxe dans une villa de 400m².',
                'main_image' => 'https://images.unsplash.com/photo-1542013976693-8b49e173e658?q=80&w=2070&auto=format&fit=crop',
                'gallery' => [
                    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1620626011761-9963d7b69763?q=80&w=2070&auto=format&fit=crop'
                ],
                'category' => 'Installation Rénovation',
                'is_featured' => true,
            ],
            [
                'title' => 'Urgence Fuite Industrielle',
                'description' => 'Intervention chirurgicale sur une canalisation de gros diamètre dans une usine à la zone franche de Tanger. Réparation effectuée en 2h sans arrêt de production.',
                'main_image' => 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop',
                'gallery' => [],
                'category' => 'Dépannage Urgent',
                'is_featured' => true,
            ],
            [
                'title' => 'Maintenance Complexe Hôtelier',
                'description' => 'Audit complet et entretien préventif des colonnes montantes et du système de chauffage central pour un hôtel 5 étoiles à Tétouan.',
                'main_image' => 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop',
                'gallery' => [
                    'https://images.unsplash.com/photo-1585938338670-d00cc1476a50?q=80&w=2072&auto=format&fit=crop'
                ],
                'category' => 'Maintenance Préventive',
                'is_featured' => false,
            ],
        ];

        foreach ($projects as $proj) {
            Project::create($proj);
        }
    }
}
