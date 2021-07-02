<?php

namespace App\Http\Controllers;


use App\Models\Bulletin;
use Illuminate\Http\Request;
use App\Http\Resources\Bulletin as BulletinResource;


class BulletinsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     *
     */
    public function index()
    {
        return BulletinResource::collection(Bulletin::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $bulletin = new Bulletin();
        $bulletin->title = $request->input('title');


        if($request->hasFile('image')){
            $file = $request->file('image');
            $filename = $file->getClientOriginalName();
            $finalName = date('His') . '-' . $filename;
            $bulletin->image_path = $request->file('image')->storeAs('Bulletin_images', $finalName);
        }
        if($request->hasFile('pdf')){
            $file = $request->file('pdf');
            $filename = $file->getClientOriginalName();
            $finalName = date('His') . '-' . $filename;
            $bulletin->pdf_path = $request->file('pdf')->storeAs('Bulletin_documents', $finalName);
        }
        $bulletin->save();

        return response()->json([
           'data' => 'Biuletyn dodany'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Bulletin::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $bulletin = Bulletin::find($id);

        $bulletin->title = $request->input('title');

        if($request->hasFile('image')){
            $file = $request->file('image');
            $filename = $file->getClientOriginalName();
            $finalName = date('His') . '-' . $filename;
            $bulletin->image_path = $request->file('image')->storeAs('Bulletin_images', $finalName);
        }
        if($request->hasFile('pdf')){
            $file = $request->file('pdf');
            $filename = $file->getClientOriginalName();
            $finalName = date('His') . '-' . $filename;
            $bulletin->pdf_path = $request->file('pdf')->storeAs('Bulletin_documents', $finalName);
        }

        $bulletin->save();

        return response()->json([
            'data' => 'Edycja udana'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $bulletin = Bulletin::where('id',$id)->delete();
        if($bulletin){
            return ['result' => 'produkt usuniety'];
        }else{
            return ['result' => 'nie udalo sie usunac produktu'];
        }
    }
        public function search($key){
        return Bulletin::query()
            ->where('title','Like', "%$key%")
            ->get();
    }
}
