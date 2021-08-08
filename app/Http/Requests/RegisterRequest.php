<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name' => 'required|max:55',
            'email' => 'required|unique:users|min:5|max:60|email',
            'password' => 'required|min:6|confirmed',
            'role' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Nazwa jest wymagana!',
            'name.max' => 'Nazwa nie może być dłuższa niż 55 znaków!',
            'email.required' => 'Email wymagany!',
            'email.min' => 'Email musi mieć przynajmniej 5 znaków!',
            'email.max' => 'Email nie może być dłuższy niż 60 znaków!',
            'email.email' => 'Błędny format!',
            'email.unique' => 'Taki email jest już używany!',
            'password.required' => 'Hasło wymagane!',
            'password.min' => 'Hasło musi mieć przynajmniej 6 znaków!',
            'password.confirmed' => 'Podane hasła nie są takie same!',
            'role.required' => 'Rola jest wymagana!'
        ];
    }
}
