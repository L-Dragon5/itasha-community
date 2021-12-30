<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use Inertia\Inertia;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $groups = Group::where('is_approved', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('Public/Groups', [
            'groups' => $groups,
        ]);
    }

    /**
     * Display a listing of the resource on admin page.
     * 
     * @return \Illuminate\Http\Response
     */
    public function adminIndex()
    {
        $groups = Group::orderBy('created_at')
            ->get();

        return Inertia::render('Admin/Groups', [
            'groups' => $groups,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreGroupRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreGroupRequest $request)
    {
        $group = Group::create($request->validated());

        return redirect()->back()->with('success', 'Successfully submitted group');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function show(Group $group)
    {
        //
    }

    /**
     * Approve the specified resource in storage.
     * 
     * @param \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function approve(Group $group)
    {
        $group->update(['is_approved' => 1]);

        return redirect()->back()->with('success', 'Successfully approved group');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateGroupRequest  $request
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateGroupRequest $request, Group $group)
    {
        $group->update($request->validated());

        return redirect()->back()->with('success', 'Successfully updated group');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function destroy(Group $group)
    {
        $group->delete();

        return redirect()->back()->with('success', 'Successfully deleted group');
    }
}
