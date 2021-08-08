<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditBookRequest extends FormRequest
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
            'description' => 'nullable',
            'pages' => 'required|numeric',
            'year' => 'required|numeric|digits:4',
            'ISBN' => 'required',
            'publisher' => 'required',
            'price' => 'required|numeric',
            'quantity' => 'required|numeric',
            'image' => 'nullable',
            'pdf' => 'nullable'
        ];
    }

    public function messages()
    {
        return [
            'title.min' => 'Nazwa musi mieć przynajmniej 5 znaków!',
            'title.required' => 'Nazwa jest wymagana!',
            'ISBN.required' => 'Numer ISSN jest wymagany!',
            'publisher.required' => 'Autor jest wymagany!',
            'year.required' => 'Rok wydania jest wymagany!',
            'year.numeric' => 'Rok wydania jest musi być liczbą!',
            'year.digits' => 'Rok wydania musi mieć 4 cyfry!',
            'pages.required' => 'Ilość stron jest wymagana!',
            'pages.numeric' => 'Ilość stron musi być liczbą!',
            'price.numeric' => 'Cena musi być liczbą!',
            'price.required' => 'Cena jest wymagana!',
            'quantity.numeric' => 'Ilość dostępnych egzemplarzy musi być liczbą!',
            'quantity.required' => 'Ilość dostępnych egzemplarzy jest wymagane!!',
        ];
    }
}
