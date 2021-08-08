<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddMagazineRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|min:5',
            'ISSN' => 'required',
            'release' => 'required|numeric|digits:4',
            'image' => 'required',
            'pdfs' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'title.min' => 'Nazwa musi mieć przynajmniej 5 znaków!',
            'title.required' => 'Nazwa jest wymagana!',
            'ISSN.required' => 'Numer ISSN jest wymagany!',
            'release.required' => 'Rok wydania jest wymagany!',
            'release.digits' => 'Rok wydania musi mieć 4 cyfry!',
            'release.numeric' => 'Rok wydania musi być liczbą!',
            'image.required' => 'Trzeba dodać zdjęcie!',
            'pdfs.required' => 'Trzeba dodać plik!',
        ];
    }
}
