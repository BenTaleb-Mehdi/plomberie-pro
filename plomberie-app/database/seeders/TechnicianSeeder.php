<?php
namespace Database\Seeders;

use App\Models\Technician;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TechnicianSeeder extends Seeder
{
    public function run(): void
    {
        $technicians = [
            ['name' => 'Khalid Amrani', 'email' => 'khalid@plomberiepro.ma', 'specialty' => 'Fuite d\'eau', 'zone' => 'Tanger'],
            ['name' => 'Youssef Benali', 'email' => 'youssef@plomberiepro.ma', 'specialty' => 'Installation', 'zone' => 'Tétouan'],
            ['name' => 'Hassan Idrissi', 'email' => 'hassan@plomberiepro.ma', 'specialty' => 'Débouchage', 'zone' => 'Al Hoceïma'],
        ];

        foreach ($technicians as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'name'              => $data['name'],
                    'password'          => Hash::make('Tech@2025!'),
                    'email_verified_at' => now(),
                ]
            );
            $user->assignRole('technician');

            Technician::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'specialty'    => $data['specialty'],
                    'zone'         => $data['zone'],
                    'is_available' => true,
                ]
            );
        }
    }
}
