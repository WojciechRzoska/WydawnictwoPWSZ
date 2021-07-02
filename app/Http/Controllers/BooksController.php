<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Http\Resources\Book as BookResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;



class BooksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     *
     */
    public function index()
    {
       return BookResource::collection(Book::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
//        $request->validate([
//        'title' => 'required',
//        'description' => 'required',
//        'cover' => 'required',
//        'pages' => 'required',
//        'contests' => 'required',
//        'year' => 'required',
//        'ISBN' => 'required',
//        'publisher' => 'required',
//        'price' => 'required'
//        ]);

        $book = new Book();
        $book->title = $request->input('title');
        $book->description = $request->input('description');
        $book->pages = $request->input('pages');
//        $book->pdf_path = $request->input('pdf_path');
        $book->year = $request->input('year');
        $book->ISBN = $request->input('ISBN');
        $book->publisher = $request->input('publisher');
        $book->price = $request->input('price');


        if($request->hasFile('image')){
            $file = $request->file('image');
            $filename = $file->getClientOriginalName();
            $finalName = date('His') . '-' .$filename;
                $book->image_path = $request->file('image')->storeAs('Book_images', $finalName);
        }

        if($request->hasFile('pdf')){
            $file= $request->file('pdf');
            $filename = $file->getClientOriginalName();
            $finalName = date('His') . '-' . $filename;

            $book->pdf_path = $request->file('pdf')->storeAs('Book_documents', $finalName);
        }

            $book->save();
            return response()->json([
                'data' => 'Książka dodana'
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
        return Book::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
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
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $book = Book::find($id);

        $book->title = $request->input('title');

        $book->description = $request->input('description');
        $book->pages = $request->input('pages');
        $book->year = $request->input('year');
        $book->ISBN = $request->input('ISBN');
        $book->publisher = $request->input('publisher');
        $book->price = $request->input('price');

        if($request->hasFile('image')){
            $file = $request->file('image');
            $filename = $file->getClientOriginalName();
            $finalName = date('His') . $filename;
            Storage::delete($book->image_path);

            $book->image_path = $request->file('image')->storeAs('Book_images', $finalName);

        }
        if($request->hasFile('pdf')){
            $file= $request->file('pdf');
            $filename = $file->getClientOriginalName();
            $finalName = date('His') . $filename;
            Storage::delete($book->pdf_path);

            $book->pdf_path = $request->file('pdf')->storeAs('Book_documents', $finalName);
        }
        $book->save();

        return response()->json([
            'data'=> 'edycja udana'
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
        $book = Book::find($id);
        $bookDelete = Book::where('id',$id)->delete();
        Storage::delete($book->image_path);
        Storage::delete($book->pdf_path);
        if($bookDelete){
            return ['result' => 'produkt usuniety'];
        }else{
            return ['result' => 'nie udalo sie usunac produktu'];
        }
    }

    public function search($key){
        return Book::query()
            ->where('title','Like', "%$key%")
            ->orwhere('pages','Like', "%$key%")
            ->get();
    }
}
