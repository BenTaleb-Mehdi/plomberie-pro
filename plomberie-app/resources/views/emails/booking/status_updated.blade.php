@component('mail::message')
# Mise à jour de votre réservation

Bonjour **{{ $booking->client_name }}**,

Le statut de votre réservation **#{{ $confirmationCode }}** a été mis à jour.

## Nouveau statut : **{{ $newStatusLabel }}**

@if($booking->status->value === 'confirmed')
@component('mail::panel')
Votre réservation est maintenant **confirmée**. Un technicien vous contactera prochainement pour l'intervention prévue le **{{ $booking->booking_date->format('d/m/Y') }}** à **{{ $booking->booking_time }}**.
@endcomponent
@elseif($booking->status->value === 'cancelled')
@component('mail::panel')
Votre réservation a été **annulée**. Si vous pensez qu'il s'agit d'une erreur, n'hésitez pas à nous contacter.
@endcomponent
@endif

@component('mail::button', ['url' => route('booking.confirm', $confirmationCode), 'color' => 'primary'])
Voir les détails
@endcomponent

Merci de votre confiance,<br>
**L'équipe Plomberie Pro Maroc**

*Tél: +212 6XX XXX XXX | Email: contact@plomberiepro.ma*
@endcomponent
