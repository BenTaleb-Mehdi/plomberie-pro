<?php
// app/Rules/NotSunday.php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class NotSunday implements ValidationRule
{
    /**
     * Vérifier que la date n'est pas un dimanche.
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (date('N', strtotime($value)) == 7) {
            $fail('Nous n\'intervenons pas le dimanche. Veuillez choisir un autre jour.');
        }
    }
}
