<?php

namespace App\Http\Controllers;


use App\Models\MagazineFile;
use App\Http\Resources\MagazineFiles as MagazineFilesResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MagazineFilesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     *
     */
    public function index()
    {
        return MagazineFilesResource::collection(MagazineFile::all());
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $file = MagazineFile::find($id);
        Storage::delete($file->pdf_path);
        $fileDelete = MagazineFile::where('id',$id)->delete();

        if($fileDelete){
            return ['result' => 'plik usuniety'];
        }else{
            return ['result' => 'nie udalo sie usunac pliku '];
        }
    }
}
