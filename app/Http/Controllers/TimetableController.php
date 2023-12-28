<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Models\Preference;
use Inertia\Inertia;
use Inertia\Response;

class PreferencesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $preferences = Preference::whereNot('name', 'reviewTime')->get();
        
        return Inertia::render('Admin/Preferences', [
            'preferences' => (object)$preferences
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $preference = Preference::find($id);
        if (empty($preference)) {
            return back()->withErrors('Няма такава настройка.');
        }

        if ($preference->value == $request->get('preferance_value')) {
            return back()->withErrors('Новата стойност трябва да бъде различна от старата');
        }

        $preference->value = $request->get('preferance_value');
        $preference->save();
        
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
