<?php
namespace Database\Factories;

use App\Models\ServiceType;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    public function definition(): array
    {
        $statuses = ['pending','confirmed','in_progress','completed','cancelled'];
        $times    = ['08:00','09:00','10:00','11:00','14:00','15:00','16:00','17:00'];
        $cities   = ['Tanger','Tétouan','Al Hoceïma','Larache','Chefchaouen'];

        return [
            'confirmation_code' => 'PLB-' . strtoupper($this->faker->unique()->lexify('??????')),
            'client_name'       => $this->faker->name(),
            'client_phone'      => '06' . $this->faker->numerify('########'),
            'client_email'      => $this->faker->unique()->safeEmail(),
            'client_address'    => $this->faker->streetAddress(),
            'city'              => $this->faker->randomElement($cities),
            'service_type_id'   => ServiceType::inRandomOrder()->first()?->id ?? ServiceType::factory(),
            'booking_date'      => $this->faker->dateTimeBetween('now', '+30 days')->format('Y-m-d'),
            'booking_time'      => $this->faker->randomElement($times),
            'status'            => $this->faker->randomElement($statuses),
            'notes'             => $this->faker->optional()->sentence(),
        ];
    }
}
