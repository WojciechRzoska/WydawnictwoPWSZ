<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddBulletinRequest extends FormRequest
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
            'image' => 'required',
            'pdf' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'title.min' => 'Nazwa musi mieć przynajmniej 5 znaków!',
            'title.required' => 'Nazwa jest wymagana!',
            'image.required' => 'Trzeba dodać zdjęcie!',
            'pdf.required' => 'Trzeba dodać plik!',
        ];
    }
}
