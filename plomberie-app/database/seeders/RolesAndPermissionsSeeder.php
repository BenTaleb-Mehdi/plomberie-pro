<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Vider le cache des permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // ── Créer toutes les permissions ─────────────────────────
        $permissions = [
            'view bookings',
            'create bookings',
            'edit bookings',
            'delete bookings',
            'cancel bookings',
            'assign technician',
            'view clients',
            'manage clients',
            'view technicians',
            'manage technicians',
            'manage services',
            'view reports',
            'manage settings',
            'view contacts',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Rôle Admin — accès total
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());

        // Rôle Technicien — accès limité à ses propres interventions
        $technician = Role::firstOrCreate(['name' => 'technician']);
        $technician->givePermissionTo([
            'view bookings',
            'edit bookings',
        ]);

        // Rôle Client — accès à ses propres réservations seulement
        $client = Role::firstOrCreate(['name' => 'client']);
        $client->givePermissionTo([
            'create bookings',
            'view bookings',
            'cancel bookings',
        ]);
    }
}
