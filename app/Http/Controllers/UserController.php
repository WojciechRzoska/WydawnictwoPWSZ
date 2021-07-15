<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Testing\Fluent\Concerns\Has;


class UserController extends Controller
{
    public function User(){
        return Auth::user();
    }

    public function index(){
        return UserResource::collection(User::all());
    }

    public function store(RegisterRequest $request)
    {
        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->role = $request->input('role');
        $user->save();


        return response([
           'message' => 'Użytkownik dodany'
        ]);
    }

    public function show($id)
    {
        return User::find($id);
    }


    public function destroy($id)
    {
        $userDelete = User::where('id',$id)->delete();

        if($userDelete){
            return ['result' => 'użytkownik usunięty'];
        }else{
            return ['result' => 'nie udało się usunąć użytkownika'];
        }
    }
}
