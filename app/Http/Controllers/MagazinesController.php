<?php

namespace App\Http\Controllers;

use App\Models\MagazineFile;
use Illuminate\Http\Request;
use App\Http\Resources\Magazine as MagazineResource;
use App\Models\Magazine;
use Illuminate\Support\Facades\Storage;

class MagazinesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     *
     */
    public function index()
    {
        return MagazineResource::collection(Magazine::all());
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
        $magazine = new Magazine();
        $magazine->title = $request->input('title');
        $magazine->ISSN = $request->input('ISSN');
        $magazine->release = $request->input('release');

        if($request->hasFile('image')){
            $image = $request->file('image');
            $filename = $image->getClientOriginalName();
            $finalName = date('His') . '-' . $filename;
            $magazine->image_path = $request->file('image')->storeAs('Magazine_images', $finalName);
        }
        $magazine->save();

        if($request->hasFile('pdfs')){
            foreach($request->pdfs as $pdf){
                $filename = $pdf->getClientOriginalName();
                $finalName = date('His') . '-' . $filename;


                $file = new MagazineFile();
                $file->magazine_id = $magazine->id;
                $file->pdf_path = $pdf->storeAs('Magazine_documents',$finalName);
                $file->save();
            }
        }


        return response()->json([
            'data' => 'Magazyn dodany'
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
        return Magazine::with(['magazineFiles'])->find($id);

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
        $magazine = Magazine::find($id);

        $magazine->title = $request->input('title');
        $magazine->ISSN = $request->input('ISSN');
        $magazine->release = $request->input('release');

        if($request->hasFile('image')){
            $image = $request->file('image');
            $filename = $image->getClientOriginalName();
            $finalName = date('His') . '-' . $filename;
            Storage::delete($magazine->image_path);

            $magazine->image_path = $request->file('image')->storeAs('Magazine_images', $finalName);
        }
        $magazine->save();

        if($request->hasFile('pdfs')){
            foreach($request->pdfs as $pdf){
                $filename = $pdf->getClientOriginalName();
                $finalName = date('His') . '-' . $filename;


                $file = new MagazineFile();
                $file->magazine_id = $magazine->id;
                $file->pdf_path = $pdf->storeAs('Magazine_documents',$finalName);
                $file->save();
            }
        }
        return response()->json([
            'data' => 'edycja udana'
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
        $magazine = Magazine::with(['magazineFiles'])->find($id)->toArray();
        Storage::delete($magazine['image_path']);

        foreach($magazine['magazine_files'] as $file){
            Storage::delete($file['pdf_path']);
        }

        $magazineDelete = Magazine::with(['magazineFiles'])->where('id',$id)->delete();


        if($magazineDelete){
            return ['result' => 'produkt usuniety'];
        }else{
            return ['result' => 'nie udalo sie usunac produktu'];
        }
    }

    public function search($key){
        return Magazine::query()
            ->where('title','Like', "%$key%")
            ->get();
    }
}
