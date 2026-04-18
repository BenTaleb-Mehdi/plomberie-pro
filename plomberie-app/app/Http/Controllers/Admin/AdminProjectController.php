<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ServiceType;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class AdminProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Projects/Index', [
            'projects' => Project::latest()->paginate(16),
            'categories' => ServiceType::active()->pluck('name')->toArray() ?: ['Plomberie Générale', 'Installation Sanitaire', 'Chauffage']
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'             => 'required|string|max:255',
            'description'       => 'required|string',
            'main_image'        => 'required|image|max:5120',
            'gallery'           => 'nullable|array',
            'gallery.*'         => 'image|max:5120',
            'category'          => 'required|string',
            'city'              => 'nullable|string|max:255',
            'intervention_date' => 'nullable|date',
            'is_featured'       => 'boolean',
        ]);

        // Handle Main Image
        if ($request->hasFile('main_image')) {
            $path = $request->file('main_image')->store('projects', 'public');
            $validated['main_image'] = Storage::url($path);
        }

        // Handle Gallery
        if ($request->hasFile('gallery')) {
            $galleryPaths = [];
            foreach ($request->file('gallery') as $image) {
                $path = $image->store('projects/gallery', 'public');
                $galleryPaths[] = Storage::url($path);
            }
            $validated['gallery'] = $galleryPaths;
        }

        Project::create($validated);

        return back()->with('success', 'Nouveau chef-d\'œuvre ajouté au portfolio avec succès.');
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        // Method spoofing check: files only come through if correctly handled
        $validated = $request->validate([
            'title'             => 'required|string|max:255',
            'description'       => 'required|string',
            'main_image'        => 'nullable', 
            'gallery'           => 'nullable|array',
            'category'          => 'required|string',
            'city'              => 'nullable|string|max:255',
            'intervention_date' => 'nullable|date',
            'is_featured'       => 'boolean',
        ]);

        // Handle Main Image Update
        if ($request->hasFile('main_image')) {
            $path = $request->file('main_image')->store('projects', 'public');
            $validated['main_image'] = Storage::url($path);
        } else {
            unset($validated['main_image']);
        }

        // Handle Gallery Update
        if ($request->hasFile('gallery')) {
            $galleryPaths = [];
            foreach ($request->file('gallery') as $image) {
                $path = $image->store('projects/gallery', 'public');
                $galleryPaths[] = Storage::url($path);
            }
            $validated['gallery'] = $galleryPaths;
        } else {
            unset($validated['gallery']);
        }

        $project->update($validated);

        return back()->with('success', 'Détails de l\'intervention mis à jour.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();
        return back()->with('success', 'Réalisation retirée du portfolio.');
    }

    public function toggleFeatured(Project $project): RedirectResponse
    {
        $project->update(['is_featured' => !$project->is_featured]);
        return back()->with('success', 'Statut de mise en avant mis à jour.');
    }
}
