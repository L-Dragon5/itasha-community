<?php

namespace App\Http\Controllers;

use App\Models\Designer;
use App\Http\Requests\StoreDesignerRequest;
use App\Http\Requests\UpdateDesignerRequest;
use Inertia\Inertia;

class DesignerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $designers = Designer::where('is_approved', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('Public/Designers', [
            'designers' => $designers,
        ]);
    }

    /**
     * Display a listing of the resource on admin page.
     * 
     * @return \Illuminate\Http\Response
     */
    public function adminIndex()
    {
        $designers = Designer::orderBy('created_at')
            ->get();

        return Inertia::render('Admin/Designers', [
            'designers' => $designers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreDesignerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDesignerRequest $request)
    {
        $designer = Designer::create($request->validated());

        return redirect()->back()->with('success', 'Successfully submitted designer');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Designer  $designer
     * @return \Illuminate\Http\Response
     */
    public function show(Designer $designer)
    {
        //
    }

    /**
     * Approve the specified resource in storage.
     * 
     * @param \App\Models\Designer  $designer
     * @return \Illuminate\Http\Response
     */
    public function approve(Designer $designer)
    {
        $designer->update(['is_approved' => 1]);

        return redirect()->back()->with('success', 'Successfully approved designer');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDesignerRequest  $request
     * @param  \App\Models\Designer  $designer
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDesignerRequest $request, Designer $designer)
    {
        $designer->update($request->validated());

        return redirect()->back()->with('success', 'Successfully updated designer');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Designer  $designer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Designer $designer)
    {
        $designer->delete();

        return redirect()->back()->with('success', 'Successfully deleted designer');
    }
}
