<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ServiceType;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/Home', [
            'services' => ServiceType::active()->take(6)->get(),
            'featuredProjects' => Project::featured()->latest()->take(3)->get(),
        ]);
    }
}
