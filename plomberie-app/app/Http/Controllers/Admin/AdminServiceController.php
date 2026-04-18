<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class AdminServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Services/Index', [
            'services' => ServiceType::latest()->paginate(20)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:service_types,slug',
            'description' => 'required|string',
            'duration_minutes' => 'required|integer|min:1',
            'is_active' => 'required|boolean',
            'image' => 'nullable|image|max:2048',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('services', 'public');
        }

        ServiceType::create($validated);

        return back()->with('success', 'Service ajouté avec succès au catalogue.');
    }

    public function update(Request $request, ServiceType $service)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:service_types,slug,' . $service->id,
            'description' => 'required|string',
            'duration_minutes' => 'required|integer|min:1',
            'is_active' => 'required|boolean',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($service->image_path) {
                Storage::disk('public')->delete($service->image_path);
            }
            $validated['image_path'] = $request->file('image')->store('services', 'public');
        }

        $service->update($validated);

        return back()->with('success', 'Configuration du service mise à jour.');
    }

    public function destroy(ServiceType $service)
    {
        if ($service->image_path) {
            Storage::disk('public')->delete($service->image_path);
        }
        $service->delete();
        return back()->with('success', 'Service retiré du catalogue.');
    }

    public function toggle(ServiceType $service)
    {
        $service->update(['is_active' => !$service->is_active]);
        return back()->with('success', 'Visibilité du service mise à jour.');
    }
}
