<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\ServiceType;
use Inertia\Inertia;
use Inertia\Response;

class ServicesController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/Services/Index', [
            'services' => ServiceType::active()->get(),
        ]);
    }

    public function show(ServiceType $serviceType): Response
    {
        return Inertia::render('Public/Services/Show', [
            'service' => $serviceType,
        ]);
    }
}
