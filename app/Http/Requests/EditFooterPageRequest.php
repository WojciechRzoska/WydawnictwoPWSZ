<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditFooterPageRequest extends FormRequest
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
            'id' => 'required',
            'title' => 'required',
            'text' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Tytuł jest wymagany!',
            'text.required' => 'Tekst jest wymagany!',
        ];
    }
}
