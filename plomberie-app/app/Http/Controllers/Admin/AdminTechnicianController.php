<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Technician;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;

class AdminTechnicianController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Technicians/Index', [
            'technicians' => Technician::with('user')->withCount('bookings')->latest()->paginate(15)
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'specialty' => 'nullable|string|max:100',
            'zone' => 'nullable|string|max:100',
            'bio' => 'nullable|string',
            'is_available' => 'boolean',
        ]);

        DB::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $user->assignRole('technician');

            $user->technician()->create([
                'specialty' => $request->specialty,
                'zone' => $request->zone,
                'bio' => $request->bio,
                'is_available' => $request->is_available ?? true,
            ]);
        });

        return back()->with('success', 'Technicien créé avec succès.');
    }

    public function update(Request $request, Technician $technician): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($technician->user_id)],
            'password' => 'nullable|string|min:8',
            'specialty' => 'nullable|string|max:100',
            'zone' => 'nullable|string|max:100',
            'bio' => 'nullable|string',
            'is_available' => 'boolean',
        ]);

        DB::transaction(function () use ($request, $technician) {
            $userData = [
                'name' => $request->name,
                'email' => $request->email,
            ];

            if ($request->filled('password')) {
                $userData['password'] = Hash::make($request->password);
            }

            $technician->user->update($userData);

            $technician->update([
                'specialty' => $request->specialty,
                'zone' => $request->zone,
                'bio' => $request->bio,
                'is_available' => $request->is_available,
            ]);
        });

        return back()->with('success', 'Technicien mis à jour.');
    }

    public function destroy(Technician $technician): RedirectResponse
    {
        DB::transaction(function () use ($technician) {
            $user = $technician->user;
            $technician->delete();
            $user->delete();
        });

        return back()->with('success', 'Technicien supprimé.');
    }
}
